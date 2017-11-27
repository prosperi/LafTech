import React, { Component } from 'react'
import { Segment, Container, Label, Breadcrumb, Header, Icon, Statistic } from 'semantic-ui-react'
import { PieChart } from 'react-d3-basic'
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
    return (
      <Container fluid  className='school-section'>
        <Container>
          <Segment>
            <Breadcrumb size='large'>
              <Breadcrumb.Section link>Home</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section link>{this.state.details.county} County</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section active>{_.startCase(_.toLower(this.state.details.school_name))}</Breadcrumb.Section>
            </Breadcrumb>
          </Segment>
        </Container>
        <Container>
          <Header as='h2' className='schoolName' >{_.lowerCase(this.state.details.school_name)}</Header>
          <Header as='h3' className='countyName' >{this.state.details.county} County, PA</Header>
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
          <Header as='h2'>Overview</Header>
          <Header as='h3'>Grades offered</Header>
          {
            this.state.details.grades_offered && this.state.details.grades_offered.map((grade) => (
              <Label circular color={label_colors[Number(grade)]} key={grade}>{grade}</Label>
            ))
          }
          <Header as='h3'>Gender repartition</Header>
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
        </Container>
      </Container>
    )
  }
}

export default County
