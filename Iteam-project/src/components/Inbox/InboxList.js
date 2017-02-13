import React, {Component, PropTypes} from 'react';
import Meeting from './NewMeeting'
import classes from './InboxStyle.scss';
import {updateMeetingsViewed} from '../../utils/actions/meetingActions'

class InboxList extends Component {

  componentWillUnmount() {
    if (this.props.meetings.length != 0) {
      updateMeetingsViewed(this.props.meetings);
    }
  }

  renderMeetings(){
    if(this.props.meetings != ''){
      return this.props.meetings.map((meeting, i) => {
        return (
          <Meeting
            key={i}
            topic={meeting.meetingTopic}
            time={meeting.time}
            owner={meeting.viewedUsers[0]}
          />
        );
      })
    }
    else{
      return(
        <b><p className={classes.p}>NO UPDATES</p></b>
      )
    }
  }

  render() {
    return (
      <div id="inboxList" className={classes.messageList}>
        {this.renderMeetings()}
      </div>
    );
  }
}

InboxList.propTypes = {
  meetings: PropTypes.any
};


export default InboxList
