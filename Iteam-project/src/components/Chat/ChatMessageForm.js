/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from "react";


class ChatMessageForm extends Component {

  handleSubmit(e) {
    e.preventDefault();
    var message = {
      user: this.props.user,
      text: this.props.text
    };
    this.props.onMessageSubmit(message);
    this.setState({text: ''});
  }


  changeHandler(e) {
    this.setState({text: e.target.value});
  }


  render() {
    return (
      <div className='message_form'>
        <h3>Write New Message</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.changeHandler}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

ChatMessageForm.propTypes = {
  user: PropTypes.any,
  text: PropTypes.string,
  onMessageSubmit: PropTypes.func
};

export default ChatMessageForm

