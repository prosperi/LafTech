import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Container, Header, Dropdown, Divider } from 'semantic-ui-react'

import StateMap from './StateMap'
import VisOneExplanation from '../components/VisOneExplanation'
import VisTwoExplanation from '../components/VisTwoExplanation'
import VisThreeExplanation from '../components/VisThreeExplanation'
import VisualizationOne from '../components/VisualizationOne'
import VisualizationTwo from '../components/VisualizationTwo'
import VisualizationThree from '../components/VisualizationThree'

class Landing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countyList: [],
      vis_01: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/api/v1/county/list')
    .then(res => res.json())
    .then(data => {
      const countyList = data.map((d) => {
          return {
            key: d,
            value: d,
            text: d
          }
        })
      this.setState({ countyList })
    })
  }

  changeCounty = (county) => {
    browserHistory.push(`/county/${county}`)
  }

  render () {

    return (

      <Container fluid>

        <Container className='district-section' fluid>
          <Header as='h2' className='hint' >TYPE COUNTY NAME</Header>
          <Dropdown
            placeholder='Select a county'
            search
            selection
            options={this.state.countyList}
            className='district-filter'
            onChange={(e, d) => { this.changeCounty(d.value) }}
          />
          <Divider horizontal className='or' >Or</Divider>
          <Header as='h2' className='hint' style={{marginTop: '30px'}} >SELECT COUNTY FROM MAP</Header>
          <StateMap onChange={this.changeCounty}  />
        </Container>

        <Container className='analysis-section' fluid>
          <VisOneExplanation />
          <VisualizationOne width={1000} height={400} url='http://localhost:3001/api/v1/visualizations/1' />
        </Container>

        <Container className='analysis-section' fluid>
          <VisTwoExplanation />
          <VisualizationTwo width={1000} height={400} url='http://localhost:3001/api/v1/visualizations/2' />
        </Container>

        <Container className='analysis-section' fluid>
          <VisThreeExplanation />
          <VisualizationThree width={1000} height={400} url='http://localhost:3001/api/v1/visualizations/3' />
        </Container>

      </Container>
    )
  }
}

export default Landing
