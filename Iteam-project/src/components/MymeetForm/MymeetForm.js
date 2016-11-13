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
import {updateMeetingId} from '../../redux/reducers/Meeting/MeetingReducer'
import {MEETING} from '../../constants/HostConfiguration'

var programDate = new Date();


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }

  }

};

const mapDispatchToProps = (dispatch) => ({

  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.BOARD)),
  updateMyMeetingId: (meetingId) => dispatch(updateMeetingId(meetingId))
});


class MymeetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      meetings: {},
      date: new Date(),
      active: false,
      meetEdit: {},
      editedFields: {
        topic: false,
        description: false,
        programmedDate: false
      },
      editable: true
    }
  }


  goToReports(){
    this.props.updateMyMeetingId(this.state.meetEdit.meetingId);
  }

  startMeeting(){
    this.props.updateMyMeetingId(this.state.meetEdit.meetingId);
    this.props.onClick();
  }

  handleToggleDialog = (meeting) => {
    this.setState({
      active: !this.state.active,
      datetime: meeting.programmedDate,
      time: meeting.programmedDate,
      meetEdit: meeting,
      editedFields: {
        topic: false,
        description: false,
        programmedDate: false
      },
      editable:true
    });
    var datetime = new Date(meeting.programmedDate);
    programDate.setFullYear(datetime.getFullYear());
    programDate.setMonth(datetime.getMonth());
    programDate.setDate(datetime.getDate());
    programDate.setHours(datetime.getHours());
    programDate.setMinutes(datetime.getMinutes());
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

    var meetDate_minrange = dateNow.setMinutes(dateNow.getMinutes() - 15);
    var meetDate_maxrange = dateNow.setMinutes(dateNow.getMinutes() + 30);

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
    {label: "Delete Meeting", onClick: this.handleToggleDialog},
    {label: "Edit", onClick: this.edit.bind(this)},
    {label: "Save", onClick: this.save.bind(this)}
  ];

  AdminUserActionsFinish = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "View Reports", onClick: this.goToReports.bind(this)}
  ];

  UserActionsJoin = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Join", onClick: this.props.onClick}
  ];

  UserActionsView = [
    {label: "OK", onClick: this.handleToggleDialog}
  ];


  fillfields(meetings) {
    this.setState({meetings: meetings});
  }

  static renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
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
    let editedFields = this.state.editedFields;
    let editedMeeting = this.state.meetEdit;
    let saveMeeting = {};

    saveMeeting['meetingId'] = this.state.meetEdit.meetingId;

    if (editedFields.topic === true) {
      saveMeeting['topic'] = editedMeeting.topic;
    }
    if (editedFields.description === true) {
      saveMeeting['description'] = editedMeeting.description;
    }
    if (editedFields.programmedDate === true) {
      saveMeeting['programmedDate'] = programDate.getTime();
    }

    axios.post(MEETING.MEETING_UPDATE, saveMeeting).then(
      function (response) {}
    ).catch(
      function (response) {});

    this.setState({active: !this.state.active});
  }

  onChangeTopic = (topic) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.topic = topic;
    var editedState = this.state.editedFields;
    editedState.topic = true;
    this.setState({
      meetEdit: newMeeting,
      editedFields: editedState
    });
  };

  onChangeDescription = (description) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.description = description;
    var editedState = this.state.editedFields;
    editedState.description = true;
    this.setState({
      meetEdit: newMeeting,
      editedFields: editedState
    });
  };

  onChangeProgrammedDate = (date) => {
    this.setState({datetime: date});
    programDate.setFullYear(date.getFullYear());
    programDate.setMonth(date.getMonth());
    programDate.setDate(date.getDate());

    var newMeeting = this.state.meetEdit;
    newMeeting.programmedDate = programDate;
    var editedState = this.state.editedFields;
    editedState.programmedDate = true;
    this.setState({
      meetEdit: newMeeting,
      editedFields: editedState
    });
  };

  onChangeProgrammedTime = (time) => {
    this.setState({time: time});
    programDate.setHours(time.getHours());
    programDate.setMinutes(time.getMinutes());

    var newMeeting = this.state.meetEdit;
    newMeeting.programmedDate = programDate;
    var editedState = this.state.editedFields;
    editedState.programmedDate = true;
    this.setState({
      meetEdit: newMeeting,
      editedFields: editedState
    });
  };


  render() {
    let meets = this.state.meetings;
    let meetingTime = new Date;

    var meetmap = [].slice.call(meets).sort(function(a, b){
      return a.programmedDate-b.programmedDate
    });

    return (
      <div className={"container"} style={{marginTop:70}}>
        <div className={classes.content}>
        <div className={classes.label2}>
          <label>MY MEETINGS</label>
        </div>
        <List selectable ripple>
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
                    rightIcon='Select Meeting'
                    onClick={this.handleToggleDialog.bind(this, meetmap[key])}/>
                  <ListDivider />
                  <Dialog
                    actions={this.showActions(this.state.meetEdit.ownerName, this.state.meetEdit.programmedDate)}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggleDialog}
                    onOverlayClick={this.handleToggleDialog}>
                    <Input type='text' label='Topic' value={this.state.meetEdit.topic} maxLength={30}
                           onChange={this.onChangeTopic.bind(this)} disabled={this.state.editable}/>

                    <Input type='text' label='Description' value={this.state.meetEdit.description} maxLength={144}
                           onChange={this.onChangeDescription.bind(this)} disabled={this.state.editable}/>

                    <Input type='text' label='Team Name' value={this.state.meetEdit.teamName} disabled/>

                    <DatePicker label='Select date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                                readonly={this.state.editable} onChange={this.onChangeProgrammedDate.bind(this)}
                                minDate={new Date()}/>

                    <TimePicker label='Select time' value={isNaN(new Date(this.state.time)) ? 0 : new Date(this.state.time)}
                                readonly={this.state.editable} onChange={this.onChangeProgrammedTime.bind(this)}/>
                  </Dialog>
                  <BootstrapModal ref="meetingModal" message={this.state.message}/>
                </div>
              );
            }
          )}
        </List>
      </div>
  </div>
    )
  }
}


MymeetForm.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.any,
  goToReports: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MymeetForm);
