import React from'react'
import  D3ChartTree from './D3ChartTree'

var treeData =
{

  "name": "First Meeting",
  "children": [{
    "name": "Rock",
    "children": [{
      "name": "Jesus Of Suburbia", "value" :5, "color": "#D6BA33"
    }, {
      "name": "American Idiot", "value" :3, "color": "#D6BA33"
    }, {
      "name": "Boulevard Of Broken Dreams", "value" :4, "color": "#D6BA33"
    }]
  }, {
    "name": "Pop",
    "children": [{
      "name": "Clocks", "value" :3.5, "color": "#D6BA33"
    }, {
      "name": "The Scientist", "value" :4, "color": "#D6BA33"
    }, {
      "name": "Vive la vida", "value" :2, "color": "#D6BA33"
    }, {
      "name": "I'm blue", "value" :4.5, "color": "#D6BA33"
    }, {
      "name": "The afternoon", "value" :2.5, "color": "#D6BA33"
    }, {
      "name": "Baby now", "value" :5, "color": "#D6BA33"
    }]
  }]


};


class Page extends React.Component {

  render() {

    return (
      <div>
        <D3ChartTree treeData={treeData}/>
      </div>
    );

  }

}

export default Page;
