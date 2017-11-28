/* global d3 */
import React, { Component } from 'react'
import { BarGroupChart } from 'react-d3-basic'
import { Container } from 'semantic-ui-react'

export default class Visualization1 extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch(this.props.url).then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({ data })
    })

  }

  render () {
    let title = 'Visualization 1'

    let width = this.props.width
    let height = this.props.height
    let margins = {
      left: 100,
      right: 100,
      top: 10,
      bottom: 50
    }

    let chartSeries = [
      {
        field: 'math_algebra_percent_proficient',
        name: 'PSSA Math',
        color: '#828081'
      },
      {
        field: 'reading_lit_percent_proficient_pssa',
        name: 'PSSA Reading',
        color: '#E9C893'
      },
      {
        field: 'scibio_percent_proficient_pssa',
        name: 'PSSA Sci/Bio',
        color: '#3CC47C'
      }
    ]
    const x = d => {
      return Number(d.pupil_expenditure_total)
    },
    xScale = 'ordinal',
    yScale = 'linear',
    xLabel = 'Pupil Expenditure ($)',
    yLabel = 'Average PSSA Score (%)',
    yTickFormat = d3.format('.2s'),
    xTicks = [10, '$']

    return (
      this.state.data.length > 0
      ? (
        <BarGroupChart
          showXGrid= {true}
          showYGrid= {true}
          margins= {margins}
          title={title}
          width={width}
          height={height}
          chartSeries={chartSeries}
          data={this.state.data}
          x= {x}
          xLabel= {xLabel}
          yLabel = {yLabel}
          xScale= {xScale}
          yScale = {yScale}
          xTicks= {xTicks}
          yTickFormat={yTickFormat}
        />
      ) : (
        <Container className='analysis-section'>
          <p className='analysis-title' style={{textAlign: 'center'}}>
            NOT ENOUGH DATA TO COMPARE THE PUPIL EXPENDITURE (AMOUNT SPENT BY THE SCHOOL ON EACH STUDENT IN THE SCHOOL) AND THE AVERAGE SCORES FOR THE FOUR DIFFERENT SECTIONS ON THE PSSA
          </p>
          <hr style={{width: '70%', borderColor: '#707070'}} />
        </Container>
      )
    )
  }
}
