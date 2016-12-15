import React, {Component, PropTypes} from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem, ListDivider, ListSubHeader} from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import DatePicker from 'react-toolbox/lib/date_picker';
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
import classes from './MymeetForm.scss';
import Input from 'react-toolbox/lib/input';
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal';
import ListItem1 from './ListItem1.scss'
import ListItem2 from './ListItem2.scss'
import listFormat from './List.scss'
import chipTheme from './chips.scss'
import {updateMeetingId} from '../../redux/reducers/Meeting/MeetingReducer'
import {MEETING} from '../../constants/HostConfiguration'
import themeLabel from './label.scss'
import Dropdown from 'react-toolbox/lib/dropdown';
import Tooltip from 'react-toolbox/lib/tooltip';
import {Button} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import {saveConfig} from '../../redux/reducers/Meeting/MeetingConfigReducer'

var programDate = new Date();
var endDate = new Date();
const TooltipButton = Tooltip(Button);
const technics = [{value: 0, label: 'Brainstorming'}, {value: 1, label: 'SCAMPER'}, {
  value: 2,
  label: 'morphological analysis'
}];


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }

  }

};

const mapDispatchToProps = (dispatch) => ({

  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.PERSONALBOARD)),
  updateMyMeetingId: (meetingId) => dispatch(updateMeetingId(meetingId)),
  saveMeetingConfig: (meeting) => dispatch(saveConfig(meeting))
});


class MymeetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      endtime: new Date(),
      meetings: {},
      date: new Date(),
      active: false,
      config: {},
      meetEdit: {},
      editable: true,
      technicValue: '',
      teamName: {},
      tag: ''
    }
  }


  goToReports() {
    this.props.updateMyMeetingId(this.state.meetEdit.meetingId);
  }

  startMeeting() {
    console.log('Meeting configuration' + this.state.config);
    console.log('Meeting topic' + this.state.meetEdit.topic);

    //Object that contains meeting info for reducer for Toolbar
    let meetingInfo = {};
    meetingInfo.topic = this.state.meetEdit.topic;
    meetingInfo.config = this.state.config;
    console.log(JSON.stringify(meetingInfo));
    //Reducer containing toolbar info
    this.props.saveMeetingConfig(meetingInfo);
    //Reducer for meeting ID
    this.props.updateMyMeetingId(this.state.meetEdit.meetingId);
    //Dispatch to personal board
    this.props.onClick();
  }

  handleToggleDialog = (meeting) => {
    this.setState({
      active: !this.state.active,
      datetime: meeting.programmedDate,
      time: meeting.programmedDate,
      endtime: meeting.endDate,
      config: meeting.meetingConfig,
      meetEdit: meeting,
      editable: true
    });
    var datetime = new Date(meeting.programmedDate);
    programDate.setFullYear(datetime.getFullYear());
    programDate.setMonth(datetime.getMonth());
    programDate.setDate(datetime.getDate());
    programDate.setHours(datetime.getHours());
    programDate.setMinutes(datetime.getMinutes());

    var enddatetime = new Date(meeting.endDate);
    endDate.setFullYear(enddatetime.getFullYear());
    endDate.setMonth(enddatetime.getMonth());
    endDate.setDate(enddatetime.getDate());
    endDate.setHours(enddatetime.getHours());
    endDate.setMinutes(enddatetime.getMinutes());

    //Save configuration to reducer

  };

  isAdmin(owner) {
    return this.props.user === owner;
  }

  static validateDate(date) {
    var meetDate = new Date(date);
    var dateNow = new Date();
    var meetDate_minrange = dateNow.setMinutes(dateNow.getMinutes() - 15);

    return meetDate_minrange > meetDate.getTime();
  }

  static validateStart(date) {
    var meetDate = new Date(date);
    var dateNow = new Date();

    var meetDate_minrange = dateNow.setMinutes(dateNow.getMinutes() - 150);
    var meetDate_maxrange = dateNow.setMinutes(dateNow.getMinutes() + 300);

    return (meetDate_minrange < meetDate.getTime() && meetDate.getTime() < meetDate_maxrange);
  }


  showActions(meetingOwner, meetingDate) {
    if (this.isAdmin(meetingOwner)) {
      //fecha ya paso, puede ver reportes
      if (MymeetForm.validateDate(meetingDate)) {
        return this.AdminUserActionsFinish;
      }
      else {
        //rango de tiempo aceptable para comenzar reunion
        if (MymeetForm.validateStart(meetingDate)) {
          return this.AdminActionsStart;
        }
        //fecha mayor, puede editar
        return this.AdminActionsEdit;
      }
    }
    else {
      console.log('is user');
      //fecha ya paso
      if (MymeetForm.validateDate(meetingDate)) {
        return this.AdminUserActionsFinish;
      }
      else {
        //rango de tiempo aceptable para unirse reunion
        if (MymeetForm.validateStart(meetingDate)) {
          return this.UserActionsJoin;
        }
        // fecha mayor, puede poner ver
        return this.UserActionsView;
      }
    }
  }

  AdminActionsStart = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Start", onClick: this.startMeeting.bind(this)}
  ];

  AdminActionsEdit = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Delete MeetingConfig", onClick: this.handleToggleDialog},
    {label: "Edit", onClick: this.edit.bind(this)},
    {label: "Save", onClick: this.save.bind(this)}
  ];
  AdminUserActionsFinish = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "View Reports", onClick: this.goToReports.bind(this)}
  ];

  UserActionsJoin = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Join", onClick: this.startMeeting.bind(this)}
  ];

  UserActionsView = [
    {label: "OK", onClick: this.handleToggleDialog}
  ];

  static renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
  }

  fillfields(meetings) {
    this.setState({meetings: meetings});
  }

  componentDidMount() {
    axios.get(MEETING.MEETING_BY_USER, {params: {username: this.props.user}}).then(function (response) {
      this.fillfields(response.data)
    }.bind(this));
  }

  edit() {
    this.setState({editable: false})
  }

  save() {
    let editedMeeting = this.state.meetEdit;

    editedMeeting.meetingId = this.state.meetEdit.meetingId;
    editedMeeting.meetingConfig = this.state.config;
    console.debug('Save meeting object: ' + JSON.stringify(editedMeeting));

    axios.post(MEETING.MEETING_UPDATE, editedMeeting).then(
      function (response) {
      }
    ).catch(
      function (response) {
      });

    this.setState({active: !this.state.active});
  }

  onChangeTopic = (topic) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.topic = topic;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangeVotes = (votes) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.meetingConfig.votes = votes;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangeSbtime = (sbtime) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.meetingConfig.sbtime = sbtime;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangePbtime = (pbtime) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.meetingConfig.pbtime = pbtime;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangeDescription = (description) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.description = description;
    this.setState({
      meetEdit: newMeeting
    });
  };


  onChangeProgrammedDate = (date) => {
    var newDate = new Date(MymeetForm.changeEndDate(programDate, endDate, date));
    console.debug('new date: ' + newDate);

    programDate.setFullYear(date.getFullYear());
    programDate.setMonth(date.getMonth());
    programDate.setDate(date.getDate());

    endDate.setFullYear(newDate.getFullYear());
    endDate.setMonth(newDate.getMonth());
    endDate.setDate(newDate.getDate());

    var newMeeting = this.state.meetEdit;
    newMeeting.programmedDate = programDate.getTime();
    newMeeting.endDate = endDate.getTime();
    this.setState({
      meetEdit: newMeeting,
      datetime: date
    });
  };

  static changeEndDate(startDate, enddate, newdate) {
    if (startDate.getDate() === enddate.getDate()) {
      return newdate;
    }
    var nextday = new Date(newdate);
    return nextday.setDate(newdate.getDate() + 1)
  }

  static validateHour(newHour) {
    return Date.now() < newHour;
  }

  onChangeProgrammedTime = (time) => {
    if (MymeetForm.validateHour(time)) {
      programDate.setHours(time.getHours());
      programDate.setMinutes(time.getMinutes());

      var newMeeting = this.state.meetEdit;
      newMeeting.programmedDate = programDate.getTime();
      this.setState({
        meetEdit: newMeeting,
        time: time
      });
    }
    else{
        this.setState({message: '¡You have to complete with valid time!'});
        this.refs.mymeetingModal.openModal();
      }
  };

  onChangeEndTime = (time) => {
    endDate = new Date(MymeetForm.checkDate(programDate.getHours(), time.getHours(), programDate));
    console.debug('end Date: ' + endDate);
    endDate.setHours(time.getHours());
    endDate.setMinutes(time.getMinutes());

    var newMeeting = this.state.meetEdit;
    newMeeting.endDate = endDate.getTime();
    this.setState({
      meetEdit: newMeeting,
      endtime: time
    });
  };

  static checkDate(startHour, endHour, date) {
    if ((endHour - startHour) < 0 && (programDate.getDate() === endDate.getDate())) {
      var newDay = new Date(date);
      newDay.setDate(date.getDate() + 1);
      return newDay;
    }
    return endDate;
  }

  handleChangeCombo = (value) => {
    let filteredLabelObject = technics.filter(filter => filter["value"] == value);
    var newconfig = this.state.config;
    newconfig.technic = value;
    this.setState({config: newconfig, technicValue: filteredLabelObject[0]["label"]})
  };


  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  deletetag(pos) {
    let newtags = this.state.config.tags;
    newtags.map(function (filter, index) {
      if (pos === index) {
        newtags.splice(index, 1);
      }
    });
    var newconfig = this.state.config;
    newconfig.tags = newtags;
    this.setState({config: newconfig, tag: ''});
  }

  handleAddTag() {
    if (this.state.tag !== '') {
      var newtags = this.state.config.tags;
      newtags.push((this.state.tag));
      var newconfig = this.state.config;
      newconfig.tags = newtags;
      this.setState({config: newconfig, tag: ''});
      console.debug('tags: ' + this.state.tags);
    }
  }

  tagLabels() {
    if (typeof this.state.config.tags !== "undefined") {
      return this.state.config.tags.map(function (tag, index) {
        return (
          <Chip deletable={!this.state.editable} onDeleteClick={this.deletetag.bind(this, index)} theme={chipTheme}>
            {tag}
          </Chip>
        );
      }.bind(this));
    }
  }

  showDialog() {
    if (this.isAdmin(this.state.meetEdit.ownerName)) {
      return this.showDialogForAdmin();
    }
    else {
      return this.showDialogForUser()
        ;
    }
  }

  showDialogForUser() {
    return (
      <Dialog
        actions={this.showActions(this.state.meetEdit.ownerName, this.state.meetEdit.programmedDate)}
        active={this.state.active}
        onEscKeyDown={this.handleToggleDialog}
        onOverlayClick={this.handleToggleDialog}>
        <Input type='text' label='Topic' value={this.state.meetEdit.topic} maxLength={30}
               onChange={this.onChangeTopic.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <Input type='text' label='Description' value={this.state.meetEdit.description} maxLength={144}
               onChange={this.onChangeDescription.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <DatePicker label='Date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedDate.bind(this)}
                    minDate={new Date()}/>
        <TimePicker label='Time'
                    value={isNaN(new Date(this.state.time)) ? 0 : new Date(this.state.time)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedTime.bind(this)}/>
        <TimePicker label='End Time'
                    value={isNaN(new Date(this.state.endtime)) ? 0 : new Date(this.state.endtime)}
                    readonly={this.state.editable} onChange={this.onChangeEndTime.bind(this)}
                    theme={themeLabel}/>
      </Dialog>
    )
  }

  showDialogForAdmin() {
    return (
      <Dialog
        actions={this.showActions(this.state.meetEdit.ownerName, this.state.meetEdit.programmedDate)}
        active={this.state.active}
        onEscKeyDown={this.handleToggleDialog}
        onOverlayClick={this.handleToggleDialog}>
        <Input type='text' label='Topic' value={this.state.meetEdit.topic} maxLength={30}
               onChange={this.onChangeTopic.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <Input type='text' label='Description' value={this.state.meetEdit.description} maxLength={144}
               onChange={this.onChangeDescription.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <DatePicker label='Date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedDate.bind(this)}
                    minDate={new Date()}
                    theme={themeLabel}/>
        <TimePicker label='Start Time'
                    value={isNaN(new Date(this.state.time)) ? 0 : new Date(this.state.time)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedTime.bind(this)}
                    theme={themeLabel}/>
        <TimePicker label='End Time'
                    value={isNaN(new Date(this.state.endtime)) ? 0 : new Date(this.state.endtime)}
                    readonly={this.state.editable} onChange={this.onChangeEndTime.bind(this)}
                    theme={themeLabel}/>
        <Input label="Votes" value={this.state.config.votes}
               onChange={this.onChangeVotes.bind(this)} disabled={this.state.editable} type='number'
               theme={themeLabel} min="0"/>
        <Input label="Minutes in personal board"
               value={this.state.config.pbtime} onChange={this.onChangePbtime.bind(this)}
               disabled={this.state.editable} type='number'
               theme={themeLabel} min="0"/>
        <Input label="Minutes in shared board"
               value={this.state.config.sbtime} onChange={this.onChangeSbtime.bind(this)}
               disabled={this.state.editable} type='number'
               theme={themeLabel} min="0"/>
        <Dropdown label="Technic" auto onChange={this.handleChangeCombo.bind(this)} style={{color: '#900C3F'}}
                  source={technics} disabled={this.state.editable} value={this.state.config.technic}
                  theme={themeLabel}/>
        <Input type='text' label='Tag' value={this.state.tag} disabled={this.state.editable}
               onChange={this.handleChange.bind(this,'tag')} maxLength={30}
               theme={themeLabel}/>
        <TooltipButton icon='add' tooltip='Add tag' floating mini
                       style={{background:'#900C3F', color:'white', marginTop:10}}
                       disabled={this.state.editable} onClick={this.handleAddTag.bind(this)}/>
        {this.tagLabels()}
      </Dialog>
    )
  }


  render() {
    let meets = this.state.meetings;
    let meetingTime = new Date;

    var meetmap = [].slice.call(meets).sort(function (a, b) {
      return a.programmedDate - b.programmedDate
    });

    return (
      <div className={"container"} style={{marginTop:70}}>
        <div className={classes.content}>
          <div className={classes.label2}>
            <label>MY MEETINGS</label>
          </div>
          <BootstrapModal ref="mymeetingModal" message={this.state.message}/>
          <List theme={listFormat} selectable ripple>
            <ListSubHeader />
            {Object.keys(meetmap).map((key) => {
                meetingTime = meetmap[key].programmedDate;
                var renderDateTime = MymeetForm.renderDate(meetingTime);
                var future_date = MymeetForm.validateDate(meetingTime);
                var color = future_date ? ListItem2 : ListItem1;
                return (
                  <div>
                    <ListItem
                      theme={color}
                      caption={meetmap[key].topic}
                      legend={renderDateTime}
                      leftIcon='send'
                      rightIcon='visibility'
                      onClick={this.handleToggleDialog.bind(this,meetmap[key])}/>
                    <ListDivider />
                    <BootstrapModal ref="meetingModal" message={this.state.message}/>
                  </div>
                );
              }
            )}
            {this.showDialog()}
          </List>
        </div>
      </div>
    )
  }
}


MymeetForm.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.any,
  goToReports: PropTypes.func,
  saveMeetingConfig: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MymeetForm);
