import { geoMercator, geoPath } from 'd3-geo'

import React, { Component } from 'react'

export default class PAMap extends Component {

  constructor() {
    super()
    this.state = {
      worldData: [],
      selected: '',
      containerWidth: null,
      containerHeight: null
    }
  }

  projection() {
    const center = [-77.82, 40.91]
    const scale = 360*this.state.containerWidth/38

    return geoMercator()
      .scale([scale])
      .translate([ this.state.containerWidth / 2, this.state.containerHeight / 2 ])
      .center(center)
  }

  componentWillMount() {
    fetch('../data/counties.json')
      .then(response => {
        if (response.status !== 200) {
          return
        }
        response.json().then(counties => {
          this.setState({
            worldData: counties.features
          })
        })
      })
  }

  componentDidMount() {

    this.fitParentContainer()
    window.addEventListener('resize', this.fitParentContainer)

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitParentContainer)
  }

  fitParentContainer = () => {
    const currentContainerWidth = this.refs.svg.parentNode.clientWidth

    this.setState({
      containerWidth: Math.min(900, currentContainerWidth),
      containerHeight: Math.min(900, currentContainerWidth) * (600/960)
    })
  }

  render () {
    return (
      <svg
        ref='svg'
        width={ this.state.containerWidth }
        height={ this.state.containerHeight }
      >
        <g className='counties'>
          {
            this.state.worldData.map((d,i) => {
              const path = geoPath().projection(this.projection())
              return (
                <g
                  key={ `path-container-${ i }` }
                  onClick={() => this.props.onChange(d.properties.NAME)}
                >
                  <path
                    key={ `path-${ i }` }
                    d={ path(d) }
                    className="county"
                    fill={ `rgb(40,40,40)` }
                    stroke="#666"
                    strokeWidth={ 1 }
                  />
                  <text
                    key={ `path-label-${ i }` }
                    fill='#CCC'
                    x={ path.centroid(d)[0] }
                    y={ path.centroid(d)[1] }
                    textAnchor='middle'
                    fontSize='12'
                  >
                    { d.properties.NAME }
                  </text>
                </g>
              )
            })
          }
        </g>
      </svg>
    )
  }

}
