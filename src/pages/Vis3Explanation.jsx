import React, { Component } from 'react'
import { Container, Image, Header, Icon, Dropdown, Divider } from 'semantic-ui-react'

export default class Vis3Explanation extends Component {

  constructor (props) {
    super(props)
  }

  render () {
  return (
    <Container fluid>
      <center>
        <Header as= 'hVis1' className='analysis-title'><u>VISUALIZATION 3</u></Header>
          <p className='paragraph'>
          <br/>
          This scatter plot compares the Total Revenue
          (Amount of money the school earns prior to taxes and deductions) and
          the average scores for the three different sections on the SAT.
          This was created to help identify a correlation between a rise in
          total score on the SAT, a nation-wide test, with the rise or fall in
          total revenue.
          </p>
          <p className='paragraph'>
          Some schools that did not provide the statistics to all three SAT scores
          as well as their total revenue amounts were not included within the
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
