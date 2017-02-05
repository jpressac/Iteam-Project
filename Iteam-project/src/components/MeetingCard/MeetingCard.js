/**
 * Created by Randanne on 15/01/2017.
 */
import React, {Component, PropTypes}  from 'react';
import {connect} from "react-redux";
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import {Button} from "react-toolbox/lib/button";
import {updateMeetingId} from "../../redux/reducers/Meeting/MeetingReducer";
import  card from './Card.scss'
import divCss from '../MeetingsHistoryForm/formContainer.scss'

const mapDispatchToProps = (dispatch) => ({
  updateMyMeetingId: (meetingId) => dispatch(updateMeetingId(meetingId))
});

class MeetingCard extends Component {

  constructor(props) {
    super(props);
  }

  static renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
  }

  viewReports(meetingId){
    this.props.updateMyMeetingId(meetingId);
  }

  deleteMeeting(id){
    console.log('deleting meeting' + id)
  }

  render() {
    let meetings = this.props.endedMeetings;
    return (
      <div className={divCss.cardsdiv}>
        {Object.keys(meetings).map((key) => {
        return (
        <Card theme={card}>
          <CardTitle className="col-md-3" title='Name' subtitle={meetings[key].topic}/>
          <CardTitle className ="col-md-3" title='Organizer' subtitle={meetings[key].ownerName}/>
          <CardTitle className ="col-md-3" title='Date' subtitle={MeetingCard.renderDate(meetings[key].endDate)}/>
          <CardActions className="col-md-3">
            <Button label="View reports" onClick={this.viewReports.bind(this, meetings[key].id)}/>
          </CardActions>
          <CardTitle className ="col-md-12" title='Description'  subtitle={meetings[key].description}/>
        </Card>
        );
        })
        }
      </div>);
  }
}
 MeetingCard.propTypes = {
    endedMeetings: PropTypes.any
};

export default connect(null,mapDispatchToProps)(MeetingCard);
