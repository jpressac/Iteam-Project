/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from "react";


class ChatMessage extends Component{

  render() {
    return (
      <div className="message">
        <strong>{this.props.user} :</strong>
        <span>{this.props.text}</span>
      </div>
    );
  }
}

ChatMessage.propTypes = {
  user: PropTypes.any,
  text: PropTypes.string
};

export default ChatMessage
