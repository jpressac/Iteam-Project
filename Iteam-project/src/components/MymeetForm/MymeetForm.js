import React, {Component, PropTypes} from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem, ListDivider, ListSubHeader} from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import DatePicker from 'react-toolbox/lib/date_picker';
import {push} from 'react-router-redux'
import {PATHS} from '../../constants/routes'


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
      meet: {}
    }
  }

  handleToggleDialog = (meeting) => {
    this.setState({
      active: !this.state.active,
      meet: meeting
    });
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
        return this.AdminUserActionsFinish;
      }
      else {
        if (MymeetForm.validateStart(meetingDate)) {
          return this.AdminActionsStart;
        }
        return this.AdminActionsEdit;
      }
    }
    else {
      console.log('is user');
      if (MymeetForm.validateDate(meetingDate)) {
        return this.AdminUserActionsFinish;
      }
      else {
        if (MymeetForm.validateStart(meetingDate)) {
          return this.UserActionsJoin;
        }
        return this.UserActionsView;
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
    {label: "Save", onClick: this.handleToggleDialog}
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


  render() {
    let meetmap = this.state.meetings;
    let meetingTime = new Date;

    return (
      <List selectable ripple>
        <ListSubHeader caption='MY MEETINGS'/>
        {Object.keys(meetmap).map((key) => {
            meetingTime = meetmap[key].programmedDate;
            var renderDateTime = this.renderDate(meetingTime);
            console.log('render datetime: ' + renderDateTime);
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
                  onOverlayClick={this.handleToggleDialog}
                  title={this.state.meet.topic}>
                  <DatePicker label='Select date' sundayFirstDayOfWeek
                              value={new Date(this.state.meet.programmedDate)}/>
                  <TimePicker label='Select time'
                              value={new Date(this.state.meet.programmedDate)}/>
                </Dialog>
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
