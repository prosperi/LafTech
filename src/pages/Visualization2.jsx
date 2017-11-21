import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
//import * as d3 from 'd3'
import {hierarchy, partition, style} from 'd3-hierarchy'
import {select, selectAll} from 'd3-selection'
import {arc} from 'd3-shape'
import {color} from 'd3-color'

class Visualization2 extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hovered: null,
      selected: null,
    }
  }

  componentWillMount () {
    fetch('../data/data_02_process.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(data => {

          let root = hierarchy(data)
              .sum(function (d) { return d.size })

          this.setState({
            root: root,
            hovered: null,
            selected: root
          })
        })
      })
  }

  render () {

    if(!this.state.root){
      return (<div className="visContainer"></div>);
    }
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

    // Data strucure
    let varPartition = partition()
        .size([2 * Math.PI, radius]);

    // Size arcs
    varPartition(this.state.selected);

    let arcGenerator = arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

    let sequenceArray = this.state.hovered != null ? this.getAncestors(this.state.hovered) : [];

    return (

      <div className="visContainer">
        <span id="test-topic"></span>
        <span id="proficiency-level"></span>
        <span id="school-type"></span>
        <span id="percentage"></span>
        <br/>
        <svg
          className="vis2svg"
          width={ this.props.width }
          height={ this.props.height }
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          <g className="vis2"
            transform={"translate(" + this.props.width/2 + "," + this.props.height/2 + ")"}>
            {
              this.state.selected.descendants().map((d,i) => (
                <path
                  key = { `path-${ i }` }
                  display = {function (d) { return d.depth ? null : 'none'; }}
                  d = {arcGenerator(d)}
                  onMouseOver = {() => {this.mouseover(d)}}
                  onClick ={() => {this.onClick(d)}}
                  fill = {color(colors[d.data.name])}
                  opacity = {
                    sequenceArray.indexOf(d) >= 0 ? 1.0 : 0.3
                  }
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

  onClick = (d) =>{
    var newRoot = null;
    console.log("D: " + d.data.name);
    if(d === this.state.selected){
      if(!d.parent){
        console.log("D has no parent")
        return;
      } else {
        console.log("D's Parent: " + d.parent.data.name)
        newRoot = d.parent
      }
    } else {
      console.log("New Root Selected")
      newRoot = d;
    }
    this.setState({
      selected: newRoot,
    })
    this.render()
  }

  mouseover = (d) => {
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
     this.setState({
       hovered: d
     })
     this.render()
   }

}

export default Visualization2
