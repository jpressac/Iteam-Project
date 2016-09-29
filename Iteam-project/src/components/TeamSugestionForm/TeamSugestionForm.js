import React, {PropTypes} from 'react';
import classes from './TeamSugestionForm.scss';
import axios from 'axios';
import BootstrapModal from '../BootstrapModal';
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.name
    }
  }
};

class TeamSugestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  fillFilterValues() {
    const filter = this.refs.filterName.value;
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
                  <label for="inputTeamName" className="col-md-4 control-label">Team name</label>
                  <div className="col-md-4">
                    <input type="text" className="form-control" id="inputTeamName" ref="teamName"
                           maxlength="20"></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-8">
                <div className="row">
                  <label for="filterselect" className="col-md-2 control-label">Filters <i
                    className="glyphicon glyphicon-filter "></i></label>
                  <div className="col-md-3">
                    <select className="form-control" id="filters" data-width="fit" data-live-search="true"
                            ref="filterName" onChange={this.fillFilterValues.bind(this)}>
                      <option value="" default></option>
                      <option value="Profession"> Profession</option>
                      <option value="Age"> Age</option>
                      <option value="Nationality"> Nationality</option>
                      <option value="Job position"> Job position</option>
                      <option value="Hobbies"> Hobbies</option>
                    </select>
                  </div>
                  <label for="inputvalue" className="col-md-2 control-label">Value</label>
                  <div className="col-md-3">
                    <select className="form-control" id="filterValue" ref="filterValue">
                      <option value="" default></option>
                      {this.state.values}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button type="button" className="btn btn-primary" onClick={this.handleClick.bind(this)}>
                      <span className="glyphicon glyphicon-plus"></span> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8" style={{marginTop:20}}>
                {filterLabels}
              </div>
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
