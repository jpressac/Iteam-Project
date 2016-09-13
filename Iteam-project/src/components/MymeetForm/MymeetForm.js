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

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };


  actions = [
    {label: "Cancel", onClick: this.handleToggle},
    {label: "Save", onClick: this.handleToggle}
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
    let dateTime= new Date;
    let fullDate;
    return (
      <div className={"container"}>
        <div className={classes.label}>
          <label>MY MEETINGS</label>
        </div>
        <List selectable ripple>
          {Object.keys(meetingmap).map((key) => {
            meetingTime= meetingmap[key].programmedDate;
            console.log('meeting:' + meetingTime);
            mt = Date.parse(meetingTime);
            dateTime = new Date(mt);
            console.log('meeting parse:' + mt);
            fullDate= dateTime.getFullYear() + '/' + dateTime.getDay() +'/' + dateTime.getHours();
              return (
                <div>
                  <ListItem
                    caption={meetingmap[key].topic}
                    legend= {fullDate}
                    onClick={this.handleToggle}>
                  </ListItem>
                  <Dialog
                    actions={this.actions}
                    active={this.state.active}
                    onEscKeyDown={this.handleToggle}
                    onOverlayClick={this.handleToggle}
                    title={meetingmap[key].topic}>
                    <Input type='text' label='Date' name='Date' value={dateTime.getDate()} />
                    <label>Time</label>
                    <p></p>
                  </Dialog>
                </div>
              );
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
