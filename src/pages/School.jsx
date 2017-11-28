import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Segment, Container, Label, mb, Header, Icon, Statistic, Grid, Breadcrumb } from 'semantic-ui-react'
import { PieChart, BarChart } from 'react-d3-basic'
import _ from 'lodash'

const label_colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]

const school_types = {
  CTC: 'Technical Center',
  AVTS: 'Technical School',
  SPJ: 'Correctional Institution',
  STATE: 'State',
  REGSCH: 'Regular School',
  SD: 'School District',
  CS: 'Charter School',
  Future: 'Future',
  PS: 'Public School',
  SJCI: 'Correctional Institution'
}

class County extends Component {

  constructor (props) {
    super(props)
    this.state = {
      details: []
    }
  }

  componentWillMount() {
    fetch(`http://localhost:3001/api/v1/school/${this.props.params.school}/`)
      .then(response => {
        if (response.status !== 200) {
          return
        }
        response.json().then(details => {
          this.setState({
            details: details
          }, () => {
            this.forceUpdate()
            console.log(details)
          })
        })
      })
  }

  renderStatistic(val, name, icon) {
    return val && (
      <Statistic>
        <Statistic.Label>
          {name}
        </Statistic.Label>
        <Statistic.Value>
          {icon && <Icon name={icon} />}
          {'  ' + val}
        </Statistic.Value>
      </Statistic>
    )
  }

  formatPhoneNumber(s) {
    var s2 = (''+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }

  render () {
    const actScores = [
      {section: 'English', score: Number(this.state.details.act_english) || 0 },
      {section: 'Math', score: Number(this.state.details.act_math) || 0 },
      {section: 'Reading', score: Number(this.state.details.act_reading) || 0 },
      {section: 'Science', score: Number(this.state.details.act_science) || 0 }
    ]

    const satScores = [
      {section: 'Math', score: Number(this.state.details.sat_math) || 0 },
      {section: 'Reading', score: Number(this.state.details.sat_reading) || 0 },
      {section: 'Writing', score: Number(this.state.details.sat_writing) || 0 }
    ]


    return (
      <Container fluid  className='school-section'>
        <Container>
          <Segment>
            <Breadcrumb size='large'>
              <Breadcrumb.Section link onClick={() => browserHistory.push('/')}>Home</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section link onClick={() => browserHistory.push(`/county/${this.state.details.county}`)}>
                {this.state.details.county} County
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section active>{_.startCase(_.toLower(this.state.details.school_name))}</Breadcrumb.Section>
            </Breadcrumb>
          </Segment>
        </Container>
        <Container>
          <Header as='h2' className='headerText' >{_.lowerCase(this.state.details.school_name)}</Header>
          <Header as='h3' className='subHeaderText' >{this.state.details.county} County, PA</Header>
          <Statistic.Group>
            {this.renderStatistic(this.state.details.dropout_rate, 'Dropout Rate', 'percent')}
            {this.renderStatistic(this.state.details.school_enrollment, 'Enrollment', 'student')}
            {this.renderStatistic(this.state.details.school_add_city, 'City', 'marker')}
            {this.renderStatistic(this.formatPhoneNumber(this.state.details.telephone_no), 'Phone', 'phone')}
            {this.renderStatistic(school_types[this.state.details.lea_type], 'Type', 'building')}
            {this.renderStatistic(this.state.details.sat_math, 'SAT Math', 'calculator')}
            {this.renderStatistic(this.state.details.sat_reading, 'SAT Reading', 'book')}
            {this.renderStatistic(this.state.details.sat_writing, 'SAT Writing', 'write')}
           </Statistic.Group>
        </Container>
        <iframe
          width='100%'
          height='300'
          className='schoolMap'
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyA2opHOf90ph08Pzw_VNZeUFbuzQ4faHRA&q=${this.state.details.school_name} , PA`}
          >
        </iframe>
        <Container>
          <Header as='h2' className='headerText'>Overview</Header>
          <Header as='h3' className='subHeaderText top'>Grades offered</Header>
          {
            this.state.details.grades_offered && this.state.details.grades_offered.map((grade) => (
              <Label circular color={label_colors[Number(grade)]} key={grade}>{grade}</Label>
            ))
          }
          <Header as='h3' className='subHeaderText top'>Statistics</Header>
          <Container
            className='school-pies'
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
            fluid>
            <div style={{margin: '30px'}}>
              <PieChart
                data= {[{percent: Number(this.state.details.female), name: 'female'}, {percent: Number(this.state.details.male), name: 'male'}]}
                width= {320}
                height= {300}
                chartSeries= {[{field: 'female', name: 'Females', color: '#e74c3c'}, {field: 'male', name: 'Males', color: '#2980b9'}]}
                value = {(d) => d.percent}
                name = {(d) => d.name}
                showLegend
                innerRadius = {40}
              />
            </div>
            <div style={{margin: '30px'}}>
              <PieChart
                svgClassName='pie-svg'
                legendClassName='pie-title'
                style={{flex: .5}}
                data= {[
                  {percent: Number(this.state.details.americanindian_alaskan), name: 'americanindian_alaskan'},
                  {percent: Number(this.state.details.asian), name: 'asian'},
                  {percent: Number(this.state.details.black), name: 'black'},
                  {percent: Number(this.state.details.hawaiian_pacific_islander), name: 'hawaiian_pacific_islander'},
                  {percent: Number(this.state.details.hispanic), name: 'hispanic'},
                  {percent: Number(this.state.details.multiracial), name: 'multiracial'},
                  {percent: Number(this.state.details.white), name: 'white'}
                ]}
                width= {500}
                height= {300}
                chartSeries= {[
                  {field: 'americanindian_alaskan', name: 'American Indian/Alaskan', color: '#16a085'},
                  {field: 'asian', name: 'Asian', color: '#27ae60'},
                  {field: 'black', name: 'Black', color: '#2980b9'},
                  {field: 'hawaiian_pacific_islander', name: 'Hawaiian Pacific Islander', color: '#8e44ad'},
                  {field: 'hispanic', name: 'Hispanic', color: '#c0392b'},
                  {field: 'multiracial', name: 'Multiracial', color: '#d35400'},
                  {field: 'white', name: 'White', color: '#f39c12'}
                ]}
                value = {(d) => d.percent}
                name = {(d) => d.name}
                showLegend
                innerRadius = {40}
              />
            </div>
          </Container>
          <Container
            className='school-bars'
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
            fluid>
            <BarChart
              style={{flex: .5}}
              title={'ACT Scores'}
              data={actScores}
              width={600}
              height={300}
              chartSeries={[{field: 'score',name: 'ACT Scores'}]}
              x={d => d.section}
              xLabel={'ACT Section'}
              xScale={'ordinal'}
              yLabel={'Score'}
            />
            <BarChart
              style={{flex: .5}}
              title={'SAT Scores'}
              data={satScores}
              width={600}
              height={300}
              chartSeries={[{field: 'score',name: 'SAT Scores'}]}
              x={d => d.section}
              xLabel={'SAT Section'}
              xScale={'ordinal'}
              yLabel={'Score'}
            />
          </Container>
        </Container>
      </Container>
    )
  }
}

export default County
