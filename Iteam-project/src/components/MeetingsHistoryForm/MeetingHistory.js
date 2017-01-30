/**
 * Created by Randanne on 15/01/2017.
 */
import React, {Component, PropTypes}  from 'react';
import {connect} from 'react-redux';
import {MEETING} from '../../constants/HostConfiguration';
import axios from 'axios';
import MeetingCard from '../MeetingCard/MeetingCard';
import Input from "react-toolbox/lib/input"
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import ReactPagination from 'react-paginate'

class MeetingHistory extends Component {

  constructor(props){
    super(props);
    this.state = {
      meetings:[],
      searchField: ''
    }
  }

  componentDidMount(){
    this.getEndedAllMeetings();
  }

  getEndedAllMeetings(){
    axios.get(MEETING.MEETING_ENDED).then(function(response){
      this.fillMeetings(response.data)
    }.bind(this));
  }
  fillMeetings(meetings){
    this.setState({meetings: meetings})
  }

  handleChange = (token) =>{
    this.setState({searchField: token})
  }

  searchByToken(){
    if ( this.state.searchField.length != 0 ) {
      axios.get(MEETING.MEETING_SEARCH_HISTORY, {
        params: {
          token: this.state.searchField
        }
      }).then(function (response) {
        this.fillMeetings(response.data)
      }.bind(this))
    }
    else {
      this.getEndedAllMeetings();
    }
  }

  calculatePageCount(){
    totalMeetings = this.state.meetings.length;
    pageLimit = 10;
    totalPages= totalMeetings / 10;
  }

  render(){
    return(
      <div>
        <div>
          <Input type='text' label='Meeting name' value={this.state.searchField} onChange={this.handleChange.bind(this)}/>
          <ButtonComponent  onClick={this.searchByToken.bind(this)} value="Search"/>
        </div>
          <MeetingCard endedMeetings={this.state.meetings}/>
          <ReactPagination previousLabel={"previous"}
                           nextLabel={"next"}
                            />
      </div>
    )
  }
}

MeetingHistory.propTypes = {};

export default MeetingHistory;
