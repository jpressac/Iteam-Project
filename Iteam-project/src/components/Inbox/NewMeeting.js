/**
 * Created by Usuario on 05/02/2017.
 */

import React, {Component, PropTypes} from 'react';
import classes from './InboxStyle.scss';


class NewMeeting extends Component {

  dateToString() {
    var StringDate = new Date(this.props.time);
    return StringDate.toLocaleTimeString([], {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  showText() {
    return this.props.owner + " create/update the meeting " + this.props.topic
  }

  render() {
    return (
      <div>
        <div className={classes.msgRow}>
          <div class="col-md-6"><p className={classes.chatUsername}>{this.props.topic}</p></div>
          <div class="col-md-6"><p className={classes.p}>{this.dateToString()}</p></div>
        </div>
        <div><p>{this.showText()}</p></div>
      </div>
    );
  }
}

NewMeeting.propTypes = {
  topic: PropTypes.string,
  time: PropTypes.string,
  owner: PropTypes.string
};

export default NewMeeting
