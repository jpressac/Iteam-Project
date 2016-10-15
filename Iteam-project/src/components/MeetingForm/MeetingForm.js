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
import Dropdown from 'react-toolbox/lib/dropdown';
import {saveMeeting} from '../../redux/reducers/Meeting/MeetingReducer'

var datetime = new Date();
const min_datetime = new Date(new Date(datetime).setDate(datetime.getDate()));


const mapDispatchToProps = dispatch => ({

  saveMeetingInfo: (meeting) => dispatch(saveMeeting(meeting)),

  goToNewMeeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME))
});

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};

class MeetingView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      description:'',
      programmedDate: new Date(),
      time: new Date(),
      teamName: '',
      teamsObj: []
    }
  };

  handleChange = (time) => {
    this.setState({time: time});
    this.state.programmedDate.setHours(time.getHours());
    this.state.programmedDate.setMinutes(time.getMinutes());
  };

  dateChange = (datetime) => {
    this.state.programmedDate.setFullYear(datetime.getFullYear());
    this.state.programmedDate.setMonth(datetime.getMonth());
    this.state.programmedDate.setDate(datetime.getDate());
    this.state.programmedDate.setHours(this.state.time.getHours());
    this.state.programmedDate.setMinutes(this.state.time.getMinutes());
  };

  componentDidMount() {

    axios.get('http://localhost:8080/team/byowner'
    ).then(function (response) {
      this.fillTeam(response.data);
    }.bind(this));

  }

  fillTeam(data) {

    let opt = [];
    if (data !== null) {
      data.map(function (obj, index) {
        let teamName = obj["team"]["name"];
        opt.push(
          <option key={index} value={teamName}>{teamName}</option>
        );
      }.bind(this));
      this.setState({teamsObj: opt});
      this.forceUpdate();
    }
  }

  teamChanged(event) {
    let actualTeam = event.target.value;
    this.setState({value: actualTeam});

  }

  createMeeting(goToNewMeeting) {
    let e = document.getElementById("inputTeam");
    let teamName = e.options[e.selectedIndex].text;
    axios.post('http://localhost:8080/meeting/create', {
      topic: this.state.topic,
      ownerName: this.props.user,
      programmedDate: this.state.programmedDate.getTime(),
      teamName: teamName,
      description: this.state.description

    }).then(function (response) {
      this.setState({message: '¡Your meeting was successfully created!'});
      this.refs.meetingModal.openModal();
      goToNewMeeting()
    }.bind(this)).catch(function (response) {

    });
  }

  handleChangeTopic = (topic, value) => {
    this.setState({...this.state, [topic]: value});
  };
  handleChangeDescription = (description, value) => {
    this.setState({...this.state, [description]: value});
  };

  createTeamAction(){
    let e = document.getElementById("inputTeam");
    let teamNameCombo = e.options[e.selectedIndex].text;

    let meetingInfo = {
      topic: this.state.topic,
      description: this.state.description,
      ownerName: this.props.user,
      programmedDate: this.state.programmedDate.getTime(),
      teamName: teamNameCombo
    };

    this.setState({teamName: teamNameCombo});
    this.props.saveMeetingInfo(meetingInfo);
  }

  render() {
    let teamMap = this.state.teamsObj;
    let arrayTeam = [];
    const {goToNewMeeting} = this.props;
    return (

      <div className={"container"}>
        <div className={classes.label2}>
          <label>CREATE MEETING</label>
        </div>
        <BootstrapModal ref="meetingModal" message={this.state.message}/>
        <label> </label>
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-md-5">
              <div className="row">
                <Input type='text' label='Topic' name='topic' value={this.state.topic}
                       onChange={this.handleChangeTopic.bind(this, 'topic')} maxLength={50}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-5">
              <div className="row">
                <Input type='text' multiline label='Description' name='description' maxLength={400}
                       value={this.state.description}
                       onChange={this.handleChangeDescription.bind(this, 'description')}/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-3">
              <div className="row">
                <TimePicker label='Select time' onChange={this.handleChange} value={this.state.time}/>
              </div>
            </div>
            <div className="col-md-3">
              <div className="row">
                <DatePicker label='Select date' sundayFirstDayOfWeek style={{marginLeft:20}}
                            onChange={this.dateChange} minDate={min_datetime} value={this.state.programmedDate}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-5">
                <div className="row">

                  <select className="form-control" id="inputTeam" ref="team" onChange={this.teamChanged.bind(this)}
                          style={{marginLeft:10, marginTop:20}}>
                    <option value={this.state.teamName}/>
                    {this.state.teamsObj}
                  </select>

                  <div className="col-md-3 ">
                    <button type="button" className={"btn btn-primary", classes.btnTeam}
                            style={{marginLeft:10, marginTop:20}} onClick={this.createTeamAction.bind(this)}>
                      <span className="glyphicon glyphicon-ok"/>
                      Create Team
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-md-11">
              <div className="row">
                <label for="team" className="col-md-4 control-label"
                       style={{marginLeft:20, marginTop:20, fontSize: 17}}> </label>
                <div className="col-md-5">
                  <button type="button" className={"btn btn-primary", classes.btn }
                          style={{marginTop:40, marginLeft:10}} onClick={this.createMeeting.bind(this, goToNewMeeting)}>

                    <span className="glyphicon glyphicon-ok"/>
                    Create meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };
}
MeetingView.propTypes = {
  teamFromMeeting: PropTypes.func,
  saveMeetingInfo: PropTypes.func,
  goToNewMeeting: PropTypes.func,
  user: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingView)


/**
 * Created by Agustina on 10/2/2016.
 */
