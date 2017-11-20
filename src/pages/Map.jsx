import { geoMercator, geoPath } from 'd3-geo'

import React, { Component } from 'react'

export default class PAMap extends Component {

  constructor() {
    super()
    this.state = {
      worldData: [],
      selected: ''
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
      <svg
        width={ this.props.width }
        height={ this.props.height }
      >
        <g className="counties">
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
                    fill={ this.state.selected == `path-${ i }` ? `rgb(120,120,120)` :  `rgb(40,40,40)` }
                    stroke="#666"
                    strokeWidth={ 1 }
                    onMouseOver={ () => { this.setState({selected: `path-${ i }`}) } }
                  />
                  <text
                    key={ `path-label-${ i }` }
                    fill="#CCC"
                    x={ path.centroid(d)[0] }
                    y={ path.centroid(d)[1] }
                    textAnchor="middle"
                    fontSize="12"
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
