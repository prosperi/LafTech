import React, { Component } from 'react'
import { ScatterPlot } from 'react-d3-basic'

//import data from '../data/data_03'
export default class Visualization3 extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/visualizations/3').then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({ data })
    })
  }

  render () {
    let title = 'Visualization 3'
    let width = 800
    let height = 300
    let margins = {
      left: 100,
      right: 50,
      top: 10,
      bottom: 50
    }

    let chartSeries = [
      {
            field: 'sat_total',
            name: 'Sat Total Score',
            color: '#3CC47C',
            symbolSize: 5
          }
    ]
    const x = d => {
      return Number(d.revenue)
    },
    xLabel = 'Total Revenue ($)',
    yLabel = 'SAT Score (AVG)',
    xScale = 'linear',
    xTicks = [10, '$']

    return (
      <ScatterPlot
        showXGrid= {true}
        showYGrid= {true}
        xLabel= {xLabel}
        yLabel= {yLabel}
        margins= {margins}
        title={title}
        width={width}
        height={height}
        chartSeries={chartSeries}
        data={this.state.data}
        x={x}
        xTicks={xTicks}
        xScale = {xScale}
      />
    )
  }
}
