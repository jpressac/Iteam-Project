/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from "react";


class ChatMessageForm extends Component {

  constructor(props){
    super(props);
    this.state={
      text:''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onMessageSubmit(this.state.text);
    this.setState({text: ''});
  }


  changeHandler(e) {
    this.setState({text: e.target.value});
  }


  render() {
    return (
      <div className='message_form'>
        <h3>Write New Message</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            onChange={this.changeHandler.bind(this)}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
}

ChatMessageForm.propTypes = {
  text: PropTypes.string
};

export default ChatMessageForm

