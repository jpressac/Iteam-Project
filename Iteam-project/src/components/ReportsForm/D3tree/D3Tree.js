import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3'
import ReactDom from 'react-dom'
import classes from './D3Tree.scss'

var root, treemap, svg, i, duration, path;

class D3Tree extends React.Component {

  componentWillReceiveProps(nextProps) {

    if (nextProps.treeData != this.props.treeData
      || nextProps.technic != this.props.technic || nextProps.type != this.props.type) {
      console.log("pase por aca la concha de tu hermana")
      //this.renderTreeCollapse(nextProps.treeData, ReactDom.findDOMNode(this));
      this.renderTreeExpand(nextProps.treeData, ReactDom.findDOMNode(this),
        this.props.technic, this.props.type);
    }
  };


  renderTreeExpand(treeData, svgNode, technic, type) {
    console.log("technic " + technic);
    console.log("type " + type);
    var margin = {top: 20, right: 90, bottom: 10, left: 120},
      width, height;
    if (technic == 'Brainstorming') {
      width = window.innerWidth - margin.right + 200 //TODO: this is hardcoded so it antoher screen it will not work
      height = window.innerHeight + 400;
      if (type == 'bytag') {
        height = height - 400;
      }

    }
    else {
      width = window.innerWidth - margin.right + 100//TODO: this is hardcoded so it antoher screen it will not work
      height = window.innerHeight + 1500;
      if (type == 'bytag') {
        height = height - 700;
      }

    }

    i = 0;
    duration = 750;

    // declares a tree layout and assigns the size
    treemap = d3.tree()
      .size([width + 100, height])
      .nodeSize([30, 20]);


    // remove the last SVG Node, just to create a new one
    d3.select(svgNode)
      .selectAll("*")
      .remove();


    svg = d3.select(svgNode)
      .attr("width", width - 300)
      .attr("height", height + 300)
      .attr("align", "center")
      .append("g")
      .attr("transform", "translate("
        + margin.left + "," + height * 0.6 + ")");


    root = d3.hierarchy(treeData, function (d) {
      return d.children;
    });
    root.x0 = height + 300;
    root.y0 = 0;

// Collapse after the second level
    root.children.forEach(expandAll);

    update(root);

// Collapse the node and all it's children

    function expand(d) {
      var children = (d.children) ? d.children : d._children;
      if (d._children) {
        d.children = d._children;
        d._children = null;
      }
      if (children)
        children.forEach(expand);
    }

    function expandAll() {
      expand(root);
      update(root);
    }


    function update(source) {

      // Assigns the x and y position for the nodes
      let treeData = treemap(root);

      // Compute the new tree layout.
      let nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach(function (d) {
        d.y = d.depth * 180;

      });
      // add the tool tip
      var div = d3.select("body").append("div")
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', '#FFFEAB')
        .style('opacity', 0);


      // ****************** Nodes section ***************************

      // Update the nodes...
      let node = svg.selectAll('g.' + classes.node)
        .data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

      // Enter any new nodes at the parent's previous position.
      let nodeEnter = node.enter().append('g')
        .classed(classes.node, true)
        .attr("transform", function (d) {
          return "translate(" + d.y + "," + source.x0 + ")";
        })
        .on('click', click);
      // .on("mouseover", function (d) {
      //   div.transition()
      //     .style("opacity", .9);
      //
      //   div.html(d.data.name)
      //     .style("display", "inline-block")
      //     .style("left", (d3.event.pageX - 35 ) + "px")
      //     .style("top", (d3.event.pageY - 30) + "px");
      //
      //
      // })
      // .on("mouseout", function (d) {
      //   div.style("display", "none");
      // });

      // Add Circle for the nodes
      nodeEnter.append('circle')
        .classed(classes.node, true)
        .attr('r', 1e-6)
        .style("fill", function (d) {
          let color;
          if (d.depth === 1) {
            color = "#999"
          }
          if (d.depth === 2) {
            color = "#777"
          }
          if (d.depth === 3) {
            color = "#eee"
          }

          return d._children ? "lightsteelblue" : color;
        });


      // Add labels for the nodes
      nodeEnter.append('text')

        .attr("dy", ".35em")
        .attr("x", function (d) {
          return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
          if (d.depth == 0) {
            nodeEnter
              .style("font-size", "x-large")
          }
          return d.data.name;
        })
        .call(wrap, 260);


      // UPDATE
      let nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Update the node attributes and style
      nodeUpdate.select('circle.' + classes.node)
        .attr('r', 5)
        .style("fill", function (d) {
          let color;
          if (d.depth === 1) {
            color = "red"
          }
          if (d.depth === 2) {
            color = "green"
          }
          if (d.depth === 3) {
            color = "blue"
          }
          ;
          return d._children ? "lightsteelblue" : color;
        })
        .attr('cursor', 'pointer');


      // Remove any exiting nodes
      let nodeExit = node.exit().transition()
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
      let link = svg.selectAll('path.' + classes.link)
        .data(links, function (d) {
          return d.id;
        });

      // Enter any new links at the parent's previous position.
      let linkEnter = link.enter().insert('path', "g")
        .classed(classes.link, true)
        .attr('d', function (d) {
          let o = {x: source.x0, y: source.y0};
          return diagonal(o, o)
        });

      // UPDATE
      let linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(duration)
        .attr('d', function (d) {
          return diagonal(d, d.parent)
        });

      // Remove any exiting links
      let linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', function (d) {
          let o = {x: source.x, y: source.y};
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

        path = `M ${s.y} ${s.x }
            C ${(s.y + d.y) / 2} ${s.x },
              ${(s.y + d.y) / 2} ${d.x },
              ${d.y} ${d.x }`;

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

      function wrap(text, width) {
        text.each(function () {
          var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr('x'),
            y = text.attr('y'),
            dy = 0, //parseFloat(text.attr('dy')),
            tspan = text.text(null)
              .append('tspan')
              .attr('x', x)
              .attr('y', y)
              .attr('dy', dy);
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              tspan = text.append('tspan')
                .attr('x', x)
                .attr('y', y)
                .attr('dy', lineHeight + dy + 'em')
                .text(word);
            }
          }
        });
      }
    }
  };

  render() {
    // Render a blank svg node
    return (
      <svg/>
    );
  };
}


D3Tree.propTypes = {
  treeData: PropTypes.any,
  technic: PropTypes.string,
  type: PropTypes.string
};
export default D3Tree;
