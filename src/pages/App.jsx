import React, { Component } from 'react'
import { Container, Image, Header, Icon, Dropdown, Divider } from 'semantic-ui-react'
import Vis1Explanation from './Vis1Explanation'
import Vis3Explanation from './Vis3Explanation'
import Visualization1 from './Visualization1'
import Visualization3 from './Visualization3'
import PAMap from './Map'
import HeaderSection from './HeaderSection'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
        <Container className='district-section' fluid>
          <Header as='h2' className='hint' >TYPE SCHOOL / DISTRICT NAME</Header>
          <Dropdown placeholder='Select a school / district'
          search selection options={districtOptions} className='district-filter'/>
          <Divider horizontal className='or' >Or</Divider>
          <Header as='h2' className='hint' style={{marginTop: '30px'}} >SELECT DISTRICT FROM MAP</Header>
          <PAMap width='960' height='600' />
        </Container>

        <Container className='analysis-section' fluid>
            <Vis1Explanation />
            <Visualization1 />
        </Container>

        <Container className='analysis-section' fluid>
            <Vis3Explanation />
            <Visualization3 />
        </Container>
  }

  render () {
    return (
      <Container fluid >
        <HeaderSection />
        {this.props.children}
      </Container>
    )
  }
}

export default App
