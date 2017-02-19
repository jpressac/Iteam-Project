import React, {PropTypes, Component} from 'react'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import theme from './theme.scss'

class AutocompleteComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue,
      disabled: props.disabled != null ? props.disabled : false
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

  render() {
    return (
      <Autocomplete theme={theme} direction="down" selectedPosition="none" suggestionMatch="anywhere" multiple={false}
                    onChange={this.handleChange.bind(this, 'value')} label={this.props.label} source={this.props.source}
                    value={this.state.value} disabled={this.state.disabled}/>
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
