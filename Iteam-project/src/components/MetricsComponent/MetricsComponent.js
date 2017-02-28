import React, {PropTypes} from 'react'
import {Chart} from 'react-google-charts/'
import classes from './MetricsComponent.scss'
import {
  getPieInformationMeetingByOwner,
  getHistogramInformationIdeasByMeeting,
  getPieInformationIdeasByTeam
} from '../../utils/actions/metricsActions'
import Spinner from '../Spinner/Spinner'

class MetricsComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pieChartMeetingByOwner: [],
      pieChartIdeasByTeam: [],
      histogramIdeasByMeeting: [],
      showSpinner: true,
      histogramOptions: {
        title: 'Ideas by Meeting',
        hAxis: {title: 'Ideas'},
        vAxis: {title: 'Meetings'},
        legend: 'none',
      },
      pieChartIdeasByTeamOptions: {
        title: 'Ideas by team',
        is3D: true,
      },
      pieChartMeetingsByOwnerOptions: {
        title: 'Meetings by owner',
        pieHole: 0.4
      }
    }
  }

  componentWillMount() {
    getPieInformationMeetingByOwner('ONE_DAY')
      .then((response) => {
        this.constructPieObject(response.data, 'pieChartMeetingByOwner')

        //FIXME: we need to use Promises.all()
        getPieInformationIdeasByTeam('ONE_YEAR')
          .then((response) => {
            this.constructPieObject(response.data, 'pieChartIdeasByTeam')

            getHistogramInformationIdeasByMeeting('ONE_YEAR')
              .then((response) => {
                this.constructPieObject(response.data, 'histogramIdeasByMeeting')
                this.setState({showSpinner: false})
              })

          })
      })
  }

  constructPieObject(data, chart) {
    let pieData = [['Meeting owners', 'Meetings']]

    data.chartModel.map((chartInfo) => {
      pieData.push([chartInfo.labelChart, chartInfo.amount])
    })

    this.setState({[chart]: pieData})
  }


  render() {

    if (!this.state.showSpinner) {
      return (
        <div className={"container " + classes.mainContainer}>
          <div className={classes.graphContainer}>
            <Chart chartType="Histogram" data={this.state.histogramIdeasByMeeting}
                   options={this.state.histogramOptions} height="550px" width="600px"/>
            <Chart chartType="PieChart" data={this.state.pieChartIdeasByTeam}
                   options={this.state.pieChartIdeasByTeamOptions} height="550px" width="600px"/>
          </div>
          <div className={classes.graphContainer}>
            <Chart chartType="PieChart" data={this.state.pieChartMeetingByOwner}
                   options={this.state.pieChartMeetingsByOwnerOptions} height="550px" width="600px"/>
          </div>
        </div>
      )
    } else {
      return (
        <Spinner />
      )
    }
  }
}

export default MetricsComponent
