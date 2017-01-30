import React, {Component, PropTypes} from "react";
import classes from './MeetingForm.scss'
import axios from 'axios'
import TimePicker from 'react-toolbox/lib/time_picker'
import {connect} from 'react-redux'
import DatePicker from 'react-toolbox/lib/date_picker';
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal'
import Input from 'react-toolbox/lib/input';
import {saveMeeting, meetingToMeetingConfig} from '../../redux/reducers/Meeting/MeetingReducer'
import {meetingToNewTeam} from '../../redux/reducers/Meeting/MeetingForTeamReducer'
import Dropdown from 'react-toolbox/lib/dropdown';
import themeLabel from './label.scss'
import themeDropdown from './dropdown.scss'
import Avatar from 'react-toolbox/lib/avatar';
import {Button, IconButton} from 'react-toolbox/lib/button';
import {TEAM, MEETING} from '../../constants/HostConfiguration'
import {PATHS} from '../../constants/routes'


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
      teamList:[]
    }
  };

  handleChangeStart = (time) => {
    if(MeetingView.validateHour(time)){
      this.setState({time: time, endTime: time});
      this.state.programmedDate.setHours(time.getHours());
      this.state.programmedDate.setMinutes(time.getMinutes());
    }
    else{
      this.setState({message: '¡You have to complete with valid time!'});
      this.refs.meetingModal.openModal();
    }
  };

  handleChangeEnd = (time) => {
    let beforeEndDate = this.state.programmedDate;
    let newDate = new Date(MeetingView.checkDate(this.state.time.getHours(),time.getHours(), beforeEndDate));
    console.debug('date: ' + newDate);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    this.setState({endTime: time, endDate:newDate});
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
      this.fillTeam(response.data);
    }.bind(this));

  }

  fillTeam(data) {
    let opt = data.map(function (option, index) {
      let rObj = {};
      rObj["value"] = index;
      rObj["label"] = option["team"]["name"];
      rObj["id"] = option["teamId"];

      return rObj;
    });

    this.setState({teamsObj: opt, teamList: data});
    this.forceUpdate();
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


  handleChangeTopic = (topic, value) => {
    this.setState({...this.state, [topic]: value});
  };

  searchTeamIdGivenTeamName(teamNameCombo) {
    let data = this.state.teamList;

    let filtered = data.filter(team => team["team"]["name"] === teamNameCombo);

    return filtered[0]["teamId"]
  }

  comboTeam(value) {
    let filteredLabelObject = this.state.teamsObj.filter(filter => filter["value"] == value);
    this.setState({teamValue: value, teamSelectedName: filteredLabelObject[0]["label"]})
  }

  handleChangeDescription = (description, value) => {
    this.setState({...this.state, [description]: value});
  };

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
      <Dropdown label="Select team" auto theme={themeDropdown} style={{color: '#900C3F'}}
                onChange={this.comboTeam.bind(this)}
                source={this.state.teamsObj} value={this.state.teamValue}/>
    );
  };

  render() {
    return (

      <div className={"container"} style={{marginTop: '7%', width:'50%'}}>
        <div className={classes.label2}>
          <label style={{ padding:'3%'}}>CREATE MEETING</label>
          <Avatar style={{backgroundColor: '#900C3F'}} icon="supervisor_account" />
        </div>
        <BootstrapModal ref="meetingModal" message={this.state.message}/>
        <div className={classes.form}>
          <div className={"form-horizontal"}>
            <div className="form-group">
              <div className="col-md-8">
                <div className="row">
                  <Input type='text' label='Topic' theme={themeLabel} name='topic' value={this.state.topic}
                         onChange={this.handleChangeTopic.bind(this, 'topic')} maxLength={150}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-8">
                <div className="row">
                  <Input type='text' multiline label='Description' name='description' maxLength={400}
                         value={this.state.description} theme={themeLabel}
                         onChange={this.handleChangeDescription.bind(this, 'description')}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
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
              </div>

            <div className="form-group">
              <div className="col-md-4">
                <div className="row">
                  {this.dropdownTeam()}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 ">
                  <Button style={{marginLeft: 7, marginTop: 20, color:'white',background:'#900C3F'}}
                          target='_blank' raised onClick={this.createTeamAction.bind(this)}>

                    Create Team
                  </Button>
                </div>
              </div>
            </div>
            <div className="form-group">
               <div className="row">
                 <div className="col-md-6">
                   <Button style={{margin:5,color:'#900C3F'}} secondary flat
                           onClick={this.props.home} icon='navigate_before'>
                     Cancel
                   </Button>
                </div>
              <div className="col-md-6">
                <Button style={{margin:5,color:'#900C3F'}}  secondary flat
                        onClick={this.configureMeeting.bind(this)} icon='navigate_next'>
                  Meeting Settings
                </Button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
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


/**
 * Created by Agustina on 10/2/2016.
 */
