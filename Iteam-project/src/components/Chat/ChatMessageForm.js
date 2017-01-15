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
    if(this.state.text != '' && e.which==13) {
      e.preventDefault();
      this.props.onMessageSubmit(this.state.text, Date.now());
      this.setState({text: ''});
    }
  }


  changeHandler(e) {
    this.setState({text: e.target.value});
  }


  render() {
    return (
      <div>
          <textarea
            type="text"
            className={classes.input} maxLength="200"
            onChange={this.changeHandler.bind(this)}
            value={this.state.text}
            onKeyPress={this.handleSubmit.bind(this)}
          />
      </div>
    );
  }
}

ChatMessageForm.propTypes = {
  text: PropTypes.string
};

export default ChatMessageForm

