import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import D3 from 'react-d3-core'
import data from '../data/data_02_process.js'

class Visualization2 extends Component {
  constructor (props) {
    super(props)

    this.state = {

    }
  }

  componentDidMount () {

  }

  render () {
    // letiables
    let width = 500;
    let height = 500;
    let radius = Math.min(width, height) / 2;
    console.log(D3);
    /*
    let color = D3.scaleOrdinal(D3.schemeCategory20b);
    // Create primary <g> element
    let g = D3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Data strucure
    let partition = D3.partition()
        .size([2 * Math.PI, radius]);

    // Find data root
    let root = D3.hierarchy(nodeData)
        .sum(function (d) { return d.size});

    // Size arcs
    partition(root);
    let arc = D3.arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

    // Put it all together
    g.selectAll('path')
        .data(root.descendants())
        .enter().append('path')
        .attr('display', function (d) { return d.depth ? null : 'none'; })
        .attr('d', arc)
        .style('stroke', '#fff')
        .style('fill', function (d) { return color(colors[d.data.name]); })
        .on('mouseover', mouseover);*/
    return (
        <Container className='vis2'>
          <svg></svg>
          <span id='test-topic'></span>
          <span id='proficiency-level'></span>
          <span id='school-type'></span>
          <span id='percentage'></span>
        </Container>
    )
  }

  getAncestors(node) {
    let path = [];
    let current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  isTopicNode(d){
    let ancestorsArray = getAncestors(d);
    return ancestorsArray.length == 1;
  }

  isProficiencyNode(d){
    let ancestorsArray = getAncestors(d);
    return ancestorsArray.length == 2;
  }

  isSchoolNode(d){
    let ancestorsArray = getAncestors(d);
    return ancestorsArray.length == 3;
  }

  mouseover(d){
     let sequenceArray = getAncestors(d);
     if(isTopicNode(d)){
       D3.select('#percentage')
         .text('')
       D3.select('#test-topic')
         .text(d.data.name)
       D3.select('#proficiency-level')
         .text('')
       D3.select('#school-type')
         .text('')
     } else if(isProficiencyNode(d)) {
       D3.select('#percentage')
         .text(d.value/d.parent.value)
       D3.select('#test-topic')
         .text(d.parent.data.name)
       D3.select('#proficiency-level')
         .text(d.data.name)
       D3.select('#school-type')
         .text('')
     } else if(isSchoolNode(d)) {
       D3.select('#percentage')
         .text(d.value / d.parent.parent.value)
       D3.select('#test-topic')
         .text(d.parent.parent.data.name)
       D3.select('#proficiency-level')
         .text(d.parent.data.name)
       D3.select('#school-type')
         .text(d.data.name)
     }

     // Fade all the segments.
     D3.selectAll('path')
         .style('opacity', 0.3);

     // Then highlight only those that are an ancestor of the current segment.
     g.selectAll('path')
         .filter(function(node) {
                   return (sequenceArray.indexOf(node) >= 0);
                 })
         .style('opacity', 1);
   }

}

export default Visualization2
