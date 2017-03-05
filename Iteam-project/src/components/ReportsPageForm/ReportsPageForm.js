import React, {Component, PropTypes} from 'react'
import classes from './ReportsPageForm.scss'
import {connect} from 'react-redux'
import D3Tree from '../ReportsForm/D3tree/D3Tree'
import D3ChartTree from '../ReportsForm/D3ChartTree/D3ChartTree'
import {PATHS} from './../../constants/routes'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import buttonTheme from './button.scss'
import BootstrapModal from '../BootstrapModal/BootstrapModal'
import {push} from 'react-router-redux'
import {
  getReportByTag,
  getReportByRanking,
  getReportByUser,
  getReportByMixMeetings,
  generateSharedReport,
  postReportIntoSlack
} from '../../utils/actions/reportActions'

const mapStateToProps = (state) => {
  return {
    user: state.loginUser.user.username,
    meetingConfiguration: state.reportConfigurationReducer,
    reportType: state.reportReducer,
    byMeeting: state.mixMeetingReducer
  }
};

const mapDispatchToProps = dispatch => ({
  report: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))
});

class ReportsPageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: {},
      showSpinner: false,
      message: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.reportType != nextProps.reportType
      || Object.keys(this.state.treeData).length != Object.keys(nextState.treeData).length ||
      this.state.ranking != nextState.ranking || this.state.message != nextState.message
  }

  generateReport(reportType) {
    switch (reportType) {
      case 'byranking':
        this.generateRankingReport()
        break
      case 'byuser':
        this.generateUserReport()
        break
      case 'bytag':
        this.generateTagReport()
        break
      case 'bymixingmeeting':
        this.generateMixingMeetings()
    }
  }

  generateMixingMeetings() {
    getReportByMixMeetings(this.props.byMeeting.meetingIds.toString(), this.props.byMeeting.reportName)
      .then((response) => {
        this.setState({treeData: response.data})
      })
  }

  generateUserReport() {
    getReportByUser(this.props.meetingConfiguration.meetingId, this.props.meetingConfiguration.meetingConfig.tags.toString())
      .then(function (response) {
        this.setState({treeData: response.data});
      }.bind(this))
      .catch(() => {
        //TODO: what we do here????
      })

    this.postSharedBasicReport('Report By User')
  }

  generateTagReport() {
    getReportByTag(this.props.meetingConfiguration.meetingId, this.props.meetingConfiguration.meetingConfig.tags.toString().toLowerCase())
      .then(function (response) {
        this.setState({treeData: response.data})
      }.bind(this)).catch(function (response) {
      //TODO: what we do here????
    })

    this.postSharedBasicReport('Report By Tag')

  };

  generateRankingReport() {
    getReportByRanking(this.props.meetingConfiguration.meetingId, this.props.meetingConfiguration.meetingConfig.tags.toString().toLowerCase())
      .then(function (response) {
        this.setState({treeData: response.data})
      }.bind(this)).catch(function (response) {
      //TODO: what we do here???? WTF
    })

    this.postSharedBasicReport('Report By Ranking')
  };

  postSharedBasicReport(reportName){
    postReportIntoSlack(this.props.meetingConfiguration.meetingId, this.props.meetingConfiguration.topic, reportName)
      .catch((response) => {
        //TODO: we don't need the 'then' promise we need to do something here
      })
  }

  renderTrees() {
    if (this.props.reportType == 'byranking') {
      console.log(this.state.treeData)
      return (
        <D3ChartTree treeData={this.state.treeData}/>
      )
    } else {
      return (
        <D3Tree treeData={this.state.treeData} technic={this.props.meetingConfiguration.meetingConfig.technic}
                type={this.props.reportType}/>
      )
    }
  }

  shareReport() {
    generateSharedReport(this.props.reportType == 'bymixingmeeting' ?
      this.props.byMeeting.meetingIds.toString() : this.props.meetingConfiguration.meetingId)
      .then(function (response) {
        console.log(response.data)
        this.setState({message: "URL for shared report: \n " + response.data.toString()})
        this.refs.reportModal.openModal()
      }.bind(this))
      .catch((response) => {
        //TODO: what we do here ???
      })
  }

  render() {
    return (
      <div className={"container " + classes.containerReport}>
        <BootstrapModal ref='reportModal' message={this.state.message}/>
        <label
          className={classes.title}> {
          this.props.reportType == 'byuser' ?
            'Report By User' : this.props.reportType == 'byranking' ?
              'Report by Ranking' : this.props.reportType == 'bytag' ? 'Report by Tag' : 'Report By Mix Meetings'
        }
        </label>
        {this.generateReport(this.props.reportType)}
        {this.renderTrees()}
        <ButtonComponent className="col-md-6" value='BACK TO REPORT' raisedValue
                         onClick={this.props.report} iconButton='backspace' theme={buttonTheme}/>
        <ButtonComponent className="col-md-6" value='SHARE REPORT' theme={buttonTheme}
                         onClick={this.shareReport.bind(this)} raisedValue iconButton='share'/>
      </div>
    );
  };
}

ReportsPageForm.propTypes = {
  reportType: PropTypes.string,
  user: PropTypes.any,
  byMeeting: PropTypes.any,
  meetingConfiguration: PropTypes.any,
  report: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsPageForm)
