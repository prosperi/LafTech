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
        <Header as='hVis1' className='analysis-title'>VISUALIZATION #1</Header>
          <p className='paragraph'>
            <br/>
            This grouped bar graph compares the Pupil Expenditure
            (Amount spent by the school on each student in the school) and
            the average percentage of proficiency for the four different sections on the PSSA.
            This was created to help identify a correlation between a rise in average
            score with a rise or fall in pupil expenditure.
          </p>
          <p className='paragraph'>
            Some schools that did not provide the statistics to all four PSSA scores
            as well as their pupil expenditure amounts were not included within the
            data utilized to create the visualization. This condition was implemented in
            order to remove any outliers within the database of school profiles.
          </p>
          <p className='paragraph'>
            The size of the data within the LafTech database is too large to be
            expressed within a single graph for this visualization. Thus the
            data shown here on the main page is utilizing dummy data in order to
            express the idea behind the creation of this visualization. To see
            this visualization using real data, select a county.
            <br/>
          </p>
      </center>
    </Container>
  )
}
}
