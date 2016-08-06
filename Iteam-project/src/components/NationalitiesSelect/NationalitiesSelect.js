import React from 'react';
import {getNationalities} from '../../redux/RegistrationForm/actions.js'
import axios from 'axios'
class NationalitiesSelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      options:[ ]
    }
  }
  componentDidMount() {
    // get nationalities
    var _this = this;
    _this.serverFetch = axios.get('http://localhost:8080/utilities/nationality/get').then(function(response){
    const nationalities = response.data.nationalities;
    _this.successHandler(nationalities);
    _this._select.focus();
  })
}
  successHandler(data) {
    var opt = [];
    data.map(function(option, index){
      opt.push(
        <option key={index} value={option}>{option}</option>
    );
   });
   console.log(opt);
   this.setState({options: opt});
   this.forceUpdate();
  }

  render() {

      return (
          <select className="form-control" ref={(c) => this._select = c} onChange={this.props.onchange}>
            <option value="" default>Choose a nationality</option>
            {this.state.options}
          </select>
      )
  }
}
NationalitiesSelect.propTypes = {
  onchange: React.PropTypes.func
}
  export default NationalitiesSelect
