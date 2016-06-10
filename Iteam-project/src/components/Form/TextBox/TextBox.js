import React, {Component,PropTypes} from 'react';
// import classes from './RegistrationForm.scss'
import {FormControl} from 'react-bootstrap'
class TextBox extends Component {

  render(){
    return(
      <div className="form-group">
          <label className="control-label">{this.props.label}</label>
          <span className="input-group-btn"></span>
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
