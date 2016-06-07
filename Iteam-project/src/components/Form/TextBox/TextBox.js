import React, {Component,PropTypes} from 'react';
// import classes from './RegistrationForm.scss'
import {FormControl} from 'react-bootstrap'
class TextBox extends Component {

  render(){
    return(
      <div class="form-group">
          <label class="control-label">{this.props.label}</label>
          <span class="input-group-btn"></span>
          <FormControl  type={this.props.type} placeholder={this.props.label}></FormControl>
      </div>
    )
  }
}

TextBox.propTypes ={
  label: PropTypes.string,
  type: PropTypes.string
}

export default TextBox
