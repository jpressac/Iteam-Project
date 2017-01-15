/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {IconButton, Button} from 'react-toolbox/lib/button';
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
      messages: props.meetingChatMessages != null ? props.meetingChatMessages.messages : [],
      text: '',
      expand: props.meetingChatMessages != null ? props.meetingChatMessages.size : true,
      expandButton: props.meetingChatMessages != null ? props.meetingChatMessages.expandButton : "expand_less",
      count: props.meetingChatMessages != null ? props.meetingChatMessages.count : 0,
      showLabel: props.meetingChatMessages != null ? props.meetingChatMessages.showLabel : false
    };
  }

  componentWillMount() {
    //Connect with socket
    initWebSocketChat();
    connectChat();
  }

  componentDidMount() {
    joinChat(this.props.meetingId, this.messageReceive.bind(this));
  }


  componentWillUnmount() {
    console.debug('chat size: ' + this.state.expand);
    //End socket connection
    console.debug('state: ' + this.state.messages);
    this.props.saveMeetingChatMessages({
      messages: this.state.messages,
      size: this.state.expand,
      showLabel: this.state.showLabel,
      count: this.state.count,
      expandButton: this.state.expandButton
    });
    disconnectChat();
  }

  messageReceive(payload) {

    let jsonPayload = JSON.parse(payload);
    console.debug('payload: ' + payload);

    var newmessage = this.state.messages;
    newmessage.push({
        user: jsonPayload.user,
        text: jsonPayload.text,
        time: jsonPayload.time
      }
    );
    this.setState({
      messages: newmessage,
      count: this.state.count + 1,
      showLabel: true
    });
    var element = document.getElementById("chatMessages");
    element.scrollTop = element.scrollHeight;
  }


  handleMessageSubmit(text, time) {
    var {messages} = this.state;
    sendMessageToChat(this.props.meetingId, this.props.user, text, time);
  }


  onChangeSize() {
    if (this.state.expand) {
      this.setState({
        expand: !this.state.expand,
        expandButton: "expand_less",
        count: 0,
        showLabel: false
      })
    }
    else {
      this.setState({
        expand: !this.state.expand,
        expandButton: "expand_more"
      })
    }
  }

  renderMinimize() {
    return (
      <div className={classes.chatContainer}>
        <div className={classes.msgWgtHeader}>CHAT
          <IconButton icon={this.state.expandButton} onClick={this.onChangeSize()}/>
          <label value={this.state.count}/>
        </div>
      </div>
    )
  }


  renderMaximize() {
    return (
      <div className={classes.chatContainer}>
        <div className={classes.msgWgtHeader}>CHAT</div>
        <IconButton icon={this.state.expandButton} onClick={this.onChangeSize.bind(this)}/>
        <MessageList
          messages={this.state.messages}
        />
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit.bind(this)}
        />
      </div>
    )
  }

  render() {
    if (this.state.expand) {
      return (
        <div className={classes.chatContainerMax}>
          <div className={classes.msgWgtHeaderMax} onClick={this.onChangeSize.bind(this)}>CHAT
            <IconButton icon={this.state.expandButton} style={{float: 'right'}} onClick={this.onChangeSize.bind(this)}/>
          </div>
          <MessageList
            messages={this.state.messages}
          />
          <MessageForm
            onMessageSubmit={this.handleMessageSubmit.bind(this)}
          />
        </div>
      )
    }
    if (!this.state.expand && this.state.showLabel) {
      return (
        <div className={classes.chatContainerMin}>
          <div className={classes.msgWgtHeaderMin} onClick={this.onChangeSize.bind(this)}>CHAT
            <IconButton icon={this.state.expandButton} style={{float: 'right'}} onClick={this.onChangeSize.bind(this)}/>
            <Button label={this.state.count} style={{background:'yellow', color:'black', float:'left'}} mini floating disabled/>
          </div>
        </div>
      )
    }
    return (
      <div className={classes.chatContainerMin}>
        <div className={classes.msgWgtHeaderMax} onClick={this.onChangeSize.bind(this)}>CHAT
          <IconButton icon={this.state.expandButton} style={{float: 'right'}} onClick={this.onChangeSize.bind(this)}/>
        </div>
      </div>
    )
  }

}

Chat.propTypes = {
  user: PropTypes.any,
  meetingId: PropTypes.string,
  meetingChatMessages: PropTypes.any,
  saveMeetingChatMessages: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
