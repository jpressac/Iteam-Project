var React = require('react');
 var d3 = require('d3');
var ReactDom = require('react-dom');

var D3Tree = React.createClass({

  componentDidMount: function(){
    var mountNode =  ReactDom.findDOMNode(this);

    // Render the tree usng d3 after first component mount
    renderTree(this.props.treeData, mountNode);
  },

  shouldComponentUpdate: function(nextProps, nextState){
    // Delegate rendering the tree to a d3 function on prop change
    renderTree(this.props.treeData, ReactDom.findDOMNode(this));

    // Do not allow react to render the component on prop change
    return false;
  },

  render: function() {

    // Render a blank svg node
    return (
      <svg></svg>
    );
  }

});


var renderTree = function(treeData, svgDomNode) {
  var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(40,0)");

  var tree = d3.tree()
    .size([height, width - 160]);



    var root = d3.hierarchy(treeData)
      .sort(function(a, b) {console.log('agus'); return (a.height - b.height) || a.id.localeCompare(b.id); });

    var link = g.selectAll(".link")
      .data(tree(root).descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {console.log(d);
        return "M" + d.y + "," + d.x
          + "C" + (d.y + d.parent.y) / 2 + "," + d.x
          + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
          + " " + d.parent.y + "," + d.parent.x;
      });

    var node = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

    node.append("circle")
      .attr("r", 2.5);

    node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });


};
module.exports = D3Tree;
