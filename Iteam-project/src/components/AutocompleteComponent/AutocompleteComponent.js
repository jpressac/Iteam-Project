import React, {PropTypes, Component} from 'react'
import Autocomplete from 'react-toolbox/lib/autocomplete'
import theme from './theme.scss'

class AutocompleteComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue
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
                    value={this.state.value}/>
    )
  }
}

AutocompleteComponent.propTypes = {
  onValueChange: PropTypes.func,
  label: PropTypes.string,
  source: PropTypes.any,
  initialValue: PropTypes.string
}

export default AutocompleteComponent
