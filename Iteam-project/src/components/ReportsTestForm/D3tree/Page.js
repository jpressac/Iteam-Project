import React from'react'
import  D3Tree from './D3Tree'

var treeData =
{
  "name": "re",
  "children": [
    {
      "name": "juan",
      "children": [
        {
          "name": "vale",
          "children": [
            {
              "name": "comentario"
            }
          ]
        },
        {
          "name": "agus",
          "children": [
            {
              "name": "comentario"
            }
          ]
        }
      ]
    },
    {
      "name": "vale",
      "children": [
        {
          "name": "No title",
          "children": [
            {
              "name": "comentario"
            }
          ]
        },
        {
          "name": "juan",
          "children": [
            {
              "name": "comentario"
            }
          ]
        }
      ]
    },
    {
      "name": "agus",
      "children": [
        {
          "name": "belu",
          "children": [
            {
              "name": "comentario"
            }
          ]
        }
      ]
    }
  ]
}


class Page extends React.Component {

  render() {

    return (
      <div>
        <D3Tree treeData={treeData}/>
      </div>
    );

  }

}

export default Page;
