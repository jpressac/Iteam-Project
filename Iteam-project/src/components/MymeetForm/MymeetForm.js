import React, {Component, PropTypes} from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem, ListDivider, ListSubHeader} from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import DatePicker from 'react-toolbox/lib/date_picker';
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
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
      meetings: {},
      active: false,
      meet: {},
      meetEdit:{},
      editable: true
    }
  }

  handleToggleDialog = (meeting) => {
    this.setState({
      active: !this.state.active,
      meet: meeting,
      datetime: meeting.programmedDate,
      time: meeting.programmedDate,
      meetEdit: meeting
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
    let editedMeeting = this.state.meetEdit;
    let originalMeeting = this.state.meet;
    let saveMeeting={};

    saveMeeting['meetingId'] = this.state.meet.meetingId;

    let jsonObject={};
    console.log('orig: ' + originalMeeting.topic);
    console.log('new: ' + editedMeeting.topic);
    console.log('new: ' + editedMeeting.topic);
    if(originalMeeting.topic.localeCompare(editedMeeting.topic)){
      saveMeeting['topic']= editedMeeting.topic;
      jsonObject = JSON.stringify(saveMeeting);
      console.log('topic edited: ' + jsonObject);
    }
    if(originalMeeting.description != editedMeeting.description){
      saveMeeting['description']= editedMeeting.description;
      jsonObject = JSON.stringify(saveMeeting);
      console.log('descr edited: ' + jsonObject);
    }
    if(originalMeeting.programmedDate !== editedMeeting.programmedDate){
      saveMeeting['programmedDate']= editedMeeting.programmedDate;
      jsonObject = JSON.stringify(saveMeeting);
      console.log('programmed edited: ' + jsonObject);
    }

    jsonObject = JSON.stringify(saveMeeting);
    console.log('Object edited: ' + jsonObject);


    axios.post('http://localhost:8080/meeting/update', {jsonObject}).then(
      function (response) {
        this.setState({message: '¡Your meeting was successfully updated!'});
        this.refs.mymodal.openModal();
      }
    ).catch(
      function (response) {
        this.setState({message: '¡Ups, there was an error!'});
        this.refs.mymodal.openModal();
      });
    this.setState({editable: true})
  }

  onChangeTopic = (topic) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.topic = topic;
    this.setState({meetEdit: newMeeting});
    console.log('orig topic: ' + this.state.meet.topic)
    console.log('new topic: ' + this.state.meetEdit.topic)
  };

  onChangeDescription = (description) => {
    var newMeeting = this.state.meetEdit;
    newMeeting.description = description;
    this.setState({meetEdit: newMeeting});
  };

  onChangeProgrammedDate = (date) => {
    this.setState({datetime: date});
    programDate.setFullYear(date.getFullYear());
    programDate.setMonth(date.getMonth());
    programDate.setDate(date.getDate());

    var newMeeting = this.state.meetEdit;
    newMeeting.description = programDate;
    this.setState({meetEdit: newMeeting});
  };

  onChangeProgrammedTime = (time) => {
    this.setState({time: time});
    programDate.setHours(time.getHours());
    programDate.setMinutes(time.getMinutes());

    var newMeeting = this.state.meetEdit;
    newMeeting.description = programDate;
    this.setState({meetEdit: newMeeting});
  };

  render() {
    let meetmap = this.state.meetings;
    let meetingTime = new Date;

    return (
      <List selectable ripple>
        <ListSubHeader caption='MY MEETINGS'/>
        {Object.keys(meetmap).map((key) => {
            meetingTime = meetmap[key].programmedDate;
            var renderDateTime = this.renderDate(meetingTime);
            console.log('editable: ' + this.state.editable);
            return (
              <div>
                <ListItem
                  caption={meetmap[key].topic}
                  legend={renderDateTime}
                  leftIcon='send'
                  onClick={this.handleToggleDialog.bind(this, meetmap[key])}/>
                <ListDivider />
                <Dialog
                  actions={this.showActions(this.state.meet.ownerName, this.state.meet.programmedDate)}
                  active={this.state.active}
                  onEscKeyDown={this.handleToggleDialog}
                  onOverlayClick={this.handleToggleDialog}>
                  <Input type='text' label='Topic' value={this.state.meetEdit.topic} maxLength={30}
                         onChange={this.onChangeTopic.bind(this)}/>

                  <Input type='text' label='Description' value={this.state.meetEdit.description} maxLength={144}
                         onChange={this.onChangeDescription.bind(this)}/>

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
    )
  }

}


MymeetForm.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(MymeetForm);
