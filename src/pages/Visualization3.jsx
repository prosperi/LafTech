import React, { Component } from 'react'
import { LineChart } from 'react-d3-basic'

import data from '../data/data_03'

export default class Visualization3 extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render () {
    let title = 'Visualization 3'
    let schoolList = ['Huntington', 'Mason', 'Carter']
    let satMath = [570.25, 640.00, 584.10]
    let satReading = [590.20, 660.52, 543.30]
    let satWriting = [600.25, 610.00, 575.10]

    let width = 700
    let height = 300

    let margins = {
      left: 10,
      right: 100,
      top: 50,
      bottom: 50
    }

    let chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e',
        style: {
          'stroke-width': 2,
          'stroke-opacity': .2,
          'fill-opacity': .2
        }
      }
    ]

    const x = d => {
      console.log(d)
      return d.index
    }

    return (
      <LineChart
        margins= {margins}
        title={title}
        width={width}
        height={height}
        chartSeries={chartSeries}
        data={data}
        x={x}
      />
    )
  }
}
