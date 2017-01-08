import React, {PropTypes} from 'react'
import Dropdown from 'react-toolbox/lib/dropdown';
import dropdownLabel from './dropdownLabel.scss';

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

  initialComboProfession(opt) {
    console.log("intial combo");
    console.log(opt);

    let filteredLabelObject = opt.filter(filter => filter["label"] == this.props.initialValue);

    console.log("filtered combo");
    console.log(filteredLabelObject);

    if (filteredLabelObject.length > 0) {
      this.setState({value: filteredLabelObject[0]["value"], label: filteredLabelObject[0]["label"]})
    }
  }

  comboProfession(value) {
    console.log("combo profession");
    console.log(value);
    let filteredLabelObject = this.state.source.filter(filter => filter["value"] == value);

    this.setState({value: value, label: filteredLabelObject[0]["label"]})
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

    this.initialComboProfession(opt);

    this.setState({source: opt});
  }

  render() {
    return (
      <Dropdown label={this.props.label} auto theme={dropdownLabel}
                onChange={this.comboProfession.bind(this)} required
                source={this.state.source} value={this.state.value}/>
    );
  }

}

DropdownComponent.propTypes = {
  label: PropTypes.string,
  source: PropTypes.any,
  initialValue: PropTypes.string
};

export default DropdownComponent
