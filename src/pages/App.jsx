import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import HeaderSection from './HeaderSection'
import FooterSection from './FooterSection'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {

  }

  render () {
    return (
      <Container fluid >
        <HeaderSection />
        {this.props.children}
        <FooterSection />
      </Container>
    )
  }
}

export default App
