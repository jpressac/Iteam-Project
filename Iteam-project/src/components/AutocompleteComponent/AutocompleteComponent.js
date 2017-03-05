import React, {PropTypes, Component} from 'react'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import theme from './theme.scss'
import {validateExistenceField} from '../../utils/validationUtils'


class AutocompleteComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue,
      disabled: props.disabled != null ? props.disabled : false,
      error:''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled != nextProps.disabled) {
      this.setState({disabled: nextProps.disabled})
    }
  }

  handleChange(key, value) {
    this.props.onValueChange(value)
    this.setState({[key]: value})
  }

  handleError() {
    var sourceArray = this.props.source;
    if (validateExistenceField(sourceArray, this.state.value)) {
      this.setState({error: ''});
    }
    else {
      this.setState({error: '¡You have to select at least one option!'});
    }
  }

  render() {
    return (
      <Autocomplete theme={theme} direction="down" selectedPosition="below" suggestionMatch="anywhere" multiple={false}
                    onChange={this.handleChange.bind(this, 'value')} label={this.props.label} source={this.props.source}
                    value={this.state.value} disabled={this.state.disabled}
                    error={this.state.error} onBlur={this.handleError.bind(this)}/>
    )
  }
}

AutocompleteComponent.propTypes = {
  onValueChange: PropTypes.func,
  label: PropTypes.string,
  source: PropTypes.any,
  initialValue: PropTypes.string,
  disabled: PropTypes.bool
}

export default AutocompleteComponent
