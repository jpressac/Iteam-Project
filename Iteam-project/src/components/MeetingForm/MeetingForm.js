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
import {saveMeeting} from '../../redux/reducers/Meeting/MeetingReducer'
import {meetingToNewTeam} from '../../redux/reducers/Meeting/MeetingForTeamReducer'
import Dropdown from 'react-toolbox/lib/dropdown';


var datetime = new Date();
const min_datetime = new Date(new Date(datetime).setDate(datetime.getDate()));


const mapDispatchToProps = dispatch => ({

  saveMeetingInfo: (meeting) => dispatch(saveMeeting(meeting)),

  meetingToCreateNewTeam: () => dispatch(meetingToNewTeam()),

  goToNewMeeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME))
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
      time: new Date(),
      teamName: '',
      teamsObj: [],
      teamSelectedName:''
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

    if (this.props.fromMeeting === true) {
      this.setState({
        topic: this.props.meetingInfoSave["meeting"]["topic"],
        description: this.props.meetingInfoSave["meeting"]["description"],
        programmedDate: this.props.meetingInfoSave["meeting"]["time"],
        ownerName: this.props.meetingInfoSave["meeting"]["ownerName"],
        time: this.props.meetingInfoSave["meeting"]["time"]
      })
    }

    axios.get('http://localhost:8080/team/byowner'
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
    let json =JSON.stringify(data);
    

    this.setState({teamsObj: opt});
    this.setState({teamList: data});
    this.forceUpdate();
  }


  createMeeting(goToNewMeeting) {



    let teamId = '';
    if (this.state.topic === '' || this.state.description === '' || this.state.teamSelectedName === '') {
      this.setState({message: '¡You have to complete the form!'});
      this.refs.meetingModal.openModal();


    } else {
      teamId = this.searchTeamIdGivenTeamName(this.state.teamSelectedName);

      axios.post('http://localhost:8080/meeting/create', {
        topic: this.state.topic,
        ownerName: this.props.user,
        programmedDate: this.state.programmedDate.getTime(),
        description: this.state.description,
        teamName: teamId
      }).then(function (response) {
        //TODO: use the spinner instead of modal
        this.setState({message: '¡Your meeting was successfully created!'});
        this.refs.meetingModal.openModal();
        goToNewMeeting()
      }.bind(this)).catch(function (response) {

      });
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
let json= JSON.stringify(filteredLabelObject);
    console.log('json ' + json);
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
      <Dropdown label="Select team" auto onChange={this.comboTeam.bind(this)} source={this.state.teamsObj}
                value={this.state.teamValue}/>
    );
  };

  render() {
    const {goToNewMeeting} = this.props;
    return (

      <div className={"container"} style={{marginTop:70}}>
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
            </div>
            <div className="form-group">
              <div className="col-md-3">
                <div className="row">
                  {this.dropdownTeam()}
                  </div>
                </div>

                  <div className="row">
                  <div className="col-md-4 ">
                    <button type="button" className={"btn btn-primary", classes.btnTeam}
                            style={{marginLeft:10, marginTop:20}} onClick={this.createTeamAction.bind(this)}>
                      <span className="glyphicon glyphicon-ok"/>
                      Create Team
                    </button>
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

        </form>
      </div>
    );
  };
}
MeetingView.propTypes = {
  meetingToCreateNewTeam: PropTypes.func,
  saveMeetingInfo: PropTypes.func,
  goToNewMeeting: PropTypes.func,
  user: PropTypes.any,
  meetingInfoSave: PropTypes.any,
  fromMeeting: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingView)


/**
 * Created by Agustina on 10/2/2016.
 */
