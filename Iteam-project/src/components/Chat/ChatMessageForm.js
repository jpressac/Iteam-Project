/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import classes from './ChatStyle.scss';
import Input from 'react-toolbox/lib/input';


class ChatMessageForm extends Component {

  constructor(props){
    super(props);
    this.state={
      text:''
    }
  }

  handleSubmit(e) {
    if(this.state.text != '')
    e.preventDefault();
    this.props.onMessageSubmit(this.state.text, Date.now());
    this.setState({text: ''});
  }


  changeHandler(e) {
    this.setState({text: e.target.value});
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Input type='text' multiline hint='Type your message here'
                 className={classes.input}
                 maxLength={140} value={this.state.text}
                 onChange={this.changeHandler.bind(this)} />
        </form>
      </div>
    );
  }
}

ChatMessageForm.propTypes = {
  text: PropTypes.string
};

export default ChatMessageForm

