/* global d3 */
import React from 'react'
import { BarStackChart } from 'react-d3-basic'
import data from '../data/data_01'

const VisualizationOne = () => {
  return (
    <BarStackChart
      showXGrid= {true}
      showYGrid= {true}
      margins= {d3_props.margins}
      title={d3_props.title}
      width={d3_props.width}
      height={d3_props.height}
      chartSeries={d3_props.chartSeries}
      data={data}
      x= {d3_props.x}
      xLabel= {d3_props.xLabel}
      yLabel = {d3_props.yLabel}
      xScale= {d3_props.xScale}
      yScale = {d3_props.yScale}
      xTicks= {d3_props.xTicks}
      yTickFormat={d3_props.yTickFormat}
    />
  )
}

const d3_props = {
  title: 'Visualization 1',
  width: 700,
  height: 300,
  margins: {
    left: 100,
    right: 100,
    top: 10,
    bottom: 10
  },
  chartSeries: [
    {
      field: 'math_algebra_percent_proficient',
      name: 'PSSA Math',
      color: '#828081'
    },
    {
      field: 'reading_percent_lit_proficient_pssa',
      name: 'PSSA Reading',
      color: '#E9C893'
    },
    {
      field: 'writing_percent_proficient_pssa',
      name: 'PSSA Writing',
      color: '#1E392A'
    },
    {
      field: 'scibio_percent_proficient_pssa',
      name: 'PSSA Sci/Bio',
      color: '#3CC47C'
    }
  ],
  x: d => d.pupil_expenditure_total,
  xScale: 'ordinal',
  yScale: 'linear',
  xLabel: 'Pupil Expenditure ($)',
  yLabel: 'Total PSSA Score(AVG)',
  yTickFormat: d3.format('.2s'),
  xTicks: [10, '$']
}

export default VisualizationOne
