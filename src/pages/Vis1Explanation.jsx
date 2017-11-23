import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

export default class Vis1Explanation extends Component {

  constructor (props) {
    super(props)
  }

  render () {
  return (
    <Container fluid>
      <center>
        <Header as= 'hVis1' className='analysis-title'><u>VISUALIZATION 1</u></Header>
          <p className='paragraph'>
          <br/>
          This stacked bar graph compares the Pupil Expenditure
          (Amount spent by the school on each student in the school) and
          the average scores for the four different sections on the PSSA.
          This was created to help identify a correlation between a rise in total
          score with a rise or fall in pupil expenditure.
          </p>
          <p className='paragraph'>
          Some schools that did not provide the statistics to all four PSSA scores
          as well as their pupil expenditure amounts were not included within the
          data utilized to create the visualization. This condition was implemented in
          order to remove any outliers within the database of school profiles.
          <br/>
          <br/>
          </p>
      </center>
    </Container>
  )
}
}
