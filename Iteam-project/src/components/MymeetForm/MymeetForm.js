import React, {Component, PropTypes} from "react";
import classes from './MymeetForm.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem} from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import Input from 'react-toolbox/lib/input'

let time = new Date();

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.name
    }
  }
};


class MymeetForm extends Component {
  state = {time};
  state2 = {date1: datetime};
  state3 = {active: false};

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      active: false
    }
  }

  handleChange = (time) => {
    console.log('Expample Date: ' + time);
    this.setState({time: time});
  };

  dateChange = (item, value) => {
    this.setState({...this.state2, [item]: value});
  };

  handleToggleDialog = () => {
    this.setState({active: !this.state.active});
  };
  handleToggleDateTime = () => {
    this.setState({active: !this.state3.active});
  };


  actions = [
    {label: "Cancel", onClick: this.handleToggleDialog},
    {label: "Save", onClick: this.handleToggleDialog},
    {label: "OK", onClick: this.handleToggleDateTime}
  ];


  fillfields(meetings) {
    console.log('Datos de user : ' + meetings);
    this.setState({data: meetings})
  }

  componentDidMount() {
    console.log('User: ' + this.props.user);
    axios.get('http://localhost:8080/meeting/meetingbyuser?username=' + this.props.user
    ).then(function (response) {
      this.fillfields(response.data)
    }.bind(this));
  }


  render() {
    let meetingmap = this.state.data;
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
              meetingTime = meetingmap[key].programmedDate;
              console.log('meeting:' + meetingTime);
              mt = Date.parse(meetingTime);
              dateTime = new Date(mt);
              console.log('meeting parse:' + mt);
              fullDate = dateTime.getFullYear() + '/' + dateTime.getDay() + '/' + dateTime.getHours();
              return (
                <div>
                  <ListItem
                    caption={meetingmap[key].topic}
                    legend={fullDate}
                    onClick={this.handleToggle}>
                  </ListItem>
                  <Dialog
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title={meetingmap[key].topic}>
                    <DatePicker label='Select date' sundayFirstDayOfWeek
                                onChange={this.dateChange.bind(this, 'date1')}
                                value={dateTime.getDate}/>
                    <TimePicker label='Select time'
                                onChange={this.handleChange}
                                value={dateTime.getHours()}/>
                  </Dialog>
                </div>
              )
                ;
            }
          )}
        </List>
      </div>

    )
  };
}


MymeetForm.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(MymeetForm);
