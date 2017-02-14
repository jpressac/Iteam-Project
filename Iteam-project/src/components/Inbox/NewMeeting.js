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
      <div className={classes.inboxConteiner}>
        <div className="row classes.msgRow">
          <div className={"col-md-6 classes.chatUsername"}>{this.props.topic}</div>
          <div className={"col-md-6 classes.msgTime"}>{this.dateToString()}</div>
        </div>
        <div className="row">
          <div className="col-md-12"><p>{this.showText()}</p></div>
        </div>
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
