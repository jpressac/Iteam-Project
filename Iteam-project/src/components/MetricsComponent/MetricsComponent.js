import React, {PropTypes} from 'react'
import {Chart} from 'react-google-charts/'
import classes from './MetricsComponent.scss'
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import avatarTheme from './avatarTheme.scss'
import Avatar from 'react-toolbox/lib/avatar'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import GraphComponent from '../GraphComponent/GraphComponent'

//FIXME: this should be in constant utils file
const ONE_DAY = 'ONE_DAY'
const ONE_WEEK = 'ONE_WEEK'
const ONE_MONTH = 'ONE_MONTH'
const ONE_YEAR = 'ONE_YEAR'

const MEETING_BY_OWNER = 'MEETING_BY_OWNER'
const IDEAS_BY_TEAM = 'IDEAS_BY_TEAM'
const IDEAS_BY_MEETING = 'IDEAS_BY_MEETING'
const SCORE_BY_USER = 'SCORE_BY_USER'

const timeframeList = [ONE_DAY, ONE_WEEK, ONE_MONTH, ONE_YEAR]

class MetricsComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      histogramOptions: {
        hAxis: {title: 'Ideas'},
        vAxis: {title: 'Meetings'},
        legend: 'none'
      },
      pieChartIdeasByTeamOptions: {
        is3D: true
      },
      pieChartMeetingsByOwnerOptions: {
        pieHole: 0.4
      },
      columnChartScoreUsersOptions: {
        hAxis: {title: 'Users'},
        vAxis: {title: 'Score'},
        legend: {position: 'none'}
      },
      timeframe: ONE_DAY
    }
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  render() {
    return (
      <div className={"container " + classes.mainContainer}>
        <div className={cssClasses.labelMainTitle}>
          <label>METRICS DASHBOARD</label>
          <Avatar theme={avatarTheme} icon="insert_chart"/>
        </div>
        <div>
          <DropdownComponent initialValue={ONE_DAY} label='Dashboard timeframe' source={timeframeList}
                             onValueChange={this.handleChange.bind(this, 'timeframe')}/>
          <div className={classes.dashboardContainer}>
            <GraphComponent title='IDEAS BY MEETING' chartType='Histogram' timeframe={this.state.timeframe}
                            options={this.state.histogramOptions}
                            type={IDEAS_BY_MEETING}/>
            <GraphComponent title='USERS SCORE' chartType='ColumnChart'
                            options={this.state.columnChartScoreUsersOptions}
                            type={SCORE_BY_USER}/>
          </div>
          <div className={classes.dashboardContainer}>
            <GraphComponent title='IDEAS BY TEAM' chartType='PieChart' timeframe={this.state.timeframe}
                            options={this.state.pieChartIdeasByTeamOptions}
                            type={IDEAS_BY_TEAM}/>
            <GraphComponent title='MEETING BY OWNER' chartType='PieChart' timeframe={this.state.timeframe}
                            options={this.state.pieChartMeetingsByOwnerOptions}
                            type={MEETING_BY_OWNER}/>
          </div>
        </div>
      </div>
    )
  }
}

export default MetricsComponent
