import * as d3 from 'd3'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

import React, { Component } from 'react'

export default class PAMap extends Component {

  constructor() {
    super()
    this.state = {
      worldData: []
    }
  }

  projection() {
    const centre_county = [-77.82, 40.91],
    scale_thousand = 1000

    return geoMercator()
      .scale([scale_thousand * 9])
      .translate([ this.props.width / 2, this.props.height / 2 ])
      .center(centre_county)
  }

  componentDidMount() {

    fetch('../data/counties.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(counties => {
          this.setState({
            worldData: counties.features
          })
        })
      })
  }

  render () {

    return (
      <svg width={ this.props.width } height={ this.props.height } viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
        <g className="counties">
          {
            this.state.worldData.map((d,i) => (
              <path
                key={ `path-${ i }` }
                d={ geoPath().projection(this.projection())(d) }
                className="county"
                fill={ `rgba(255,255,255,${1 / this.state.worldData.length * i})` }
                stroke="#FFFFFF"
                strokeWidth={ 0.5 }
              />
            ))
          }
        </g>
      </svg>
    )
  }

}
