import React, {PropTypes} from 'react'
import {Chart} from 'react-google-charts/'
import {getPieInformationMeetingByOwner} from '../../utils/actions/metricsActions'

class MetricsComponent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      pieData: []
    }

  }

  componentWillMount(){
    getPieInformationMeetingByOwner('ONE_DAY')
      .then( (response) => {
        this.constructPieObject(response.data)
      })
  }

  constructPieObject(data){
    let pieData = [['Meeting owners', 'Meetings']]

    data.chartModel.map( (chartInfo) => {pieData.push([chartInfo.labelChart, chartInfo.amount])})

    console.log(data)

    this.setState({pieData: pieData})
  }



  render(){
    return(
      <Chart chartType="PieChart" data={this.state.pieData}/>
    )
  }

}

export default MetricsComponent
