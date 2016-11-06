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

var programDate = new Date();


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.BOARD))
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
      }
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
    var meetDate_minrange = meetDate.getTime() - 1000000;
    var meetDate_maxrange = meetDate.getTime() + 1000000;
    var dateNow = new Date();

    if (meetDate_minrange < dateNow.getTime()) {
      return true;
    }
    if (meetDate_maxrange > dateNow.getTime()) {
      return false;
    }
    else
      return false
  }

  static validateStart(date) {
    var meetDate = new Date(date);
    var meetDate_minrange = meetDate.getTime() - 1000000;
    var meetDate_maxrange = meetDate.getTime() + 1000000;
    var dateNow = new Date();

    console.log('min: ' + meetDate_minrange);
    console.log('max: ' + meetDate_maxrange);
    console.log('min: ' + dateNow.getTime());

    return meetDate_minrange < dateNow.getTime() < meetDate_maxrange;
  }


  showActions(meetingOwner, meetingDate) {
    if (this.isAdmin(meetingOwner)) {
      if (MymeetForm.validateDate(meetingDate)) {
        return this.AdminActionsEdit;
      }
      else {
        if (MymeetForm.validateStart(meetingDate)) {
          return this.AdminActionsEdit;
        }
        return this.AdminActionsEdit;
      }
    }
    else {
      console.log('is user');
      if (MymeetForm.validateDate(meetingDate)) {
        return this.AdminActionsEdit;
      }
      else {
        if (MymeetForm.validateStart(meetingDate)) {
          return this.AdminActionsEdit;
        }
        return this.AdminActionsEdit;
      }
    }
  }

  AdminActionsStart = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Start", onClick: this.props.onClick}
  ];

  AdminActionsEdit = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Delete Meeting", onClick: this.handleToggleDialog},
    {label: "Edit", onClick: this.edit.bind(this)},
    {label: "Save", onClick: this.save.bind(this)}
  ];

  AdminUserActionsFinish = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "View Reports", onClick: this.handleToggleDialog}
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

  renderDate(meetingTime) {
    let options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(meetingTime))
  }

  componentDidMount() {
    console.log('User: ' + this.props.user);
    axios.get('http://localhost:8080/meeting/meetingbyuser?username=' + this.props.user
    ).then(function (response) {
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

    this.edit.bind(this);
    this.handleToggleDialog.bind(this);

    axios.post('http://localhost:8080/meeting/update', saveMeeting).then(
      function (response) {
        this.setState({message: '¡Your meeting was successfully updated!'});
        this.refs.mymodal.openModal();
      }
    ).catch(
      function (response) {
        this.setState({message: '¡Ups, there was an error!'});
        this.refs.mymodal.openModal();
      });
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
    let meetmap = this.state.meetings;
    let meetingTime = new Date;

    return (
      <div className={"container"} style={{marginTop:70}}>
        <div className={classes.label2}>
          <label>MY MEETING</label>
        </div>
      <List selectable ripple >
        <ListSubHeader />
        {Object.keys(meetmap).map((key) => {
            meetingTime = meetmap[key].programmedDate;
            var renderDateTime = this.renderDate(meetingTime);
            return (
              <div>
                <ListItem
                  caption={meetmap[key].topic}
                  legend={renderDateTime}
                  leftIcon='send'
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

                  <DatePicker label='Select date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                              readonly={false} onChange={this.onChangeProgrammedDate.bind(this)}/>

                  <TimePicker label='Select time' value={new Date(this.state.time)}
                              readonly onChange={this.onChangeProgrammedTime.bind(this)}/>
                </Dialog>
                <BootstrapModal ref="meetingModal" message={this.state.message}/>
              </div>
            );
          }
        )}
      </List>
        </div>
    )
  }

}


MymeetForm.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(MymeetForm);
