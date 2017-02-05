/**
 * Created by Randanne on 15/01/2017.
 */
import React, {Component, PropTypes}  from 'react';
import {connect} from 'react-redux';
import {MEETING} from '../../constants/HostConfiguration';
import axios from 'axios';
import MeetingCard from '../MeetingCard/MeetingCard';
import InputComponent from "../InputComponent/InputComponent"
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import ReactPagination from 'react-paginate'

const ITEMS_PER_PAGE = 10;

class MeetingHistory extends Component {

  constructor(props){
    super(props);
    this.state = {
      meetings:[],
      searchField: '',
      offset: 0,
      totalMeetings: 0,
      totalPages: 0
    }
  }

  componentDidMount(){
    this.loadMeetings();
  }

  calculateTotalPages(){
    let total = Math.ceil(this.state.totalMeetings / ITEMS_PER_PAGE);
    this.setState({totalPages: total});
  }

  fillMeetings(data){
    this.setState({
      meetings: data.meetings,
      totalMeetings:data.total
    }, () => {
      this.calculateTotalPages();
    })
  }

  handleChange = (token) =>{
    this.setState({searchField: token})
  }

  searchByToken(){
    if ( this.state.searchField.length != 0 ) {
      axios.get(MEETING.MEETING_SEARCH_HISTORY, {
        params: {
          token: this.state.searchField,
          offset: this.state.offset,
          limit: ITEMS_PER_PAGE
        }
      }).then(function (response) {
        this.fillMeetings(response.data)
      }.bind(this))
    }
    else {
      this.loadMeetings();
    }
  }

  handlePageClick =(data) =>{
    let actualPageNumber = data.selected;
    let offset = Math.ceil(actualPageNumber * ITEMS_PER_PAGE);

    this.setState({offset:offset}, () => {
      this.loadMeetings();
    });
  };

  loadMeetings(){
    axios.get(MEETING.MEETING_PAGINATED,{
      params: {
        offset: this.state.offset,
        limit: ITEMS_PER_PAGE
      }
    }) .then(function(response){
      this.fillMeetings(response.data);
    }.bind(this))
  }

  render(){
    return(
      <div className="container">
          <div>
            <InputComponent className="col-md-8" label='Meeting name' value={this.state.searchField} onValueChange={this.handleChange.bind(this)}/>
            <ButtonComponent  className="col-md-4"onClick={this.searchByToken.bind(this)} value="Search"/>
          </div>
          <div className="col-md-12">
            <MeetingCard endedMeetings={this.state.meetings}/>
          </div>
          <div className="col-md-12">
            <ReactPagination previousLabel={"previous"}
                           nextLabel={"next"}
                           pageCount={this.state.totalPages}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           initialPage ={1}
                           disableInitialCallback={true}
            />
          </div>
      </div>
    )
  }
}

MeetingHistory.propTypes = {};

export default MeetingHistory;
