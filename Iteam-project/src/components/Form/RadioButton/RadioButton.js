import React, {Component,PropTypes} from 'react';
// import classes from './RegistrationForm.scss'
class RadioButton extends Component {

  render(){
    return(
      <div class="form-group">
            <label class="control-label">{this.props.label}</label>
            <input class="form-control" type="radio" name={this.props.groupName} value={this.props.label}></input>
            <span class="input-group-btn"></span>
      </div>
    )
  }
}
//TODO saque {this.props.label} de adentro de input porque dice que no puede tener children
RadioButton.propTypes ={
  groupName: PropTypes.string,
  label: PropTypes.string
}

export default RadioButton
