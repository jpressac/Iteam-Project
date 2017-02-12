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

  render() {
    return (
      <div className={classes.msgRow}>
        <p className={classes.chatUsername}>{this.props.topic}</p>
        <p className={classes.p}>{this.dateToString()}</p>
      </div>
    );
  }
}

NewMeeting.propTypes = {
  topic: PropTypes.string,
  time: PropTypes.string
};

export default NewMeeting
