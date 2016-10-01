import React, {Component, PropTypes} from "react";
import classes from './MymeetForm.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem} from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import DatePicker from 'react-toolbox/lib/date_picker';


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.name
    }
  }
};


class MymeetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      meetings: {},
      date: new Date(),
      active: false,
      active2: false
    }
  }

  timeChange = (time) => {
    console.log('Example Time: ' + time);
    this.setState({time: time});
  };

  dateChange = (date) => {
    console.log('Example Date: ' + date);
    this.setState({date: date});

  };

  handleToggleDialog = () => {
    this.setState({active: !this.state.active});
  };

  saveChanges(meetingId) {
    let meetmap = this.state.meetings;
    map[meetingId].programmedDate = date;
    this.setState({meetings: map})
  }

  /*  handleToggleDateTime = () => {
   this.setState({active: !this.state.active2});
   };*/


  actions = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Save", onClick: this.handleToggleDialog}
  ];


  fillfields(meetings) {
    debugger;
    this.setState({meetings: meetings});
    let meetmap = this.state.meetings;
    console.log('Datos de user : ' + meetmap);
    {
      Object.keys(meetmap).map((key) => {
        meetmap[meetmap[key].meetingId] = {
          topic: meetmap[key].topic,
          programmedDate: meetmap[key].programmedDate,
          owner: meetmap[key].ownerName,
          team: meetmap[key].teamName,
          description: meetmap[key].description
        }
      });
    }
    this.setState({meetings: meetmap});
  }

  isAdmin(owner) {
    return this.props.user === owner;
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  renderDate(meetingTime) {
    let options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    };

    return new Intl.DateTimeFormat("en-US", options).format(new Date(meetingTime))
  }
  

//  startMeeting(date){
//    var today = new Date.now();
//    if(today)
//  }

  componentDidMount() {
    console.log('User: ' + this.props.user);
    axios.get('http://localhost:8080/meeting/meetingbyuser?username=' + this.props.user
    ).then(function (response) {
      this.fillfields(response.data)
    }.bind(this));
  }


  render() {
    let meetingmap = this.state.meetings;
    let meetingTime = new Date;
    let mt = new Date;
    let dateTime = new Date;
    let fullDate;
    return (
      <div className={"container"}>
        <div className={classes.label}>
          <label>MY MEETINGS</label>
        </div>
        <List selectable ripple>
          {Object.keys(meetingmap).map((key) => {
              console.log('meeting id:' + meetingmap[key].meetingId);
              console.log('meeting key:' + key);

              meetingTime = meetingmap[key].programmedDate;
              var renderDateTime = this.renderDate(meetingTime);
              console.log('render datetime: ' + renderDateTime);

              return (
                <div>
                  <ListItem
                    caption={meetingmap[key].topic}
                    legend={renderDateTime}
                    onClick={this.handleToggleDialog}>
                  </ListItem>
                  <div>
                    <Dialog
                      actions={this.actions}
                      active={this.state.active}
                      onEscKeyDown={this.handleToggleDialog}
                      onOverlayClick={this.handleToggleDialog}
                      title={meetingmap[key].topic}>
                      <DatePicker label='Select date' sundayFirstDayOfWeek
                                  value={new Date(meetingTime)}/>
                      <TimePicker label='Select time'
                                  value={new Date(meetingTime)}/>
                    </Dialog>
                  </div>
                </div>
              );
            }
          )}
        </List>
      </div>

    )
  }
  ;
}


MymeetForm.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(MymeetForm);
