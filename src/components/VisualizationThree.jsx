import React, { Component } from 'react'
import { ScatterPlot } from 'react-d3-basic'
import { Container, Divider } from 'semantic-ui-react'

export default class Visualization3 extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch(this.props.url).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)
      this.setState({ data: data })
    })
  }

  render () {
    if(!this.state.data){
      return(<div></div>)
    }

    let title = 'Visualization 3'
    let width = this.props.width
    let height = this.props.height
    let margins = {
      left: 100,
      right: 50,
      top: 10,
      bottom: 50
    }

    let chartSeries = [
      {
        field: 'sattotal',
        name: 'Sat Total Score',
        color: '#3CC47C',
        symbolSize: 5
      }
    ]

    const x = d => {
      return Number(d.totalrevenue)
    },
    xLabel = 'Total Revenue ($)',
    yLabel = 'SAT Score (AVG)',
    xScale = 'linear',
    xTicks = [10, '$']

    return (

        this.state.data.length > 0
        ? (
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
        : (
          <Container className='analysis-section'>
            <p className='analysis-title' style={{textAlign: 'center'}}>
              NOT ENOUGH DATA TO COMPARE THE TOTAL REVENUE AND THE AVERAGE SCORES FOR THE THREE DIFFERENT SECTIONS ON THE SAT
            </p>
            <hr style={{width: '500px', borderColor: '#707070'}} />
          </Container>
        )

    )
  }
}
