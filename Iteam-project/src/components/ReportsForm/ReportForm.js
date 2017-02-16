/**
 * Created by Randanne on 15/10/2016.
 */
import React, {Component, PropTypes} from "react";
import jsPDF from "jspdf";
import {connect} from "react-redux";
import axios from "axios";
import Button from "react-toolbox/lib/button";
import {RadioGroup, RadioButton} from "react-toolbox/lib/radio";
import classes from "./ReportForm.scss";
import InputComponent from '../InputComponent/InputComponent';
import inputTheme from "./input.scss";
import radioTheme from "./radio.scss"
import tooltipTheme from "./tooltip.scss"
import buttonPdf from "./buttonPdf.scss";
import ButtonComponent from '../ButtonComponent/'
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import generateUUID from "../../constants/utils/GetUUID";
import Spinner from "../Spinner/Spinner";
import Tooltip from "react-toolbox/lib/tooltip";
import {List, ListItem, ListSubHeader} from 'react-toolbox/lib/list';
import {getMeetingsToGenerateReport} from '../../utils/actions/reportActions'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import {reportsToReportsView} from '../../redux/reducers/Reports/ReportsReducer'


const mapDispatchToProps = dispatch => ({

  goToReportsView: (reportType) => dispatch(reportsToReportsView(reportType))

});

const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId,
      meetingConfiguration: state.meetingConfigurationReducer.meeting.config

    }
  }
};

const report = new jsPDF()

var specialElementHandlers = {
  '#editor': function (element, renderer) {
    return true;
  }
};
const TooltipButton = Tooltip(Button);


class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      meetingTopic: '',
      meetingDescription: '',
      meetingIdeas: [],
      selectedReport: '',
      treeData: {},
      ranking: false,
      showSpinner: false,
      search: '',
      options: 'meetings',
      meetingReport: [],
      meetingSelected: []
    }
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };


  generatePDF = () => {
    report.fromHTML(document.getElementById('reportHTML').innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    report.save('report.pdf');
  };


  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  generateReportSearch() {
    getMeetingsToGenerateReport(this.state.search).then((response) => {
      console.log(response.data);
      this.setState({
        meetingReport: response.data
      })
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
    this.props.goToReportsView(reportType)
  }

  render() {
    if (!this.state.showSpinner) {
      return (
        <div className={"container " + cssClasses.containerForm}>
          <div className={cssClasses.labelMainTitle}>
            <label>REPORTS</label>
          </div>
          <div className={"row " + cssClasses.form}>
            <div className={classes.labelInfo}>
              <label >Basic Reports</label>
            </div>
            <div className="row col-md-12">
              <ButtonComponent   className="col-md-4" value="Ideas by ranking" raisedValue iconButton='star'
                                onClick={this.handleReport.bind(this,'byranking')} />
              <ButtonComponent className="col-md-4" value="Ideas by user" iconButton='group' raisedValue
                                onClick={this.handleReport.bind(this,'byuser')}/>
              <ButtonComponent className="col-md-4" value="Ideas by tag" raisedValue iconButton='lightbulb_outline'
                                onClick={this.handleReport.bind(this,'bytag')}/>
            </div>


              <label className={classes.labelInfo}>Advanced Reports</label>

            <div className={"row col-md-12" + cssClasses.radiogroup}>
              <label >Select the option you want to search</label>
              <RadioGroup name='options' value={this.state.options}
                          onChange={this.handleChange.bind(this, 'options')}>
                <RadioButton label='Meetings' value='meetings' theme={radioTheme}/>
                <RadioButton label='Ideas' value='ideas' theme={radioTheme}/>
              </RadioGroup>
            </div>
            <div className="row col-md-12">
              <InputComponent className="col-md-6" type='search' label='Search meetings or ideas' icon='search'
                              value={this.state.search} theme={inputTheme}
                              onValueChange={this.handleChange.bind(this, 'search')}/>
              <TooltipButton className="col-md-4" icon='search' tooltip='Search '
                             theme={tooltipTheme} onClick={this.generateReportSearch.bind(this)}
                             floating/>
            </div>
            <div className="row col-md-12">
              <List className={classes.verticalbarright} selectable ripple >
                <ListSubHeader caption='Select meeting'/>
                {this.renderMeeting()}
              </List>
              <List selectable ripple >
                <ListSubHeader caption='Meeting Selected'/>
                {this.renderMeetingSelected()}
              </List>
            </div>

          <div className="row col-md-12">
            <ButtonComponent   className="col-md-4" value="View" raisedValue icon='star'
                                />

          </div>
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

  goToReportsView: PropTypes.func,
  meetingId: PropTypes.string,
  meetingConfiguration: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
