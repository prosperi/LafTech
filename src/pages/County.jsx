import React, { Component } from 'react'
import { Grid, Container, Header, Menu, Label, Icon, Table, Rating } from 'semantic-ui-react'
import CountyMap from './CountyMap'
import capitalize from 'capitalize'
import _ from 'lodash'

class County extends Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: [],
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
            <Grid.Column className='padded-column'>
              <Header as='h2' className='hint' >{this.props.params.county} County</Header>
              <CountyMap county={this.props.params.county} schools={currentSchools}  />
            </Grid.Column>

            <Grid.Column className='padded-column'>
              <Header as='h2' className='hint' >Schools</Header>
              <Table celled padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
                    <Table.HeaderCell>Effect</Table.HeaderCell>
                    <Table.HeaderCell>Efficacy</Table.HeaderCell>
                    <Table.HeaderCell>Consensus</Table.HeaderCell>
                    <Table.HeaderCell>Comments</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {currentSchools.map(({school_name, state_lea_id}) => (
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h2' textAlign='center'>A</Header>
                      </Table.Cell>
                      <Table.Cell>{capitalize.words(school_name.toLowerCase())}</Table.Cell>
                      <Table.Cell>
                        <Rating icon='star' defaultRating={3} maxRating={3} />
                      </Table.Cell>
                      <Table.Cell textAlign='right'>
                          100% <br />
                        <a href='#'>65 studies</a>
                      </Table.Cell>
                      <Table.Cell>
                          Creatine is the reference compound for power improvement, with numbers from one meta-analysis to assess
                          potency
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
