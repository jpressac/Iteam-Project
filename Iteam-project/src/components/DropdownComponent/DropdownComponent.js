import React, {PropTypes} from 'react'
import Dropdown from 'react-toolbox/lib/dropdown';
import dropdownLabel from './dropdownLabel.scss';

class DropdownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      value: '',
      source: []
    }
  }

  componentWillMount() {
    this.setValueOptions(this.props.source)
  }

  initialCombo(opt) {
    let filteredLabelObject = opt.filter(filter => filter["label"] == this.props.initialValue);

    if (filteredLabelObject.length > 0) {
      this.setState({value: filteredLabelObject[0]["value"], label: filteredLabelObject[0]["label"]})
    }
  }

  changeValueCombo(value) {
    let filteredLabelObject = this.state.source.filter(filter => filter["value"] == value);

    this.props.onValueChange(filteredLabelObject[0]["label"]);

    this.setState({value: value, label: filteredLabelObject[0]["label"]});
  }


  setValueOptions(data) {
    console.log(data)
    let opt = data.map(function (option, index) {
      let rObj = {};
      rObj["value"] = index;
      rObj["label"] = option;
      return rObj;
    });

    this.initialCombo(opt);

    this.setState({source: opt});
  }

  render() {
    return (
      <Dropdown label={this.props.label} auto theme={dropdownLabel}
                onChange={this.changeValueCombo.bind(this)} required
                source={this.state.source} value={this.state.value}
      />
    );
  }
}

DropdownComponent.propTypes = {
  label: PropTypes.string,
  source: PropTypes.any,
  initialValue: PropTypes.string,
  onValueChange: PropTypes.func
};

export default DropdownComponent
