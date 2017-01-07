/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import MessageForm from './ChatMessageForm'
import MessageList from './ChatMessageList'
import {joinChat, connectChat, initWebSocketChat, sendMessageToChat} from '../../websocket/websocket';


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      meetingId: state.meetingReducer.meetingId
    }
  }
};


class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      text: ''
    };
  }


  componentDidMount() {
    //Connect with socket
    console.debug('chat component did mount');
    initWebSocketChat();
    connectChat();
    joinChat(this.props.meetingId, this.messageRecieve.bind(this) )

  }


  messageRecieve(payload) {

    let jsonPayload = JSON.parse(payload);
    console.debug('payload: ' + payload);

    var {messages} = this.state;
    messages.push({
        user: jsonPayload.user,
        text: jsonPayload.text
      }
    );
    this.setState({messages});
  }


  handleMessageSubmit(text) {
    var {messages} = this.state;
    sendMessageToChat(this.props.meetingId, this.props.user, text);
  }


  render() {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
        />
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit.bind(this)}
        />
      </div>
    );
  }

}

Chat.propTypes = {
  user: PropTypes.any,
  meetingId: PropTypes.string
};

export default connect(mapStateToProps)(Chat)
