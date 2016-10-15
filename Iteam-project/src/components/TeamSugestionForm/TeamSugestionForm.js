import React, {PropTypes} from 'react';
import classes from './TeamSugestionForm.scss';
import axios from 'axios';
import BootstrapModal from '../BootstrapModal';
import {connect} from 'react-redux';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import {Button, IconButton} from 'react-toolbox/lib/button';

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.name
    }
  }
};
const filtro = [
  { value: 1, label: 'Profession' },
  { value: 2, label: 'Age'},
  { value: 3, label: 'Nationality' },
  { value: 4, label: 'Job position'},
  { value: 5, label: 'Hobbies'}

];

class TeamSugestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      filters: [],
      users: [],
      selectedUsers: [],
      usernames: {},
      values: [],
      message: ''
    }
  }

  handleClick(event) {
    if ((this.refs.filterName.value !== '') && (this.refs.filterValue.value !== '')) {
      let valueFields = [];
      valueFields.push(this.refs.filterValue.value);
      this.state.filters.push({field: (this.refs.filterName.value).toLowerCase(), values: valueFields});
      console.log(this.state);
      this.forceUpdate();
    }
  }

  handleOnChange(username) {
    var _this = this;
    let newMap = {};
    newMap = _this.state.usernames;
    if (newMap[username] == false) {
      newMap[username] = true;
    } else {
      newMap[username] = false;
    }
    this.setState({usernames: newMap});
    console.log(_this.state.usernames);
    console.log(this.state.users);
    _this.forceUpdate();
  }

  //TODO: use a set<string> for filling the table with columns that details the filter applied

  searchUsers() {
    var _this = this;
    if (this.state.filters.length >= 0) {
      axios.get('http://localhost:8080/team/select',
        {
          params: {filter: JSON.stringify(this.state.filters)}
        }).then(function (response) {
        console.log(response.data);
        _this.fillUsersTable(response.data);
      }).catch(function (response) {
        console.log(response.error);
      });
    }
  }

  createMeeting() {
    let usersMap = this.state.usernames;
    let selected = [];
    debugger
    for (let user in usersMap) {
      if (usersMap[user] == true) {
        selected.push(user);
      }
    }
    if ((selected.length > 0) && (this.refs.teamName.value !== '')) {
      axios.post('http://localhost:8080/team/create', {
        ownerName: this.props.user,
        name: this.refs.teamName.value,
        members: selected
      }).then(function (response) {
        console.log(response.status);
        this.setState({message: '¡Your team was successfully created!'});
        this.refs.mymodal.openModal();
      }.bind(this)).catch(function (response) {
        console.log(response.status);
      })
    }
  }

  validateBeforeCreation() {

    if (this.refs.teamName === '') {
      //required field add to modal error
    }
  }

  deleteFilter(pos) {
    let newFilters = this.state.filters;
    newFilters.map(function (filter, index) {
      if (pos === index) {
        newFilters.splice(index, 1);
      }

    })
    this.setState({filters: newFilters});
    this.searchUsers();
    this.forceUpdate();
  }

  fillUsersTable(data) {
    var _this = this;
    let us = [];
    let names = {};
    debugger
    data.map(function (user, index) {
      us.push(
        <tr key={us.length}>
          <td><input className="no-margin" type="checkbox"
                     onChange={_this.handleOnChange.bind(_this, user.username)}></input></td>
          <td>{user.lastName}</td>
          <td>{user.name}</td>
        </tr>
      );
      names[user.username] = false;
    });
    this.setState({users: us});
    this.setState({usernames: names});
    this.forceUpdate();
  }

  fillFilterValues(value) {
    const filter = this.state.value;
    let url = '';
    switch (filter) {
      case "Profession":
        url = 'http://localhost:8080/utilities/professions';
        break;
      case "Age":
        break;
      case "Nationality":
        url = 'http://localhost:8080/utilities/nationality/get';
        break;
      case "Job position":
        break;
      case "Hobbies":
        break;
    }
    this.setState({value: value});
    if (url !== '') {
      axios.get(url).then(function (response) {
        console.log(response.data);
        this.setValuesOptions(response.data);
        this.forceUpdate();
      }.bind(this));
    }
  }

  setValuesOptions(data) {
    var opt = [];
    data.map(function (option, index) {
      opt.push(
        <option key={index} value={option}>{option}</option>
      );
    });
    this.setState({values: opt});
    this.forceUpdate();
  }

  handleChange = (teamName, value) => {
    this.setState({...this.state, [teamName]: value});
  };

  render() {
    var filterLabels = this.state.filters.map(function (filter, index) {
      return (
        <span className="tag label label-info" style={{fontSize:14, margin:10, marginTop:50}}>
                <span key={index}>{filter.field} : {filter.values}</span>
                <a href='javascript:;' onClick={this.deleteFilter.bind(this,index)}><i
                  className="remove glyphicon glyphicon-remove-sign glyphicon-white"></i></a>
              </span>
      );
    }.bind(this));
    return (
      <form className="form-horizontal">
        <div className="row">
          <div className="form-horizontal">
            <div className="form-group" style={{marginRight:400}}>
              <div className="col-md-8">
                <div className="row">
                  <Input type='text' label='Name' name='teamName'
                         value={this.state.teamName} onChange={this.handleChange.bind(this, 'teamName')}
                         maxLength={16}/>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4">
                  <Dropdown label="Select filter" auto onChange={this.fillFilterValues.bind(this)} source={filtro} value={this.state.value}/>
                </div>

                <div className="col-md-4">

                  <select className="form-control" id="filterValue" ref="filterValue">
                    <option value="" default></option>
                    {this.state.values}
                  </select>
                </div>
              </div>
              </div>
                <div className="row">
                <div className="col-md-4">
                  <Button icon='add' label='Add this' raised primary onClick={this.handleClick.bind(this)}/>
                </div>

                </div>

          </div>
          <div className="row">
            <div className="col-md-8" style={{marginTop:20}}>
              {filterLabels}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <button type="button" className="btn btn-primary" style={{marginTop:20}}
                    onClick={this.searchUsers.bind(this)}>
              <span className="glyphicon glyphicon-search"></span> Search
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <table className="table table-condensed table-striped table-bordered table-hover no-margin"
                   style={{marginTop:20}} data-height="299" data-click-to-select="true">
              <thead>
              <tr>
                <th style={{"width": "5%"}}>
                  <input className="no-margin" type="checkbox"></input>
                </th>
                <th style={{"width" : "45%" , "align":"center"}}>Last name</th>
                <th style={{"width" : "50%"}}>Name</th>
              </tr>
              </thead>
              <tbody>
              {this.state.users}
              </tbody>
            </table>
            <div className="row">
              <button type="button" className="btn btn-primary" style={{marginTop:20}}
                      onClick={this.createMeeting.bind(this)}>
                Create
              </button>
              <button id="ok" type="button" className="btn btn-primary" style={{marginTop:20}}
              >
                OK
              </button>
            </div>
          </div>
        </div>
        <BootstrapModal ref="mymodal" message={this.state.message}></BootstrapModal>
      </form>);
  }
}

TeamSugestionForm.propTypes = {
  user: PropTypes.any
};


export default connect(mapStateToProps)(TeamSugestionForm);
