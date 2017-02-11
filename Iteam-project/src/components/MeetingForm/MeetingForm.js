import React, {Component, PropTypes} from "react"
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import axios from 'axios'
import {PATHS} from './../../constants/routes'
import TimePicker from 'react-toolbox/lib/time_picker'
import {connect} from 'react-redux'
import DatePicker from 'react-toolbox/lib/date_picker'
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal'
import InputComponent from '../InputComponent/InputComponent'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import Spinner from '../Spinner/Spinner'
import {saveMeeting, meetingToMeetingConfig} from '../../redux/reducers/Meeting/MeetingReducer'
import {meetingToNewTeam} from '../../redux/reducers/Meeting/MeetingForTeamReducer'
import themeLabel from './label.scss'
import Avatar from 'react-toolbox/lib/avatar'
import avatarTheme from './avatarTheme.scss'
import {TEAM} from '../../constants/HostConfiguration'


const mapDispatchToProps = dispatch => ({
  saveMeetingInfo: (meeting) => dispatch(saveMeeting(meeting)),
  meetingToCreateNewTeam: () => dispatch(meetingToNewTeam()),
  goToMeetingConfig: (meeting) => dispatch(meetingToMeetingConfig(meeting)),
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME))
});

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      meetingInfoSave: state.meetingReducer,
      fromMeeting: state.meetingForTeamReducer
    }
  }
};

class MeetingView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      description: '',
      programmedDate: new Date(),
      endDate: new Date(),
      time: new Date(),
      endTime: new Date(),
      teamName: '',
      teamsObj: [],
      teamSelectedName: '',
      teamList: [],
      showSpinner: true
    }
  };

  handleChangeStart = (time) => {
    if (MeetingView.validateHour(time)) {
      this.setState({time: time, endTime: time});
      this.state.programmedDate.setHours(time.getHours());
      this.state.programmedDate.setMinutes(time.getMinutes());
    }
    else {
      this.setState({message: '¡You have to complete with valid time!'});
      this.refs.meetingModal.openModal();
    }
  };

  handleChangeEnd = (time) => {
    let beforeEndDate = this.state.programmedDate;
    let newDate = new Date(MeetingView.checkDate(this.state.time.getHours(), time.getHours(), beforeEndDate));
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    this.setState({endTime: time, endDate: newDate});
  };

  static checkDate(startHour, endHour, date) {
    if ((endHour - startHour) < 0) {
      let newDay = new Date(date);
      newDay.setDate(date.getDate() + 1);
      return newDay;
    }
    return date;
  }

  static validateHour(newHour) {
    return Date.now() < newHour;
  }

  dateChange = (datetime) => {
    this.state.programmedDate.setFullYear(datetime.getFullYear());
    this.state.programmedDate.setMonth(datetime.getMonth());
    this.state.programmedDate.setDate(datetime.getDate());
    this.state.programmedDate.setHours(this.state.time.getHours());
    this.state.programmedDate.setMinutes(this.state.time.getMinutes());
  };

  componentWillMount() {

    if (this.props.fromMeeting === true) {
      this.setState({
        topic: this.props.meetingInfoSave["meeting"]["topic"],
        description: this.props.meetingInfoSave["meeting"]["description"],
        programmedDate: this.props.meetingInfoSave["meeting"]["time"],
        ownerName: this.props.meetingInfoSave["meeting"]["ownerName"],
        time: this.props.meetingInfoSave["meeting"]["time"]
      })
    }

    axios.get(TEAM.TEAM_BY_OWNER
    ).then(function (response) {
      this.fillTeam(response.data)
    }.bind(this));

  }

  fillTeam(data) {
    let opt = data.map((team) => {
      return team["team"]["name"];
    });

    let teamInfo = data.map((team) => {
      let rObj = {};
      rObj["teamName"] = team["team"]["name"];
      rObj["teamId"] = team["teamId"];

      return rObj;
    });

    this.setState({teamsObj: opt, showSpinner: false, teamList: teamInfo})
  }

  configureMeeting() {
    let teamId = '';
    if (this.state.topic === '' || this.state.description === '' || this.state.teamSelectedName === '') {
      this.setState({message: '¡You have to complete the form!'});
      this.refs.meetingModal.openModal();

    } else {
      teamId = this.searchTeamIdGivenTeamName(this.state.teamSelectedName);

      let meetingInfo = {
        topic: this.state.topic,
        description: this.state.description,
        ownerName: this.props.user,
        programmedDate: this.state.programmedDate.getTime(),
        endDate: this.state.endDate.getTime(),
        teamId: teamId
      };
      this.props.goToMeetingConfig(meetingInfo);
    }
  }

  searchTeamIdGivenTeamName(teamNameCombo) {
    let filtered = this.state.teamList.filter(team => team.teamName === teamNameCombo);

    return filtered[0]["teamId"]
  }

  handleChange(key, value) {
    this.setState({[key]: value});
  }

  createTeamAction() {
    let meetingInfo = {
      topic: this.state.topic,
      description: this.state.description,
      ownerName: this.props.user,
      programmedDate: this.state.programmedDate,
      time: this.state.time
    };
    this.props.saveMeetingInfo(meetingInfo);
    this.props.meetingToCreateNewTeam();
  }

  dropdownTeam() {
    return (
      <DropdownComponent label="Select team" initialValue={this.state.teamSelectedName}
                         onValueChange={this.handleChange.bind(this, 'teamSelectedName')}
                         source={this.state.teamsObj}/>
    );
  }

  render() {

    if (!this.state.showSpinner) {
      return (
        <div className={"container " + cssClasses.containerForm}>
          <div className={cssClasses.labelMainTitle}>
            <label>CREATE MEETING</label>
            <Avatar theme={avatarTheme} icon="supervisor_account"/>
          </div>
          <BootstrapModal ref="meetingModal" message={this.state.message}/>
          <div className={"row " + cssClasses.form}>
            <div className={"row col-md-12 " + cssClasses.paddingInnerElements}>
              <InputComponent className={"col-md-12 " + cssClasses.paddingInnerElements} label="Topic"
                              value={this.state.topic}
                              onValueChange={this.handleChange.bind(this, 'topic')} maxLength={60}/>
              <InputComponent className={"col-md-12 " + cssClasses.paddingInnerElements} label="Description"
                              maxLength={400}
                              onValueChange={this.handleChange.bind(this, 'description')}
                              value={this.state.description}/>
            </div>
            <div className={"col-md-12 " + cssClasses.paddingInnerElements}>
              <div className={"col-md-4"}>
                <DatePicker label='Select date' sundayFirstDayOfWeek
                            onChange={this.dateChange} minDate={new Date()} theme={themeLabel}
                            value={this.state.programmedDate}/>
              </div>
              <div className={"col-md-4 "}>
                <TimePicker label='Start time' onChange={this.handleChangeStart.bind(this)}
                            theme={themeLabel} value={this.state.time}/>
              </div>
              <div className={"col-md-4 "}>
                <TimePicker label='End time' onChange={this.handleChangeEnd.bind(this)}
                            theme={themeLabel} value={this.state.endTime}/>
              </div>
            </div>
            <div className={"col-md-8 " + cssClasses.paddingInnerElements}>
              {this.dropdownTeam()}
            </div>
            <ButtonComponent className={"col-md-4 " + cssClasses.paddingInnerElements} raisedValue
                             onClick={this.createTeamAction.bind(this)} value="Create Team"/>

            <div className={"col-md-12 " + cssClasses.paddingInnerElements}>
              <ButtonComponent className="col-md-6" onClick={this.props.home} iconButton="navigate_before"
                               value="Cancel"/>
              <ButtonComponent className="col-md-6"
                               onClick={this.configureMeeting.bind(this)} iconButton="navigate_next"
                               value="Meeting Settings"/>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Spinner />
      )
    }
  };
}

MeetingView.propTypes = {
  meetingToCreateNewTeam: PropTypes.func,
  saveMeetingInfo: PropTypes.func,
  goToMeetingConfig: PropTypes.func,
  user: PropTypes.any,
  meetingInfoSave: PropTypes.any,
  fromMeeting: PropTypes.bool,
  home: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingView)
