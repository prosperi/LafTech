import React, { Component } from 'react'
import { BarStackChart } from 'react-d3-basic'
import { Container, Image, Header, Icon, Dropdown, Divider } from 'semantic-ui-react'

import data from '../data/data_01'

export default class Visualization1 extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }
  }

  render () {
  let title = 'Visualization 1'

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
          field: 'math_algebra_percent_proficient',
          name: 'PSSA Math',
          color: '#ff2a2a'
        },
        {
          field: 'reading_percent_lit_proficient_pssa',
          name: 'PSSA Reading',
          color: '#2bbbff'
        },
        {
          field: 'writing_percent_proficient_pssa',
          name: 'PSSA Writing',
          color: '#53f442'
        },
        {
          field: 'scibio_percent_proficient_pssa',
          name: 'PSSA Sci/Bio',
          color: '#ffed00'
        }
  ]
  const x = d => {
    return d.index
  },
  xScale = 'ordinal',
  yScale = 'linear',
  xLabel = "Pupil Expenditure",
  yLabel = "Total PSSA Score",
  xTicks = [10, "$"];

    return (
      <BarStackChart
        showXGrid= {true}
        showYGrid= {true}
        margins= {margins}
        title={title}
        width={width}
        height={height}
        chartSeries={chartSeries}
        data={data}
        xLabel= {xLabel}
        yLabel = {yLabel}
        xScale= {xScale}
        yScale = {yScale}
        xTicks= {xTicks}
        x= {x}
      />
    )
  }
  }
