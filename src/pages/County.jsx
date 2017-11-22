import React, { Component } from 'react'
import { Grid, Container, Header, Menu, Label, Icon, Table } from 'semantic-ui-react'
import { browserHistory } from 'react-router'
import CountyMap from './CountyMap'
import capitalize from 'capitalize'
import _ from 'lodash'

const label_colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black',
]

class County extends Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: [],
      selected: null,
      page: 1
    }
    this._perPage = 5
    this._numPages = 0
  }

  componentWillMount() {
    fetch(`http://localhost:3001/api/v1/county/${this.props.params.county}/schools`)
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(schools => {
          this.setState({
            schools: schools
          }, () => {
            this._numPages = Math.round(this.state.schools.length / this._perPage)
            this.forceUpdate()
          })
        })
      })
  }

  _page = (page) => {
    this.setState({
      page
    })
  }

  _prevPage = () => {
    if (this.state.page < 1)
      return
    this.setState({
      page: --this.state.page
    })
  }

  _nextPage = () => {
    if (this.state.page >= this._numPages)
      return
    this.setState({
      page: ++this.state.page
    })
  }

  render () {

    const currentSchools = this.state.schools.slice((this.state.page - 1) * this._perPage, this.state.page * this._perPage)

    return (

      <Container className='district-section' fluid>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={6} verticalAlign={'middle'} className='padded-column'>
              <Header as='h2' className='hint' >{this.props.params.county} County</Header>
              <CountyMap
                county={this.props.params.county}
                currentSchools={currentSchools}
                schools={this.state.schools}
                selected={this.state.selected}
              />
            </Grid.Column>

            <Grid.Column width={10} className='padded-column'>
              <Header as='h2' className='hint' >Schools</Header>
              <Table celled padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>School</Table.HeaderCell>
                    <Table.HeaderCell>Grades</Table.HeaderCell>
                    <Table.HeaderCell>City</Table.HeaderCell>
                    <Table.HeaderCell>Website</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {currentSchools.map((school) => {
                    const {school_name, state_lea_id, grades_offered, website, school_add_city} = school
                    return (
                      <Table.Row
                        key={`row-${state_lea_id}`}
                        onMouseEnter={() => this.setState({selected: school})}
                        onMouseLeave={() => this.setState({selected: null})}
                        onClick={() => browserHistory.push(`/school/${state_lea_id}`)}
                        className={'school_row'}
                      >
                        <Table.Cell>{capitalize.words(school_name.toLowerCase())}</Table.Cell>
                        <Table.Cell singleLine>
                          {
                            grades_offered.slice(0, 5).map((grade) => (
                              <Label circular color={label_colors[Number(grade)]} key={grade}>{grade}</Label>
                            ))
                          }
                          {
                            grades_offered.length > 5 ? ' + ' + (grades_offered.length - 5) + ' more' : ''
                          }
                        </Table.Cell>
                        <Table.Cell>
                            { school_add_city }
                        </Table.Cell>
                        <Table.Cell>
                          <a href={ website }>{ website }</a>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan='5'>
                      <Menu floated='right' pagination>
                        {
                          this.state.page !== 1 && (
                            <Menu.Item
                              onClick={this._prevPage}
                              as='a'
                              icon
                            >
                              <Icon name='left chevron' />
                            </Menu.Item>
                          )
                        }
                        {
                          _.range(1, this._numPages + 1).map((page) => {
                            if (this._numPages >= 5 && (Math.abs(this.state.page - page) < 4 || page == this._numPages || page == 1)) {
                              return (
                                <Menu.Item
                                  className={this.state.page == page ? 'active' : ''}
                                  as='a'
                                  onClick={() => this._page(page)}
                                >
                                  {page}
                                </Menu.Item>
                              )
                            }
                          })
                        }
                        {
                          this.state.page !== this._numPages && (
                            <Menu.Item
                              onClick={this._nextPage}
                              as='a'
                              icon
                            >
                              <Icon name='right chevron' />
                            </Menu.Item>
                          )
                        }
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>

              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default County
