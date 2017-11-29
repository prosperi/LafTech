import React, { Component } from 'react'
import { Grid, Container, Breadcrumb, Header, Menu, Label, Icon, Table, Dropdown, Button } from 'semantic-ui-react'
import { browserHistory } from 'react-router'
import capitalize from 'capitalize'
import CountyMap from './CountyMap'
import _ from 'lodash'

import VisualizationOne from '../components/VisualizationOne'
import VisualizationTwo from '../components/VisualizationTwo'
import VisualizationThree from '../components/VisualizationThree'

const label_colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]

class County extends Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: [],
      selected: null,
      page: 1,
      visWidth: null,
      visHeight: null,
      url: `http://localhost:3001/api/v1/visualizations/2/School Total/2014/${props.params.county}`,
      grade: 12,
      year: 2014
    }
    this._perPage = 5
    this._numPages = 0
  }

  componentDidMount() {

    this.fitParentContainer()
    window.addEventListener('resize', this.fitParentContainer)

  }

  fitParentContainer = () => {
    const currentContainerWidth = window.innerWidth

    this.setState({
      visWidth: Math.min(900, currentContainerWidth),
      visHeight: Math.min(900, currentContainerWidth) * (600/960)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitParentContainer)
  }

  componentWillMount() {
    fetch(`http://localhost:3001/api/v1/county/${this.props.params.county}/schools`)
      .then(response => {
        if (response.status !== 200) {
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
    const gradeOptions = [
      { key: '3', value: '3', text: '3' }, { key: '4', value: '4', text: '4' }, { key: '5', value: '5', text: '5' },
      { key: '6', value: '6', text: '6' }, { key: '7', value: '7', text: '7' }, { key: '8', value: '8', text: '8' },
      { key: '9', value: '9', text: '9' }, { key: '10', value: '10', text: '10' }, { key: '11', value: '11', text: '11' },
      { key: '12', value: '12', text: '12' }
    ]
    const yearOptions = [
       { key: '2012', value: '2012', text: '2012' },
       { key: '2013', value: '2013', text: '2013' },
       { key: '2014', value: '2014', text: '2014' }
    ]

    return (
      <Container fluid>
        <Container className='district-section' fluid>
          <Grid stackable>
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
                <Table unstackable celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>School</Table.HeaderCell>
                      <Table.HeaderCell className={'mobile-hide'}>Grades</Table.HeaderCell>
                      <Table.HeaderCell>City</Table.HeaderCell>
                      <Table.HeaderCell className={'mobile-hide'}>Website</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {currentSchools.map((school) => {
                      const {school_name, state_school_id, grades_offered, website, school_add_city} = school
                      return (
                        <Table.Row
                          key={`row-${state_school_id}`}
                          onMouseEnter={() => this.setState({selected: school})}
                          onMouseLeave={() => this.setState({selected: null})}
                          onClick={() => browserHistory.push(`/school/${state_school_id}`)}
                          className={'school_row'}
                        >
                          <Table.Cell>{capitalize.words(school_name.toLowerCase())}</Table.Cell>
                          <Table.Cell singleLine className={'mobile-hide'}>
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
                          <Table.Cell className={'mobile-hide'}>
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
        <Container className='county-section' fluid>
          <Container>
            <Header as='h2' className='countyName' >{this.props.params.county} County</Header>
            <Header as='h3' className='stateName' >Pennsylvania</Header>
          </Container>
          <iframe
            width='100%'
            height='300'
            className='countyMap'
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA2opHOf90ph08Pzw_VNZeUFbuzQ4faHRA&q=${this.props.params.county} County,PA`}
            >
          </iframe>

        </Container>

        <Container className='analysis-section' fluid>
          <VisualizationOne width={this.state.visWidth} height={this.state.visHeight} url={`http://localhost:3001/api/v1/visualizations/1/${this.props.params.county}`} />
        </Container>

        <Container className='analysis-section' fluid>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <Dropdown placeholder='Grade' selection options={gradeOptions} style={{margin: '20px'}} onChange={(e, v) => this.setState({grade: v.value})}/>
            <Dropdown placeholder='Academic Year' selection options={yearOptions} style={{margin: '20px'}} onChange={(e, v) => this.setState({year: v.value})}/>
          </div>
          <Button style={{marginBottom: '20px'}} size='large' primary
            onClick={(e) => { this.setState({url: `http://localhost:3001/api/v1/visualizations/2/${Number(this.state.grade)}/${Number(this.state.year)}/${this.props.params.county}`})}}>
            Filter
          </Button>
          <VisualizationTwo width={Number(this.state.visWidth)} height={Number(this.state.visWidth) * 2/5} url={this.state.url} />
        </Container>

        <Container className='analysis-section' fluid>
          <VisualizationThree width={this.state.visWidth} height={this.state.visHeight} url={`http://localhost:3001/api/v1/visualizations/3/${this.props.params.county}`} />
        </Container>

      </Container>
    )
  }
}

export default County
