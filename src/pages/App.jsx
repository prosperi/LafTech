import React, { Component } from 'react'
import { Container, Image, Header, Icon, Dropdown, Divider } from 'semantic-ui-react'
import Visualization3 from './Visualization3'
import PAMap from './Map'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      countyList: [],
      county: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/county/list').then((res) => {
      return res.json()
    }).then((data) => {
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
    this.setState({ county })
  }

  render () {
    return (

      <Container fluid>

        <Container className='index-header' fluid>
          <Container className='content' fluid>
            <Image src='../images/logo.png' className='logo' />
            <Header as='h1' className='title' >LAFTECH PA SCHOOL DATA</Header>
            <Header as='h3' className='hint' >EXPLORE OUR ANALYSIS</Header>
            <Icon name='angle down' size='huge' className='down' />
          </Container>
        </Container>

        <Container className='district-section' fluid>
          <Header as='h2' className='hint' >TYPE COUNTY NAME</Header>
          <Dropdown
            placeholder='Select a school / district'
            search
            selection
            options={this.state.countyList}
            className='district-filter'
            onChange={(e, d) => { this.changeCounty(d.value) }}
          />
          <Divider horizontal className='or' >Or</Divider>
          <Header as='h2' className='hint' style={{marginTop: '30px'}} >SELECT COUNTY FROM MAP</Header>
          <PAMap width='960' height='600' onChange={this.changeCounty} />
        </Container>

        <Container className='analysis-section' fluid>
          <Visualization3 />
        </Container>

      </Container>
    )
  }
}

export default App
