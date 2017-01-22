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
              <CardTitle title={'Name'+ ' ' + meetings[key].topic}/>
              <CardTitle title={'Description' + ' ' + meetings[key].description}/>
              <CardTitle title={'Organizer' + ' ' +  meetings[key].ownerName}/>
              <CardTitle title={'Ending date' + ' ' + MeetingCard.renderDate(meetings[key].endDate)}/>
              <CardActions>
                <Button label="View reports" onClick={this.viewReports.bind(this, meetings[key].id)}/>
                <Button label="Delete" onClick={this.deleteMeeting(meetings[key].id)} />
              </CardActions>
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
