/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from "react";
import Message from './ChatMessage'

class ChatMessageList extends Component {

  render() {
    return (
      <div className='messages'>
        <h2> Conversation: </h2>
        {
          this.props.messages.map((message, i) => {
            return (
              <Message
                key={i}
                user={message.user}
                text={message.text}
              />
            );
          })
        }
      </div>
    );
  }
}

ChatMessageList.propTypes = {
  messages: PropTypes.any
};


export default ChatMessageList
