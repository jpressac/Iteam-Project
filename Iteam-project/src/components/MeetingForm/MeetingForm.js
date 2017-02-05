import React, {Component, PropTypes} from "react";
import classes from './MeetingForm.scss'
import axios from 'axios'
import {PATHS} from './../../constants/routes'
import TimePicker from 'react-toolbox/lib/time_picker'
import {connect} from 'react-redux'
import DatePicker from 'react-toolbox/lib/date_picker';
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal'
import InputComponent from '../InputComponent/InputComponent'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import {saveMeeting, meetingToMeetingConfig} from '../../redux/reducers/Meeting/MeetingReducer'
import {meetingToNewTeam} from '../../redux/reducers/Meeting/MeetingForTeamReducer'
import themeLabel from './label.scss'
import Avatar from 'react-toolbox/lib/avatar';
import avatarTheme from './avatarTheme.scss'
import {Button} from 'react-toolbox/lib/button';
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
      teamList: []
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
    console.debug('date: ' + newDate);
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

  componentDidMount() {

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
      this.setState({teamsObj: response.data});
    }.bind(this));

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
    let data = this.state.teamList;

    let filtered = data.filter(team => team["team"]["name"] === teamNameCombo);

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
    console.log(this.state.teamsObj)
    return (
      <DropdownComponent label="Select team" initialValue={this.state.teamSelectedName}
                         onValueChange={this.handleChange.bind(this, 'teamSelectedName')}
                         source={this.state.teamsObj}/>
    );
  }

  render() {
    return (

      <div className={"container " + classes.meetingForm}>
        <div className={classes.label}>
          <label value="CREATE MEETING"/>
          <Avatar theme={avatarTheme} icon="supervisor_account"/>
        </div>
        <div className={classes.form}>
          <div  className="row" >
          <InputComponent className={"col-md-12 " + classes.paddingZero} label="Topic" value={this.state.topic}
                          onValueChange={this.handleChange.bind(this, 'topic')} maxLength={60}/>
          <InputComponent  className={"col-md-12 " + classes.paddingZero}label="Description" maxLength={400}
                          onValueChange={this.handleChange.bind(this, 'description')} value={this.state.description}/>
          </div>
          <div className={"row col-md-12 " + classes.paddingZero}>
            <div className="col-md-4">
              <DatePicker label='Select date' sundayFirstDayOfWeek
                          onChange={this.dateChange} minDate={new Date()} theme={themeLabel}
                          value={this.state.programmedDate}/>
            </div>
            <div className="col-md-3">
              <TimePicker label='Start time' onChange={this.handleChangeStart.bind(this)}
                          theme={themeLabel} value={this.state.time}/>
            </div>
            <div className="col-md-3">
              <TimePicker label='End time' onChange={this.handleChangeEnd.bind(this)}
                          theme={themeLabel} value={this.state.endTime}/>
            </div>
          </div>
          <div className={"row col-md-6 " + classes.paddingZero}>
            {this.dropdownTeam()}
          </div>
          <div className={"row col-md-4 " + classes.paddingZero}>
            <Button raised onClick={this.createTeamAction.bind(this)} label="Create Team"/>
          </div>
          <div className={"row col-md-12 " + classes.paddingZero}>
            <div className="col-md-6">
              <Button secondary flat
                      onClick={this.props.home} icon='navigate_before' label="Cancel"/>
            </div>
            <div className="col-md-6">
              <Button secondary flat
                      onClick={this.configureMeeting.bind(this)} icon='navigate_next' label="Meeting Settings"/>
            </div>
          </div>
        </div>
      </div>
    );
  };
}


// <BootstrapModal ref="meetingModal" message={this.state.message}/>
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
