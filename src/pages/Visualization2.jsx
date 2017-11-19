import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
//import * as d3 from 'd3'
import {hierarchy, partition} from 'd3-hierarchy'
import {select, selectAll} from 'd3-selection'
import {arc} from 'd3-shape'
import {color} from 'd3-color'

class Visualization2 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nodeData: {},
    }
  }

  componentDidMount () {
    fetch('../data/data_02_process.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(data => {
          this.setState({
            nodeData: data
          })
        })
      })
  }

  render () {
    // letiables
    let width = 500;
    let height = 500;
    let radius = Math.min(this.props.width, this.props.height) / 2;

    const colors = {
            'CTC': '#38c742',
            'CS': '#303ce3',
            'PS': '#114183',
            'A': '#259ee7',
            'P': '#7ab6db',
            'B': '#d8d8d8',
            'BB': '#db7712',
            'Math': '#c35b48',
            'Reading': '#e5c027',
            'Writing': '#458962',
            'SciBio': '#125592'
          }

    // Create primary <g> element
    /*select('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');*/

    // Data strucure
    let varPartition = partition()
        .size([2 * Math.PI, radius]);
    // Find data root
    let root = hierarchy(this.state.nodeData)
        .sum(function (d) { return d.size});

    // Size arcs
    varPartition(root);

    let arcGenerator = arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });
    // Put it all together
    /*
    g.selectAll('path')
        .data(root.descendants())
        .enter()
        .append('path')
        .attr('display', function (d) { return d.depth ? null : 'none'; })
        .attr('d', varArc)
        .style('stroke', '#fff')
        .style('fill', function (d) {
          return color(colors[d.data.name]);
        })
        .on('mouseover', this.mouseover);*/
        console.log(this.mouseover)
    return (
      <div className="visContainer">
        <span id="test-topic"></span>
        <span id="proficiency-level"></span>
        <span id="school-type"></span>
        <span id="percentage"></span>
        <br/>
        <svg
          width={ this.props.width }
          height={ this.props.height }
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          <g className="vis2"
            transform={"translate(" + this.props.width/2 + "," + this.props.height/2 + ")"}>
            {
              root.descendants().map((d,i) => (
                <path
                  key={ `path-${ i }` }
                  display={function (d) { return d.depth ? null : 'none'; }}
                  d={arcGenerator(d)}
                  onMouseOver = {() => {this.mouseover(d)}}
                />
              ))
            }
          </g>
        </svg>
      </div>
    )
  }

  getAncestors = (node) => {
    let path = [];
    let current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  isTopicNode = (d) => {
    let ancestorsArray = this.getAncestors(d);
    return ancestorsArray.length == 1;
  }

  isProficiencyNode = (d) => {
    let ancestorsArray = this.getAncestors(d);
    return ancestorsArray.length == 2;
  }

  isSchoolNode = (d) => {
    let ancestorsArray = this.getAncestors(d);
    return ancestorsArray.length == 3;
  }

  mouseover = (d) => {
     let sequenceArray = this.getAncestors(d);
     if(this.isTopicNode(d)){
       select('#percentage')
         .text('')
       select('#test-topic')
         .text(d.data.name)
       select('#proficiency-level')
         .text('')
       select('#school-type')
         .text('')
     } else if(this.isProficiencyNode(d)) {
       select('#percentage')
         .text(d.value/d.parent.value)
       select('#test-topic')
         .text(d.parent.data.name)
       select('#proficiency-level')
         .text(d.data.name)
       select('#school-type')
         .text('')
     } else if(this.isSchoolNode(d)) {
       select('#percentage')
         .text(d.value / d.parent.parent.value)
       select('#test-topic')
         .text(d.parent.parent.data.name)
       select('#proficiency-level')
         .text(d.parent.data.name)
       select('#school-type')
     }

     // Fade all the segments.
     select('svg').selectAll('path')
         .style('opacity', 0.3);

     // Then highlight only those that are an ancestor of the current segment.
     select('svg').select('g').selectAll('path')
         .filter(function(node) {
                   return (sequenceArray.indexOf(node) >= 0);
                 })
         .style('opacity', 1);
   }

}

export default Visualization2
