import React, {Component,PropTypes} from 'react';
// import classes from './RegistrationForm.scss'
class RadioButton extends Component {

  render(){
    return(
      <div class="form-group">
            <label class="control-label">{this.props.label}</label>
            <input class="form-control" type="radio" name={this.props.groupName} value={this.props.label}>{this.props.label}</input>
            <span class="input-group-btn"></span>
      </div>
    )
  }
}

RadioButton.propTypes ={
  groupName: PropTypes.string,
  label: PropTypes.string
}

export default RadioButton
