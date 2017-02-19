import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Button from 'react-toolbox/lib/button'
import classes from './ReportForm.scss'
import InputComponent from '../InputComponent/InputComponent'
import tooltipTheme from './tooltip.scss'
import generateUUID from '../../constants/utils/GetUUID'
import Spinner from '../Spinner/Spinner'
import Tooltip from 'react-toolbox/lib/tooltip'
import {List, ListItem, ListSubHeader} from 'react-toolbox/lib/list'
import {getMeetingsToGenerateReport} from '../../utils/actions/reportActions'
import ButtonComponent from '../ButtonComponent/'
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import {reportsToReportsView} from '../../redux/reducers/Report/ReportsReducer'
import {saveMixMeeting} from '../../redux/reducers/Report/ReportByMeetingReducer'
import BootstrapModal from '../BootstrapModal/BootstrapModal'
import {cleanMeetingChats} from '../../redux/reducers/Meeting/MeetingChatMessagesReducer'

const mapDispatchToProps = dispatch => ({
  saveMeetingConfigInformation: (reportType) => dispatch(reportsToReportsView(reportType)),
  saveMeetingIdsForReports: (meetingIds) => dispatch(saveMixMeeting(meetingIds)),
  finishChat: () => dispatch(cleanMeetingChats())
});

const TooltipButton = Tooltip(Button);

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      treeData: {},
      showSpinner: false,
      search: '',
      meetingReport: [],
      meetingSelected: [],
      reportName: '',
      messageModal: ''
    }
  }

  componentDidMount() {
    this.props.finishChat();
  }

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  generateReportSearch() {
    getMeetingsToGenerateReport(this.state.search)
      .then((response) => {
        this.setState({
          meetingReport: response.data.model
        })
      })
      .catch((response) => {
        console.log(response)
        //TODO: catch exceptions here
      })
  }

  renderMeeting() {
    return this.state.meetingReport.map((meeting) => {
      return (
        <ListItem key={generateUUID()}
                  caption={meeting.topic}
                  legend={meeting.description}
                  onClick={this.selectMeeting.bind(this, meeting.meetingId)}/>
      )
    })
  }

  selectMeeting(meetingId) {
    let meetingSelected = this.state.meetingSelected;

    let meetingToAdd = this.state.meetingReport.filter((meeting) => meeting.meetingId === meetingId)[0];

    if (meetingSelected.filter((meeting) => meeting.meetingId === meetingToAdd.meetingId).length != 1) {
      meetingSelected.push(meetingToAdd)
    }

    this.setState({
      meetingReport: this.state.meetingReport.filter((meeting) => meeting.meetingId !== meetingId),
      meetingSelected: meetingSelected
    })
  }

  renderMeetingSelected() {
    return this.state.meetingSelected.map((meeting) => {
      return (
        <ListItem key={generateUUID()}
                  caption={meeting.topic}
                  legend={meeting.description}
                  onClick={this.removeMeeting.bind(this, meeting.meetingId)}/>
      )
    })
  }

  removeMeeting(meetingId) {
    let removedMeeting = this.state.meetingReport;

    let meetingToRemove = this.state.meetingSelected.filter((meeting) => meeting.meetingId === meetingId)[0];

    if (removedMeeting.filter((meeting) => meetingToRemove.meetingId === meeting.meetingId).length != 1) {
      removedMeeting.push(meetingToRemove)
    }

    this.setState({
      meetingReport: removedMeeting,
      meetingSelected: this.state.meetingSelected.filter((meeting) => meeting.meetingId !== meetingId)
    })
  }

  handleReport(reportType) {
    this.props.saveMeetingConfigInformation(reportType)
  }

  reportByMixing() {

    if (this.state.meetingSelected.length > 0 || this.state.reportName != '') {

      let meetingIds = this.state.meetingSelected.map((meeting) => meeting.meetingId)

      this.props.saveMeetingIdsForReports({'meetingIds': meetingIds, 'reportName': this.state.reportName})
      this.props.saveMeetingConfigInformation('bymixingmeeting')
    } else {
      this.setState({messageModal: '!Please fill the reportName field and select at least one meeting¡'})
      this.refs.formModal.openModal()
    }
  }

  render() {
    if (!this.state.showSpinner) {
      return (
        <div className={"container " + cssClasses.containerForm}>
          <BootstrapModal ref="formModal" message={this.state.messageModal}/>
          <div className={cssClasses.labelMainTitle}>
            <label>REPORTS</label>
          </div>
          <div className={"row " + cssClasses.form}>
            <div className={cssClasses.labelInfo}>
              <label>Basic Reports</label>
            </div>
            <div className={"row col-md-12 " + classes.buttonMargin}>
              <ButtonComponent className="col-md-4" value="Ideas by ranking" raisedValue iconButton='star'
                               onClick={this.handleReport.bind(this, 'byranking')}/>
              <ButtonComponent className="col-md-4" value="Ideas by user" iconButton='group' raisedValue
                               onClick={this.handleReport.bind(this, 'byuser')}/>
              <ButtonComponent className="col-md-4" value="Ideas by tag" raisedValue iconButton='lightbulb_outline'
                               onClick={this.handleReport.bind(this, 'bytag')}/>
            </div>
            <div className="row col-md-12">
              <label className={cssClasses.labelInfo}>Advanced Reports</label>
              <InputComponent className="col-md-12" label='Report name' value={this.state.reportName}
                              onValueChange={this.handleChange.bind(this, 'reportName')}/>
              <InputComponent className="col-md-8" type='search' label='Search meetings or ideas' icon='search'
                              value={this.state.search}
                              onValueChange={this.handleChange.bind(this, 'search')}/>
              <TooltipButton className="col-md-4" icon='search' tooltip='Search '
                             theme={tooltipTheme} onClick={this.generateReportSearch.bind(this)}
                             floating/>
            </div>
            <div className="col-md-6">
              <List className={classes.verticalbarright} selectable ripple>
                <ListSubHeader caption='Select meeting'/>
                {this.renderMeeting()}
              </List>
            </div>
            <div className="col-md-6">
              <List className={classes.verticalbarright} selectable ripple>
                <ListSubHeader caption='Meeting Selected'/>
                {this.renderMeetingSelected()}
              </List>
            </div>
            <ButtonComponent className="col-md-12" value="View" raisedValue icon='star'
                             onClick={this.reportByMixing.bind(this)}/>
          </div>
        </div>
      );
    } else {
      return (
        <Spinner/>
      )
    }
  };
}

ReportForm.propTypes = {
  saveMeetingConfigInformation: PropTypes.func,
  meetingId: PropTypes.string,
  meetingConfiguration: PropTypes.any,
  goToReportsPage: PropTypes.func,
  saveMeetingIdsForReports: PropTypes.func,
  finishChat: PropTypes.any
};

export default connect(null, mapDispatchToProps)(ReportForm);
