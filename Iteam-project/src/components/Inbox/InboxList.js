/**
 * Created by Usuario on 05/02/2017.
 */

import React, {Component, PropTypes} from 'react';
import Meeting from './NewMeeting'
import classes from './InboxStyle.scss';

class InboxList extends Component {

  renderMeetings(){
    console.debug('meetings: ' + this.props.meetings);
    if(this.props.meetings != ''){
      return this.props.meetings.map((meeting, i) => {
        return (
          <Meeting
            key={i}
            topic={meeting.topic}
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
