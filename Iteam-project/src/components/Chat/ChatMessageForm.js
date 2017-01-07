/**
 * Created by Usuario on 02/01/2017.
 */

import React, {Component, PropTypes} from 'react';
import classes from './ChatStyle.scss';

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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className={classes.input} maxLength="140"
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

