import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

export default class Vis3Explanation extends Component {

  constructor (props) {
    super(props)
  }

  render () {
  return (
    <Container fluid>
      <center>
        <Header as= 'hVis1' className='analysis-title'><u>VISUALIZATION 2</u></Header>
          <p className='paragraph'>
          <br/>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id tellus eu risus pretium porta. Sed venenatis turpis a arcu porttitor, sed varius elit semper. Fusce quis facilisis augue, vel finibus nisl. Phasellus suscipit semper sapien a aliquet. Fusce sed ultricies diam. Pellentesque faucibus fringilla massa vitae consequat. Aliquam porta ultrices risus, at mattis purus. Donec id orci placerat, ornare magna eu, malesuada justo. Suspendisse potenti. Donec faucibus volutpat purus, non vulputate lorem finibus sit amet.
          </p>
          <p className='paragraph'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id tellus eu risus pretium porta. Sed venenatis turpis a arcu porttitor, sed varius elit semper. Fusce quis facilisis augue, vel finibus nisl. Phasellus suscipit semper sapien a aliquet. Fusce sed ultricies diam. Pellentesque faucibus fringilla massa vitae consequat. Aliquam porta ultrices risus, at mattis purus. Donec id orci placerat, ornare magna eu, malesuada justo. Suspendisse potenti. Donec faucibus volutpat purus, non vulputate lorem finibus sit amet.
          <br/>
          <br/>
          </p>
      </center>
    </Container>
  )
}
}
