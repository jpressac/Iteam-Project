import React, {Component,PropTypes} from 'react';
// import classes from './RegistrationForm.scss'
class TextBox extends Component {

  render(){
    return(
      <div class="form-group">
          <label class="control-label">{this.props.label}</label>
          <span class="input-group-btn"></span>
          <input class="form-control" type="text" placeholder={this.props.label}></input>
      </div>
    )
  }
}

TextBox.propTypes ={
  label: PropTypes.string
}

export default TextBox
