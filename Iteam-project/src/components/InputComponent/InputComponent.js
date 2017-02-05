import React, {PropTypes} from 'react'
import Input from "react-toolbox/lib/input";
import themeLabel from "./labelInput.scss";


class InputComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  renderInput() {
    if (!this.props.disable) {
      return (
        <div className={this.props.className}>
          <Input type={this.props.type} label={this.props.label} theme={themeLabel}
                 name={this.props.name} required={this.props.required}
                 value={this.props.value} onChange={this.props.onValueChange} error={this.props.onValueError}
                 onBlur={this.props.onBlur} maxLength={this.props.maxLength} min={this.props.minValue}/>
        </div>
      )
    } else {
      return (
        <div className={this.props.className}>
          <Input type={this.props.type} label={this.props.label} disabled theme={themeLabel} name={this.props.name}
                 required={this.props.required}
                 value={this.props.value} onChange={this.props.onValueChange} error={this.props.onValueError}
                 onBlur={this.props.onBlur} maxLength={this.props.maxLength}/>
        </div>
      )
    }
  }

  render() {
    return (
      this.renderInput()
    )
  }
}

InputComponent.propTypes = {
  disable: PropTypes.bool,
  className: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  onValueError: PropTypes.string,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minValue: PropTypes.string
};

export default InputComponent
