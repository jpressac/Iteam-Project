import React, {Component, PropTypes} from "react"
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import axios from 'axios'
import {PATHS} from './../../constants/routes'
import TimePicker from 'react-toolbox/lib/time_picker'
import {connect} from 'react-redux'
import DatePicker from 'react-toolbox/lib/date_picker'
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal'
import InputComponent from '../InputComponent/InputComponent'
import AutocompleteComponent from '../AutocompleteComponent/AutocompleteComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import Spinner from '../Spinner/Spinner'
import {saveMeeting, saveMeetingInfo} from '../../redux/reducers/Meeting/MeetingReducer'
import {meetingToNewTeam, meetingCreated} from '../../redux/reducers/Meeting/MeetingForTeamReducer'
import themeLabel from './label.scss'
import Avatar from 'react-toolbox/lib/avatar'
import avatarTheme from './avatarTheme.scss'
import {TEAM} from '../../constants/HostConfiguration'
import {push} from 'react-router-redux'
import {createMeeting} from '../../utils/actions/meetingActions'
import Tooltip from 'react-toolbox/lib/tooltip'
import Checkbox from 'react-toolbox/lib/checkbox'
import MeetingConfigForm from '../MeetingConfigForm/MeetingConfigForm'
import {canSaveString} from '../../utils/validationUtils'


const TooltipCheckbox = Tooltip(Checkbox);

const mapDispatchToProps = dispatch => ({
  saveMeetingInfo: (meeting) => dispatch(saveMeeting(meeting)),
  meetingToCreateNewTeam: () => dispatch(meetingToNewTeam()),
  goToSlackInfo: (meeting) => dispatch(saveMeetingInfo(meeting)),
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  slackInfo: () => dispatch(push('/' + PATHS.MENULOGGEDIN.SLACKUSERSINFO)),
  myMeetings: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MYMEETINGS)),
  meetingCreatedok: () => dispatch(meetingCreated())
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
      showSpinner: true,
      meetingConfig: {},
      votes: 0,
      technic: '',
      tags: new Set(),
      useSlack: false
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

    if (this.props.meetingInfoSave != null) {
      this.setState({
        topic: this.props.meetingInfoSave.topic,
        description: this.props.meetingInfoSave.description,
        programmedDate: new Date(this.props.meetingInfoSave.programmedDate),
        time: this.props.meetingInfoSave.time,
        ownerName: this.props.meetingInfoSave.ownerName,
        endTime: new Date(this.props.meetingInfoSave.endDate),
        votes: this.props.meetingInfoSave.meetingConfig.votes,
        tags: this.props.meetingInfoSave.meetingConfig.tags,
        technic: this.props.meetingInfoSave.meetingConfig.technic,
        useSlack: this.props.meetingInfoSave.useSlack,
        endDate: new Date(this.props.meetingInfoSave.endDate)
      })
    }

    axios.get(TEAM.TEAM_BY_OWNER
    ).then(function (response) {
      this.fillTeam(response.data)
    }.bind(this));
  }

  getSlackInfo() {
    let meetingInfo = this.setReducerInfo();
    this.props.goToSlackInfo(meetingInfo);
    this.props.slackInfo();
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

  addTagMiscellaneous() {
    let newTags = this.state.tags;

    if (this.state.technic == 'Brainstorming') {
      newTags.add('Miscellaneous')
    }

    //The 'All' will be available for all technics
    newTags.add('All')

    this.setState({tags: newTags})
  }

  createNewMeeting() {
    if (canSaveString(this.state.topic, this.state.description, this.state.teamSelectedName)) {
      this.addTagMiscellaneous();
      this.setState({showSpinner: true});
      let meetingInfo = this.setReducerInfo();

      createMeeting(meetingInfo).then(() => {
        this.props.myMeetings();
      }).catch(() => {
        //TODO: implement modal here or go to error page
      });
      //REDUCER
      //this.props.goToMeetingConfig(meetingInfo);
    }
    else {
      this.setState({message: '¡You have to complete the form!'});
      this.refs.meetingModal.openModal();
    }
  }

  setReducerInfo() {
    let teamId = '';
    if (this.state.teamSelectedName !== '') {
      teamId = this.searchTeamIdGivenTeamName(this.state.teamSelectedName);
    }
    let meetingInfo = {
      topic: this.state.topic,
      description: this.state.description,
      ownerName: this.props.user,
      programmedDate: this.state.programmedDate.getTime(),
      endDate: this.state.endDate.getTime(),
      time:this.state.time,
      teamName: teamId,
      meetingConfig: {
        votes: this.state.votes,
        tags: this.state.tags,
        technic: this.state.technic
      },
      useSlack: this.state.useSlack
    };
    return meetingInfo;
  }

  searchTeamIdGivenTeamName(teamNameCombo) {
    let filtered = this.state.teamList.filter(team => team.teamName === teamNameCombo);
    return filtered[0]["teamId"]
  }

  handleChange(key, value) {
    this.setState({[key]: value});
  }

  createTeamAction() {
    let meetingInfo = this.setReducerInfo();
    this.props.saveMeetingInfo(meetingInfo);
    this.props.meetingToCreateNewTeam();
  }

  handleConfigChange = (key, value) => {
    this.setState({[key]: value})
  };


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
              <InputComponent className={"col-md-12 " + cssClasses.paddingInnerElements} label="Topic" type="text"
                              value={this.state.topic}
                              onValueChange={this.handleChange.bind(this, 'topic')} maxLength={60}/>
              <InputComponent className={"col-md-12 " + cssClasses.paddingInnerElements} label="Description" type="text"
                              maxLength={400}
                              onValueChange={this.handleChange.bind(this, 'description')}
                              value={this.state.description}/>
            </div>
            <div className={"col-md-12 " + cssClasses.paddingInnerElements}>
              <div className={"col-md-4"}>
                <DatePicker label='Select date' onChange={this.dateChange} minDate={new Date()} theme={themeLabel}
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
              <AutocompleteComponent onValueChange={this.handleChange.bind(this, 'teamSelectedName')}
                                     label="Select team" initialValue='' source={this.state.teamsObj}/>
            </div>
            <ButtonComponent className={"col-md-4 " + cssClasses.paddingInnerElements} raisedValue
                             onClick={this.createTeamAction.bind(this)} value="Create Team"/>

            <div className={"col-md-12 " + cssClasses.paddingInnerElements}>
              <div className={"col-md-3 " + cssClasses.labelInfo}>
                <TooltipCheckbox label='Use a Slack channel'
                                 checked={this.state.useSlack}
                                 onChange={this.handleChange.bind(this, 'useSlack')}
                                 tooltip='Use a slack channel for meeting updates and communication'/>
              </div>
                <ButtonComponent className={"col-md-3 "} raisedValue
                                 onClick={this.getSlackInfo.bind(this)} value="Slack info"/>
            </div>
                <MeetingConfigForm onSetConfig={this.handleConfigChange.bind(this)}/>

              <div className={"col-md-12 " + cssClasses.paddingInnerElements}>
                <ButtonComponent className="col-md-6" onClick={this.props.home} iconButton="navigate_before"
                                 value="Cancel"/>
                <ButtonComponent className="col-md-6"
                                 onClick={this.createNewMeeting.bind(this)} iconButton="navigate_next"
                                 value="Create Meeting"/>
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
  goToSlackInfo: PropTypes.func,
  user: PropTypes.any,
  meetingInfoSave: PropTypes.any,
  fromMeeting: PropTypes.bool,
  home: PropTypes.func,
  slackInfo:PropTypes.func,
  myMeetings: PropTypes.func,
  meetingCreatedok: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingView)
