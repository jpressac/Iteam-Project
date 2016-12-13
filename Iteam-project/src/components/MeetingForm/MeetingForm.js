import React, {Component, PropTypes} from "react";
import classes from './MeetingForm.scss'
import axios from 'axios'
import TimePicker from 'react-toolbox/lib/time_picker'
import {push} from 'react-router-redux'
import {PATHS} from '../../constants/routes'
import {connect} from 'react-redux'
import DatePicker from 'react-toolbox/lib/date_picker';
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal'
import Input from 'react-toolbox/lib/input';
import {saveMeeting, meetingToMeetingConfig} from '../../redux/reducers/Meeting/MeetingReducer'
import {meetingToNewTeam} from '../../redux/reducers/Meeting/MeetingForTeamReducer'
import Dropdown from 'react-toolbox/lib/dropdown';
import themeLabel from './label.scss'
import themeClock from './face.scss'
import {Button, IconButton} from 'react-toolbox/lib/button';
import {TEAM, MEETING} from '../../constants/HostConfiguration'


var datetime = new Date();
const min_datetime = new Date(new Date(datetime).setDate(datetime.getDate()));
const end_min_datetime = new Date(new Date(datetime).setDate(datetime.getDate()));

const mapDispatchToProps = dispatch => ({
  saveMeetingInfo: (meeting) => dispatch(saveMeeting(meeting)),
  meetingToCreateNewTeam: () => dispatch(meetingToNewTeam()),
  goToMeetingConfig: (meeting) => dispatch(meetingToMeetingConfig(meeting))
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
      endtime: new Date(),
      teamName: '',
      teamsObj: [],
      teamSelectedName: ''
    }
  };

  handleChangeStart = (time) => {
    this.setState({time: time, endtime: time});
    this.state.programmedDate.setHours(time.getHours());
    this.state.programmedDate.setMinutes(time.getMinutes());
  };

  handleChangeEnd = (time) => {
    var beforeEndDate = this.state.programmedDate;
    var newDate = new Date(MeetingView.checkDate(this.state.time.getHours(),time.getHours(), beforeEndDate));
    console.debug('date: ' + newDate);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    this.setState({endtime: time, endDate:newDate});
  };

  static checkDate(startHour, endHour, date) {
    if ((endHour - startHour) < 0) {
      var newDay = new Date(date);
      newDay.setDate(date.getDate() + 1);
      return newDay;
    }
    return date;
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
      var rObj = {};
      rObj["value"] = index;
      rObj["label"] = option["team"]["name"];
      rObj["id"] = option["teamId"];

      return rObj;
    });

    this.setState({teamsObj: opt});
    this.setState({teamList: data});
    this.forceUpdate();
  }


  configureMeeting(goToMeetingConfig) {
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

    var filtered = data.filter(team => team["team"]["name"] === teamNameCombo);

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
      <Dropdown label="Select team" auto theme={themeLabel} style={{color: '#900C3F'}}
                onChange={this.comboTeam.bind(this)}
                source={this.state.teamsObj} value={this.state.teamValue}/>
    );
  };

  render() {
    const {goToNewMeeting} = this.props;
    return (

      <div className={"container"} style={{marginTop: 70, width: 700}}>
        <div className={classes.label2}>
          <label>CREATE MEETING</label>
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
              <div className="col-md-4">
                <div className="row">
                  <DatePicker label='Select date' sundayFirstDayOfWeek style={{marginLeft: 20}}
                              onChange={this.dateChange} minDate={new Date()} theme={themeLabel}
                              value={this.state.programmedDate}/>
                </div>
                <div className="col-md-4">
                  <div className="row" style={{color: '#900C3F'}}>
                    <TimePicker label='Start time' onChange={this.handleChangeStart.bind(this)}
                                theme={themeLabel} value={this.state.time}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row" style={{color: '#900C3F'}}>
                    <TimePicker label='End time' onChange={this.handleChangeEnd.bind(this)}
                                theme={themeLabel} value={this.state.endtime}/>
                  </div>
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
            <div className="row">
              <Button style={{margin:15,color:'white',background:'#900C3F'}} target='_blank' raised
                      onClick={this.configureMeeting.bind(this)}>
                Next
              </Button>
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
  fromMeeting: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingView)


/**
 * Created by Agustina on 10/2/2016.
 */
