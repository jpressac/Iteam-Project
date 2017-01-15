/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import Message from './ChatMessage'
import classes from './ChatStyle.scss'

class ChatMessageList extends Component {

  renderMessages(){
    if(this.props.messages != ''){
      return this.props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            user={message.user}
            text={message.text}
            time={message.time}
          />
        );
      })
    }
  }

  render() {
    return (
        <div id="chatMessages" className={classes.messageList}>
          {this.renderMessages()}
        </div>
    );
  }
}

ChatMessageList.propTypes = {
  messages: PropTypes.any
};


export default ChatMessageList
