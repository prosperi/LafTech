import React, { Component } from 'react'
import { ScatterPlot } from 'react-d3-basic'

export default class Visualization3 extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/visualizations/1').then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({ data })
    })
  }

  render () {
    let title = 'Visualization 3'
    let width = 700
    let height = 300
    let margins = {
      left: 100,
      right: 50,
      top: 10,
      bottom: 10
    }

    let chartSeries = [
      {
            field: 'sat_math',
            name: 'Sat Math',
            color: '#ff2a2a',
            symbolSize: 5
          },
          {
            field: 'sat_reading',
            name: 'Sat Reading',
            color: '#2bbbff',
            symbolSize: 5
          },
          {
            field: 'sat_writing',
            name: 'Sat Writing',
            color: '#53f442',
            symbolSize: 5
          }
    ]
    const x = d => {
      return Number(d.revenue)
    }

    return (
      <ScatterPlot
        showXGrid= {true}
        showYGrid= {true}
        xAxis={{innerTickSize: 6, label: "x-label"}}
        yAxis={{label: "Total Pupil Expenditure ($)"}}
        margins= {margins}
        title={title}
        width={width}
        height={height}
        chartSeries={chartSeries}
        data={this.state.data}
        x={x}
      />
    )
  }
}
