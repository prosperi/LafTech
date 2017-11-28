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
    this.root = null
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

          this.root = hierarchy(data)
              .sum(function (d) { return d.size })

          this.setState({
            hovered: null,
            selected: this.root,
            selectedReal: this.root,
            dataRoot: this.root
          })
        })
      })
  }

  render () {

    if(!this.state.selected){
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
    this.state.selected.sum(function (d) { return d.size });
    let partitionGraph = partition().size([2 * Math.PI, radius]);
    partitionGraph(this.state.selected)

    let arcGenerator = arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

    let sequenceArray = this.state.hovered != null ? this.getAncestors(this.state.hovered) : [];

    return (

      <div className="visContainer">
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
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 - 30}>
            {this.state.testTopic}
          </text>
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 -10}>
            {this.state.profLevel}
          </text>
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 + 10}>
            {this.state.schoolType}
          </text>
          <text textAnchor="middle" x={this.props.width/2} y={this.props.height/2 + 30}>
            {Math.ceil(this.state.percentage * 100) / 100}
          </text>
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
    return d.height == 2;
  }

  isProficiencyNode = (d) => {
    return d.height == 1;
  }

  isSchoolNode = (d) => {
    return d.height == 0;
  }

  onClick = (d) =>{
    let newRoot = null;
    if(d === this.state.selected){
      // if the node is the same as the selected node, then we go up a layer

      if(d.data.name === this.state.dataRoot.data.name){
        // if we are at the dataRoot, don't do anything
        return;

      } else {
        //otherwise we have parents
        newRoot = this.state.selectedReal.parent
      }
    } else {
      // otherwise the new root becomes the dataNode at d
      newRoot = this.findDataNode(d);
    }

    console.log("Setting newRoot to : " + newRoot.data.name);
    this.setState({
      // the selected node becomes the root of a copied subtree
      selected: newRoot.copy(),

      // the real selected node is stored
      selectedReal: newRoot
    })
    this.render()
  }

  // finds the node in the complete data tree
  // d can come from the copied tree
  findDataNode = (d) => {
    // since we know the topic node for sure, the children's names are not
    // ambiguous.
    console.log("FindDataNode in topic: " + this.state.testTopic)
    console.log("FindDataNode on d: " + d.data.name)
    let topicNode = this.recursiveFind(this.state.dataRoot, this.state.testTopic)
    console.log("Found topic node: " + topicNode.data.name)
    return this.recursiveFind(topicNode, d.data.name)
  }

  // pass in the name of the node u want to find
  // and the node you want to recursively search
  recursiveFind = (d, name) => {
    console.log(d.data.name + ", " + name)
    // base case, current node is the node to find
    if(d.data.name === name){
      return d;
    }

    let desc = d.descendants();

    // remove d from the descendants
    desc.shift();


    for(var child in desc){
      console.log("desc["+child+"]: " + desc[child].data.name)
    }
    // base case, current node has no children and is not the node to find
    if(desc.length == 0){
      return null;
    }

    // recurse for each child
    for(var child of desc){

      // look for a node with name equal to name in the child
      var result = this.recursiveFind(child, name)

      // if we found match, stop running and return it
      if(result != null){
        return result;
      }
    }

    // the node was not found in the tree
    return null;
  }

  mouseover = (d) => {
    if(this.state.selectedReal.height >= 2){
      if(this.isTopicNode(d)){
        this.setState({
          testTopic: d.data.name,
          percentage: '',
          profLevel: '',
          schoolType: ''
        })
      } else if(this.isProficiencyNode(d)) {
        this.setState({
          testTopic: d.parent.data.name,
          percentage: d.value/this.state.selectedReal.value,
          profLevel: d.data.name,
          schoolType: ''
        })
      } else if(this.isSchoolNode(d)) {
        this.setState({
          testTopic: d.parent.parent.data.name,
          percentage: d.value/this.state.selectedReal.value,
          profLevel: d.parent.data.name,
          schoolType: d.data.name
        })
      }
    } else {
      if(this.isProficiencyNode(d)) {
        this.setState({
          percentage: d.value/this.state.selectedReal.value,
          profLevel: d.data.name,
          schoolType: ''
        })
      } else if(this.isSchoolNode(d)) {
        this.setState({
          percentage: d.value/this.state.selectedReal.value,
          profLevel: d.parent.data.name,
          schoolType: d.data.name
        })
      }
    }
    this.setState({
      hovered: d
    })
    this.render()
  }

}

export default Visualization2
