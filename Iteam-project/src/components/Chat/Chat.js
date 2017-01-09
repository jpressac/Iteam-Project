/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import MessageForm from './ChatMessageForm'
import MessageList from './ChatMessageList'
import {joinChat, connectChat, initWebSocketChat, sendMessageToChat, disconnectChat} from '../../websocket/websocket';
import classes from './ChatStyle.scss';
import {saveMeetingChats} from '../../redux/reducers/Meeting/MeetingChatMessagesReducer';


const mapDispatchToProps = dispatch => ({
  saveMeetingChatMessages: (messages) => dispatch(saveMeetingChats(messages))
});


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      meetingId: state.meetingReducer.meetingId,
      meetingChatMessages: state.meetingChatMessagesReducer
    }
  }
};

const StringDate = new Date();


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
    console.debug('chat messages: ' + this.props.meetingChatMessages);
    initWebSocketChat();
    connectChat();
    joinChat(this.props.meetingId, this.messageRecieve.bind(this));
    if (this.props.meetingChatMessages != null) {
      this.setState({messages: this.props.meetingChatMessages})
    }

  }

  componentWillUnmount() {
    //End socket connection
    console.debug('state: ' + this.state.messages);
    //this.props.saveMeetingChatMessages(this.state.messages);
    disconnectChat();
  }

  messageRecieve(payload) {

    let jsonPayload = JSON.parse(payload);
    console.debug('payload: ' + payload);

    var {messages} = this.state;
    messages.push({
        user: jsonPayload.user,
        text: jsonPayload.text,
        time: jsonPayload.time
      }
    );
    this.setState({messages});
    this.props.saveMeetingChatMessages(this.state.messages);
    var element = document.getElementById("chatMessages");
    element.scrollTop = element.scrollHeight;
  }


  handleMessageSubmit(text, time) {
    var {messages} = this.state;
    sendMessageToChat(this.props.meetingId, this.props.user, text, time);
  }


  render() {
    return (
      <div id="chatMessages" className={classes.chatContainer}>
        <div className={classes.msgWgtHeader}>CHAT</div>
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
  meetingId: PropTypes.string,
  meetingChatMessages: PropTypes.any,
  saveMeetingChatMessages: PropTypes.any,
  onChangeBoard:PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
