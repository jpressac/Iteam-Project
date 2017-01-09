/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import classes from './ChatStyle.scss';


class ChatMessage extends Component{

  dateToString(){
    var StringDate=new Date(this.props.time);
    return StringDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }

  render() {
    return (
      <div className={classes.msgRowContainer}>
        <div className={classes.msgRow}>
          <span className={classes.userLabel}>
            <a className={classes.chatUsername}>{this.props.user} </a>
            <span className={classes.msgTime}>{this.dateToString()}</span>
          </span><br/>
          <p className={classes.p}>{this.props.text}</p><br/>
        </div>
      </div>
    );
  }
}

ChatMessage.propTypes = {
  user: PropTypes.any,
  text: PropTypes.string,
  time:PropTypes.any
};

export default ChatMessage
