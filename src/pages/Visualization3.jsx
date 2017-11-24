import React, { Component } from 'react'
import { ScatterPlot } from 'react-d3-basic'

import data from '../data/data_03'
export default class Visualization3 extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/visualizations/3').then((res) => {
      return res.json()
    }).then((data) => {
      // console.log("Data Received: " + JSON.stringify(data))
      this.setState({ data: data })
    })
  }

  render () {
    if(!this.state.data){
      return(<div></div>)
    }

    let title = 'Visualization 3'
    let width = 700
    let height = 300
    let margins = {
      left: 100,
      right: 50,
      top: 10,
      bottom: 50
    }

    let chartSeries = [
      {
            field: 'sat_math',
            name: 'Sat Math',
            color: '#E9C893',
            symbolSize: 5
          },
          {
            field: 'sat_reading',
            name: 'Sat Reading',
            color: '#1E392A',
            symbolSize: 5
          },
          {
            field: 'sat_writing',
            name: 'Sat Writing',
            color: '#3CC47C',
            symbolSize: 5
          }
    ]
    const x = d => {
      return d.totalRevenue//Number(d.revenue)
    },
    xLabel = 'Total Revenue ($)',
    yLabel = 'SAT Score (AVG)',
    xScale = 'linear'

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
        xScale = {xScale}
      />
    )
  }
}
