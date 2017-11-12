import React, { Component } from 'react'
import { ScatterPlot } from 'react-d3-basic'
import { Container, Image, Header, Icon, Dropdown, Divider } from 'semantic-ui-react'

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
      left: 50,
      right: 50,
      top: 50,
      bottom: 50
    }

    let chartSeries = [
      {
            field: 'satMath',
            name: 'Sat Math',
            color: '#ff2a2a',
            symbolSize: 5
          },
          {
            field: 'satReading',
            name: 'Sat Reading',
            color: '#2bbbff',
            symbolSize: 5
          },
          {
            field: 'satWriting',
            name: 'Sat Writing',
            color: '#53f442',
            symbolSize: 5
          }
    ]
    const x = d => {
      console.log(d)
      return d.index
    }

    return (
      <ScatterPlot
        showXGrid= {true}
        showYGrid= {true}
        xAxis={{innerTickSize: 6, label: "x-label"}}
        yAxis={{label: "Total Revenue ($)"}}
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
