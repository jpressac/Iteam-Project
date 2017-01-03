/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from "react";
import MessageForm from './ChatMessageForm'
import MessageList from './ChatMessageList'


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};



class Chat extends Component{

  getInitialState() {
    return {users: [], messages:[], text: ''};
  }

  componentDidMount() {
    socket.on('init', this._initialize);
    socket.on('send:message', this._messageRecieve);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
  }

  _initialize(data) {
    var {users, name} = data;
    this.setState({users, user: name});
  }

  _messageRecieve(message) {
    var {messages} = this.state;
    messages.push(message);
    this.setState({messages});
  }

  _userJoined(data) {
    var {users, messages} = this.state;
    var {name} = data;
    users.push(name);
    messages.push({
      user: this.props.user,
      text : ' Joined'
    });
    this.setState({users, messages});
  }

  _userLeft(data) {
    var {users, messages} = this.state;
    var {name} = data;
    var index = users.indexOf(name);
    users.splice(index, 1);
    messages.push({
      user: 'APPLICATION BOT',
      text : name +' Left'
    });
    this.setState({users, messages});
  }


  handleMessageSubmit(message) {
    var {messages} = this.state;
    messages.push(message);
    this.setState({messages});
    socket.emit('send:message', message);
  }


  render() {
    return (
      <div>
        <MessageList
          messages={this.state.messages}
        />
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          user={this.props.user}
        />
      </div>
    );
  }

}

Chat.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(Chat)
