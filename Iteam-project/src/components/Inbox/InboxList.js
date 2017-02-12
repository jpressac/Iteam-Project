import React, {Component, PropTypes} from 'react';
import Meeting from './NewMeeting'
import classes from './InboxStyle.scss';
import {updateMeetingsViewed} from '../../utils/actions/meetingActions'

class InboxList extends Component {

  componentWillUnmount() {
    console.debug(this.props.meetings);
    updateMeetingsViewed(this.props.meetings);
  }

  renderMeetings(){
    console.debug('inbox list meetings: ' + this.props.meetings);
    if(this.props.meetings != ''){
      return this.props.meetings.map((meeting, i) => {
        return (
          <Meeting
            key={i}
            topic={meeting.meetingTopic}
            time={meeting.time}
          />
        );
      })
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
