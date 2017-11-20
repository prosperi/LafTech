import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

class County extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    return (

      <Container fluid>

        <Container className='analysis-section' fluid>
          County: {this.props.params.county}
        </Container>


      </Container>
    )
  }
}

export default County
