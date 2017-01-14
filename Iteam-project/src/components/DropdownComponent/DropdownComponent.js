import React, {PropTypes} from 'react'
import Dropdown from 'react-toolbox/lib/dropdown';
import dropdownLabel from './dropdownLabel.scss';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => ({
  saveToReducer: (func,value) => dispatch(func(value))
});

class DropdownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      value: '',
      source: [],
      initialValue: ''
    }
  }

  componentWillMount() {
    this.setValueOptions(this.props.source)
  }

  initialCombo(opt) {
    let filteredLabelObject = opt.filter(filter => filter["label"] == this.props.initialValue);

    if (filteredLabelObject.length > 0) {
      this.props.saveToReducer(this.props.saveValue, filteredLabelObject[0]["label"]);
      this.setState({value: filteredLabelObject[0]["value"], label: filteredLabelObject[0]["label"]})
    }
  }

  changeValueCombo(value) {
    let filteredLabelObject = this.state.source.filter(filter => filter["value"] == value);

    this.props.saveToReducer(this.props.saveValue, filteredLabelObject[0]["label"]);

    this.setState({value: value, label: filteredLabelObject[0]["label"]});
  }


  setValueOptions(data) {
    console.log("set value options");
    console.log(data);
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
  saveValue: PropTypes.func,
  saveToReducer: PropTypes.func
};

export default connect(null, mapDispatchToProps)(DropdownComponent)
