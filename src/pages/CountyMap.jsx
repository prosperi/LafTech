import { geoMercator, geoPath } from 'd3-geo'
import { browserHistory } from 'react-router'
import React, { Component } from 'react'

export default class PAMap extends Component {

  constructor() {
    super()
    this.state = {
      worldData: [],
      containerWidth: null,
      containerHeight: null,
      selectedFeature: null,
      selected: null
    }
  }

  projection() {
    const center = this.props.county ? geoPath().centroid(this.state.selectedFeature) : [-77.82, 40.91]
    const scale = 360*this.state.containerWidth/8

    return geoMercator()
      .scale([scale])
      .translate([ this.state.containerWidth / 2, this.state.containerHeight / 2 ])
      .center(center)
  }

  componentWillMount() {
    // Get data for the map
    fetch('../data/counties.json')
      .then(response => {
        if (response.status !== 200) {
          return
        }
        response.json().then(counties => {
          const selectedCounty = this.props.county || 'Centre'
          const selectedFeature = counties.features.find((el) => {
            return el.properties.NAME == selectedCounty
          })
          this.setState({
            worldData: counties.features,
            selectedFeature: selectedFeature
          })
        })
      })
  }

  componentDidMount() {
    this.fitParentContainer()
    setTimeout(() => this.fitParentContainer(), 100)
    window.addEventListener('resize', this.fitParentContainer)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fitParentContainer)
  }

  fitParentContainer = () => {
    const { containerWidth } = this.state
    const currentContainerWidth = this.refs.svg.parentNode.clientWidth

    const shouldResize = containerWidth !== Math.min(900, currentContainerWidth)

    if (shouldResize) {
      this.setState({
        containerWidth: Math.min(900, currentContainerWidth),
        containerHeight: Math.min(900, currentContainerWidth) * (600/960)
      })
    }
  }

  render () {
    return (
      <svg
        ref='svg'
        width={ this.state.containerWidth }
        height={ this.state.containerHeight }
      >
        <g className='schools'>
          {
            this.state.worldData.map((d,i) => {
              if (d !== this.state.selectedFeature)
                return (<g key={ `path-container-${ i }` } />)
              const path = geoPath().projection(this.projection())
              return (
                <g
                  key={ `path-container-${ i }` }
                >
                  <path
                    key={ `path-${ i }` }
                    d={ path(d) }
                    className='county'
                    fill={ 'rgb(40,40,40)' }
                    stroke='#666'
                    strokeWidth={ 1 }
                  />
                </g>
              )
            })
          }
          {
            this.props.schools.map((school) => {
                const {school_name, state_school_id, latitude, longitude} = school
                if (!latitude || !longitude) return
                const cx = this.projection()([longitude, latitude])[0],
                      cy = this.projection()([longitude, latitude])[1]
                if (!cx || !cy) return
                return (
                  <g
                    key = {`circle-${state_school_id}`}
                    opacity={
                      (
                        this.props.currentSchools.indexOf(school) == -1 ||
                        (this.props.selected && this.props.selected != school)
                      ) ? '0.1' : '1'}
                    className='school_marker'
                    onClick={() => browserHistory.push(`/school/${state_school_id}`)}
                    onMouseEnter={() => this.setState({selected: school})}
                    onMouseLeave={() => this.setState({selected: null})}
                  >
                    <circle
                      key = {`biggest-circle-${state_school_id}`}
                      cx = { cx }
                      cy = { cy }
                      fill='rgba(255, 204, 26, 0.04)'
                      r = '24px'
                    />
                    <circle
                      key = {`medium-circle-${state_school_id}`}
                      cx = { cx }
                      cy = { cy }
                      fill='rgba(255, 204, 26, 0.09)'
                      r = '16px'
                    />
                    <circle
                      key = {`smallest-circle-${state_school_id}`}
                      cx = { cx }
                      cy = { cy }
                      fill='yellow'
                      r = '4px'
                    />
                    {(this.state.selected == school || this.props.selected == school)
                      &&
                      (<text
                        key={ `school-name-${state_school_id}` }
                        fill='#CCC'
                        x={ cx }
                        y={ cy - 20 }
                        textAnchor='middle'
                        fontSize='12'
                        className={'tooltip'}
                      >
                        { school_name }
                      </text>)
                    }
                  </g>
                )
              }
            )
          }
        </g>
      </svg>
    )
  }

}
