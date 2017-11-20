import React, { Component } from 'react'
import { Link } from 'react-router'
import { Container, Image, Header, Icon } from 'semantic-ui-react'

class HeaderSection extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    return (

      <Container className='header-container' fluid>

        <Container className='index-header' fluid>
          <Container className='content' fluid>
            <Link to='/'><Image src='../images/logo.png' className='logo' /></Link>
            <Header as='h1' className='title' >LAFTECH PA SCHOOL DATA</Header>
            <Header as='h3' className='hint' >EXPLORE OUR ANALYSIS</Header>
            <Icon name='angle down' size='huge' className='down' />
          </Container>
        </Container>

      </Container>
    )
  }
}

export default HeaderSection
