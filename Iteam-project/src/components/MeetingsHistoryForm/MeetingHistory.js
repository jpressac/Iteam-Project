/**
 * Created by Randanne on 15/01/2017.
 */
import React, {Component, PropTypes}  from 'react';
import {connect} from 'react-redux';
import {MEETING} from '../../constants/HostConfiguration';
import axios from 'axios';
import MeetingCard from '../MeetingCard/MeetingCard';
import Input from "react-toolbox/lib/input";
import rootdiv from './formContainer.scss'

class MeetingHistory extends Component {

  constructor(props){
    super(props);
    this.state = {
      meetings:[]
    }
  }

  componentDidMount(){
    axios.get(MEETING.MEETING_ENDED).then(function(response){
    this.fillMeetings(response.data)
    }.bind(this));
  }

  fillMeetings(meetings){
    this.setState({meetings: meetings})
  }

  onChange(){

  }

  render(){
    return(
      <div >
        <Input type='text' label='Meeting name' value=""/>
        <MeetingCard endedMeetings={this.state.meetings}/>
      </div>
    )
  }
}

MeetingHistory.propTypes = {};

export default MeetingHistory;
