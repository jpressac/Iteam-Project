import React, {PropTypes} from 'react'
import {Chart} from 'react-google-charts/'
import {
  getPieInformationMeetingByOwner,
  getHistogramInformationIdeasByMeeting,
  getPieInformationIdeasByTeam,
  getBestUsers
} from '../../utils/actions/metricsActions'
import Spinner from '../Spinner/Spinner'
import classes from './GraphComponent'

const ONE_DAY = 'ONE_DAY'
const ONE_WEEK = 'ONE_WEEK'
const ONE_MONTH = 'ONE_MONTH'
const ONE_YEAR = 'ONE_YEAR'

const MEETING_BY_OWNER = 'MEETING_BY_OWNER'
const IDEAS_BY_TEAM = 'IDEAS_BY_TEAM'
const IDEAS_BY_MEETING = 'IDEAS_BY_MEETING'
const SCORE_BY_USER = 'SCORE_BY_USER'

class GraphComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      showSpinner: true,
      chartType: 'PieChart'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.timeframe != nextProps.timeframe) {
      this.setState({showSpinner: true})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.timeframe != nextProps.timeframe
      || this.state.showSpinner != nextState.showSpinner
      || this.state.data.length != nextState.data.length
  }

  getDataGivenAType(type, timeframe) {
    switch (type) {

      case MEETING_BY_OWNER:
        getPieInformationMeetingByOwner(timeframe)
          .then((response) => {
            this.constructChartObject(response.data, 'data')
          })
        break

      case IDEAS_BY_TEAM:
        getPieInformationIdeasByTeam(timeframe)
          .then((response) => {
            this.constructChartObject(response.data, 'data')
          })
        break

      case IDEAS_BY_MEETING:
        getHistogramInformationIdeasByMeeting(timeframe)
          .then((response) => {
            this.constructChartObject(response.data, 'data')
          })
        break

      case SCORE_BY_USER:
        getBestUsers()
          .then( (response) => {
            this.constructChartObject(response.data, 'data')
          })
    }
  }

  constructChartObject(data, chart) {
    let chartData = [['Meeting owners', 'Meetings']]

    data.chartModel.map((chartInfo) => {
      chartData.push([chartInfo.labelChart, chartInfo.amount])
    })

    console.log(chartData)

    this.setState({[chart]: chartData, showSpinner: false})
  }

  render() {
    this.getDataGivenAType(this.props.type, this.props.timeframe)

    if (!this.state.showSpinner) {
      return (
        <div className={classes.graphContainer}>
          <label>{this.props.title}</label>
          <Chart chartType={this.props.chartType} data={this.state.data}
                 options={this.props.options} height="550px" width="600px"/>
        </div>
      )
    } else {
      return (
        <div className="col-md-6">
          <Spinner />
        </div>
      )
    }
  }
}

GraphComponent.propTypes = {
  type: PropTypes.any,
  options: PropTypes.any,
  timeframe: PropTypes.any,
  chartType: PropTypes.any,
  title: PropTypes.string
}

export default GraphComponent
