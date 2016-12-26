import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3'
import ReactDom from 'react-dom'

import classes from './D3ChartTree.scss'

class D3ChartTree extends React.Component {

  componentWillReceiveProps(nextProps) {

    if(nextProps.treeData != this.props.treeData){
      this.renderTree(nextProps.treeData, ReactDom.findDOMNode(this));
    }
  };


  render() {
    return (
      <svg/>
    );
  } ;


  renderTree(treeData, svgDomNode) {

    let margin = {top: 20, right: 90, bottom: 30, left: 90},
      width = 1000 - margin.left - margin.right, //TODO: this is hardcoded so it antoher screen it will not work
      height = 700 - margin.top - margin.bottom;


    //Remove all elements before render
    d3.select(svgDomNode).selectAll("*").remove();

    //Make the new SVG
    let svg = d3.select(svgDomNode)
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // x-scale and x-axis
    let experienceName = [""];
    let formatSkillPoints = function (d) {
      return experienceName[d % 6];
    };

    let xScale = d3.scaleLinear()
      .domain([0, 5]) //This depends on the max ranking number
      .range([0, 600]);

    let xAxis = d3.axisTop()
      .scale(xScale)
      .ticks(5)
      .tickFormat(formatSkillPoints);

// declares a tree layout and assigns the size
    let tree = d3.cluster()                 // This D3 API method setup the Dendrogram datum position.
      .size([height, width - 460])    // Total width - bar chart width = Dendrogram chart width
      .separation(function separate(a, b) {
        return a.parent == b.parent            // 2 levels tree grouping for category
        || a.parent.parent == b.parent
        || a.parent == b.parent.parent ? 0.4 : 0.8;
      });

    let root = d3.hierarchy(treeData, function (d) { console.log(d);
      return d.children;
    });

    tree(root);

    let link = svg.selectAll("." + classes.link)
      .data(root.descendants().slice(1))
      .enter().append("path")
      .classed(classes.link, true)
      .attr("d", function (d) { console.log(d);
        return "M" + d.y + "," + d.x
          + "C" + (d.parent.y + 100) + "," + d.x
          + " " + (d.parent.y + 100) + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
      });

    // Setup position for every datum; Applying different css classes to parents and leafs.
    let node = svg.selectAll("." + classes.node)
      .data(root.descendants())
      .enter().append("g")
      .attr("class", function (d) { console.log(d);
        return classes.node + (d.children ? " " + classes.a : " " + classes.j);
      })
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

    // Draw every datum a small circle.
    node.append("circle")
      .attr("r", 5);

    // Setup G for every leaf datum.
    let leafNodeG = svg.selectAll("." + classes.j)
      .append("g")
      .attr("class", classes.j)
      .attr("transform", "translate(8,-13)");

    leafNodeG.append("rect")
      .attr("class", classes.shadow)
      .style("fill", function (d) {console.log(d.data.color);
        return d.data.color;
      })
      .attr("width", 2)
      .attr("height", 30)
      .attr("rx", 2)
      .attr("ry", 2)
      .transition()
      .duration(800)
      .attr("width", function (d) { console.log(d.data.value);
        return xScale(d.data.value);
      });

    leafNodeG.append("text")
      .attr("dy", 19.5)
      .attr("x", 8)
      .style("text-anchor", "start")
      .text(function (d) {console.log(d.data.name);
        return d.data.name;
      });

    // Write down text for every parent datum
    let internalNode = svg.selectAll("." + classes.a);
    internalNode.append("text")
      .attr("y", -10)
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.data.name;
      });

    // Attach axis on top of the first leaf datum.
    let firstEndNode = svg.select("." + classes.j);
    firstEndNode.insert("g")
      .attr("class",classes.b)
      .attr("transform", "translate(7,14)")
      .call(xAxis);

    // tick mark for x-axis
    firstEndNode.insert("g")
      .attr("class", classes.grid)
      .attr("transform", "translate(7," + (height - 15) + ")")
      .call(d3.axisBottom()
        .scale(xScale)
        .ticks(5)
        .tickSize(-height, 0, 0)
        .tickFormat("")
      );

    // Emphasize the y-axis baseline.
    svg.selectAll("." + classes.grid).select("line")
      .style("stroke-dasharray", "20,1")
      .style("stroke", "black");

    // The moving ball
    let ballG = svg.insert("g")
      .attr("transform", "translate(" + 1100 + "," + height / 2 + ")")
      .attr("class", classes.ballG);

    ballG.insert("circle")
      .attr("class", classes.shadow)
      .attr("class", classes.ballG)
      .attr("r", 20);

    ballG.insert("text")
      .style("text-anchor", "middle")
      .attr("dy", 5)
      .text("0.0");

    // Animation functions for mouse on and off events.
    d3.selectAll("." + classes.j)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    function handleMouseOver(d) {
      let leafG = d3.select(this);

      leafG.select("rect")
        .attr("stroke", "#4D4D4D")
        .attr("stroke-width", "2");


      let ballGMovement = ballG.transition()
        .duration(400)
        .attr("transform", "translate(" + (d.y
          + xScale(d.data.value) + 90) + ","
          + (d.x + 1.5) + ")");

      ballGMovement.select("circle")
        .style("fill", d.data.color)
        .attr("r", 18);

      ballGMovement.select("text")
        .delay(300)
        .text(d.data.value);
    }

    function handleMouseOut() {
      let leafG = d3.select(this);

      leafG.select("rect")
        .attr("stroke-width", "0");
    }
  };
}

D3ChartTree.propTypes = {
  treeData: PropTypes.any
};
export default D3ChartTree;
