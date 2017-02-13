import React, {PropTypes, Component} from 'react'
import D3Tree from '../../components/ReportsForm/D3tree/D3Tree'
import {getSharedReport} from '../../utils/actions/reportActions'

class SharedReportView extends React.Component {

  componentWillMount(){
    let token = window.location.search.split('?')[1]
    console.log(token)
    getSharedReport(token)
      .then( (response) => {
        console.log(response)
      } )
  }

  render(){
    return (
      <D3Tree/>
    )
  }
}

export default SharedReportView
