import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

export default class Vis2Explanation extends Component {

  constructor (props) {
    super(props)
  }

  render () {
  return (
    <Container fluid>
      <center>
        <Header as= 'hVis1' className='analysis-title'>VISUALIZATION #2</Header>
          <p className='paragraph'>
          <br/>
          This sunburst chart visualizes the PSSA exam performances for each school type.
          From this visualization, we hope that one can learn more about how different
          school types compare.
          </p>
          <p className='paragraph'>
          The data featured in the graph is calculated by taking the weighted average of the
          PSSA scores for a given LEA type. To further visualize the breakdown of the percentages,
          feel free to mouseover or click any of the arcs. Once in a zoomed in view,
          click the center of the visualization to go back up one level.
          <br/>
          <br/>
          </p>
      </center>
    </Container>
  )
}
}
