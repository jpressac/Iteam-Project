import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3'
import ReactDom from 'react-dom'

import classes from './D3Tree.scss'

var root, treemap, svg,i,duration,path;


class D3Tree extends React.Component {

  componentDidMount() {
    var mountNode = ReactDom.findDOMNode(this);

    // Render the tree usng d3 after first component mount
    this.renderTree(this.props.treeData, mountNode);
  };

  shouldComponentUpdate(nextProps, nextState) {
    // Delegate rendering the tree to a d3 function on prop change
    this.renderTree(this.props.treeData, ReactDom.findDOMNode(this));

    // Do not allow react to render the component on prop change
    return false;
  };

  render() {

    // Render a blank svg node
    return (
      <svg></svg>
    );
  }


  ;


   renderTree(treeData, svgDomNode) {


     var margin = {top: 20, right: 90, bottom: 30, left: 90},
       width = 1000 - margin.left - margin.right,
       height = 500- margin.top - margin.bottom;

      i = 0;
     duration = 750;

// declares a tree layout and assigns the size
     treemap = d3.tree()
       .size([height, width]);

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
      svg = d3.select("body").append("svg")
       .attr("width", width + margin.right + margin.left)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", "translate("
         + margin.left + "," + margin.top + ")");

     root = d3.hierarchy(treeData, function (d) {
       return d.children;
     });
     root.x0 = height / 2;
     root.y0 = 0;

// Collapse after the second level
     root.children.forEach(collapse);

     update(root);

// Collapse the node and all it's children
     function collapse(d) {
       if (d.children) {
         d._children = d.children;
         d._children.forEach(collapse);
         d.children = null
       }
     }
      function update(source) {

       // Assigns the x and y position for the nodes
       var treeData = treemap(root);

       // Compute the new tree layout.
       var nodes = treeData.descendants(),
         links = treeData.descendants().slice(1);

       // Normalize for fixed-depth.
       nodes.forEach(function (d) {
         d.y = d.depth * 180;
         console.log(d.depth);
       });

       // ****************** Nodes section ***************************

       // Update the nodes...
       var node = svg.selectAll('g.'+ classes.node)
         .data(nodes, function (d) {
           return d.id || (d.id = ++i);
         });

       // Enter any new modes at the parent's previous position.
       var nodeEnter = node.enter().append('g')
         .classed(classes.node, true)
         .attr("transform", function (d) {
           return "translate(" + source.y0 + "," + source.x0 + ")";
         })
         .on('click', click);

       // Add Circle for the nodes
       nodeEnter.append('circle')
         .classed(classes.node, true)
         .attr('r', 1e-6)
         .style("fill",  function (d) {
           let color;
           if (d.depth===1) {
             color="#999"
           }
           if (d.depth===2) {
             color="#777"
           }
           if (d.depth===3) {
             color="#eee"
           }
           console.log(color);
           return d._children ? "lightsteelblue" : color;
         });

       // Add labels for the nodes
       nodeEnter.append('text')
         .attr("dy", ".35em")
         .attr("x", function (d) {
           return d.children || d._children ? -13 : 13;
         })
         .attr("text-anchor", function (d) {
           return d.children || d._children ? "end" : "start";
         })
         .text(function (d) {
           return d.data.name;
         });

       // UPDATE
       var nodeUpdate = nodeEnter.merge(node);

       // Transition to the proper position for the node
       nodeUpdate.transition()
         .duration(duration)
         .attr("transform", function (d) {
           return "translate(" + d.y + "," + d.x + ")";
         });

       // Update the node attributes and style
       nodeUpdate.select('circle.'+ classes.node)
         .attr('r', 10)
         .style("fill",function (d) {
           let color;
           if (d.depth===1) {
             color="red"
           }
           if (d.depth===2) {
             color="green"
           }
           if (d.depth===3) {
             color="blue"
           }
           console.log(color);
           return d._children ? "lightsteelblue" : color;
         })
         .attr('cursor', 'pointer');


       // Remove any exiting nodes
       var nodeExit = node.exit().transition()
         .duration(duration)
         .attr("transform", function (d) {
           return "translate(" + source.y + "," + source.x + ")";
         })
         .remove();

       // On exit reduce the node circles size to 0
       nodeExit.select('circle')
         .attr('r', 4);

       // On exit reduce the opacity of text labels
       nodeExit.select('text')
         .style('fill-opacity', 1e-6);

       // ****************** links section ***************************

       // Update the links...
       var link = svg.selectAll('path.'+ classes.link)
         .data(links, function (d) {
           return d.id;
         });

       // Enter any new links at the parent's previous position.
       var linkEnter = link.enter().insert('path', "g")
         .classed(classes.link, true)
         .attr('d', function (d) {
           var o = {x: source.x0, y: source.y0};
           return diagonal(o, o)
         });

       // UPDATE
       var linkUpdate = linkEnter.merge(link);

       // Transition back to the parent element position
       linkUpdate.transition()
         .duration(duration)
         .attr('d', function (d) {
           return diagonal(d, d.parent)
         });

       // Remove any exiting links
       var linkExit = link.exit().transition()
         .duration(duration)
         .attr('d', function (d) {
           var o = {x: source.x, y: source.y};
           return diagonal(o, o)
         })
         .remove();

       // Store the old positions for transition.
       nodes.forEach(function (d) {
         d.x0 = d.x;
         d.y0 = d.y;
       });

       // Creates a curved (diagonal) path from parent to the child nodes
       function diagonal(s, d) {

         path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;

         return path
       }


       // Toggle children on click.
       function click(d) {
         if (d.children) {
           d._children = d.children;
           d.children = null;
         } else {
           d.children = d._children;
           d._children = null;
         }
         update(d);

       }
     };
   };




};

D3Tree.propTypes = {
  treeData: PropTypes.any
};
export default D3Tree;
