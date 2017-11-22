import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

class App extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {

  }

  render () {
    return (
      <Container fluid >
        {this.props.children}
      </Container>
    )
  }
}

export default App
