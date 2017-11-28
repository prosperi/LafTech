import React, { Component } from 'react'
import {hierarchy, partition} from 'd3-hierarchy'
import {arc} from 'd3-shape'
import {color} from 'd3-color'

class Visualization2 extends Component {
  constructor (props) {
    super(props)
    this.root = null
    this.state = {
      hovered: null,
      selected: null
    }
  }

  componentWillMount () {
    fetch('http://localhost:3001/api/v1/visualizations/2')
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(data => {

          this.root = hierarchy(this.formatDataFromApi(data))
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
      return (<div className='visContainer'></div>);
    }
    let radius = Math.min(this.props.width, this.props.height) / 2;

    const colors = {
      'FUTURE': '#38c742',
      'CS': '#303ce3',
      'SD': '#114183',
      'A': '#259ee7',
      'P': '#7ab6db',
      'B': '#d8d8d8',
      'BB': '#db7712',
      'Math': '#c35b48',
      'English': '#e5c027',
      'Science': '#125592'
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

      <div className='visContainer'>
        <svg
          className='vis2svg'
          width={ this.props.width }
          height={ this.props.height }
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          <g className='vis2'
            transform={'translate(' + this.props.width/2 + ',' + this.props.height/2 + ')'}>
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
                    sequenceArray.indexOf(d) >= 0 ? 1.0 : 0.6
                  }
                />
              ))
            }
          </g>
          <text textAnchor='middle' x={this.props.width/2} y={this.props.height/2 - 30}>
            {this.state.testTopic}
          </text>
          <text textAnchor='middle' x={this.props.width/2} y={this.props.height/2 -10}>
            {this.state.profLevel}
          </text>
          <text textAnchor='middle' x={this.props.width/2} y={this.props.height/2 + 10}>
            {this.state.schoolType}
          </text>
          <text textAnchor='middle' x={this.props.width/2} y={this.props.height/2 + 30}>
            {Math.round(this.state.percentage * 1000) / 1000}
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
    let topicNode = this.recursiveFind(this.state.dataRoot, this.state.testTopic)

    return this.recursiveFind(topicNode, d.data.name)
  }

  // pass in the name of the node u want to find
  // and the node you want to recursively search
  recursiveFind = (d, name) => {
    // base case, current node is the node to find
    if(d.data.name === name){
      return d;
    }

    let desc = d.descendants();

    // remove d from the descendants
    desc.shift();

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
          percentage: 1,
          profLevel: '',
          schoolType: ''
        })
      } else if(this.isProficiencyNode(d)) {
        this.setState({
          testTopic: d.parent.data.name,
          percentage: d.value/d.parent.value,
          profLevel: d.data.name,
          schoolType: ''
        })
      } else if(this.isSchoolNode(d)) {
        this.setState({
          testTopic: d.parent.parent.data.name,
          percentage: d.value/d.parent.parent.value,
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

  formatDataFromApi = (data) =>{
    var profLevels = ['A', 'P', 'B', 'BB']
    var result = {}
    for(var tuple of data){

      var subject = tuple.subject
      if(subject == 'English Language Arts'){
        subject = 'English'
      }
      var leaType = tuple.lea_type
      if(!result.hasOwnProperty(subject)){
        result[subject] = {
          'A': {},
          'P': {},
          'B': {},
          'BB': {}
        };
      }

      for(var profLevel of profLevels){
        if(!profLevel.hasOwnProperty(leaType)){
          result[subject][profLevel][leaType] = {};
        }
      }

      result[subject]['A'][leaType] = tuple.avgpctadvanced/100
      result[subject]['P'][leaType] = tuple.avgpctproficient/100
      result[subject]['B'][leaType] = tuple.avgpctbasic/100
      result[subject]['BB'][leaType] = tuple.avgpctbelowbasic/100
    }

    return this.visFormatData(result);
  }

  visFormatData = (data) => {
    var result = {
      'name': 'TOPICS',
      'children': []
    }

    for(var subject in data){
      if(data.hasOwnProperty(subject)){
        var subjectEntry = {
          'name': subject,
          'children': []
        }
        for(var profLevel in data[subject]){
          if(data[subject].hasOwnProperty(profLevel)){
            var profLevelEntry = {
              'name': profLevel,
              'children': []
            }
            for(var leaType in data[subject][profLevel]){
              if(data[subject][profLevel].hasOwnProperty(leaType)){
                var leaTypeEntry = {
                  'name': leaType,
                  'size': data[subject][profLevel][leaType]
                }
                profLevelEntry.children.push(leaTypeEntry)
              }
            }
            subjectEntry.children.push(profLevelEntry)
          }
        }
        result.children.push(subjectEntry)
      }
    }

    return result;
  }

}

export default Visualization2
