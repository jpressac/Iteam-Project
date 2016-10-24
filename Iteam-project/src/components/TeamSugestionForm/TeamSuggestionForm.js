import React, {PropTypes} from 'react';
import axios from 'axios';
import BootstrapModal from '../BootstrapModal';
import {connect} from 'react-redux';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import {Button, IconButton} from 'react-toolbox/lib/button';
import {push} from 'react-router-redux'
import {PATHS} from '../../constants/routes'

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      fromMeeting: state.meetingForTeamReducer
    }
  }
};

const mapDispatchToProps = dispatch => ({

  meeting: () => {
    dispatch(push('/' + PATHS.MENULOGGEDIN.MEETING))
  },

  normal: () => {
    dispatch(push('/' + PATHS.MENULOGGEDIN.HOME))
  }
});

const filtro = [
  {value: 1, label: 'Profession'},
  {value: 2, label: 'Nationality'}
  // {value: 3, label: 'Age'},
  // {value: 4, label: 'Job position'},
  // {value: 5, label: 'Hobbies'}

];

class TeamSuggestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      filters: [],
      users: [],
      selectedUsers: [],
      usernames: {},
      values: [],
      message: '',
      filterName: '',
      filteredName: ''
    }
  }

  handleClick() {
    if ((this.state.filterName !== '') && (this.state.filteredName !== '')) {
      let valueFields = [];
      valueFields.push((this.state.filteredName).toLowerCase());
      this.state.filters.push({field: this.state.filterName.toLowerCase(), values: valueFields});
      this.forceUpdate();
    }
  }

  handleOnChange(username) {
    let newMap = this.state.usernames;
    newMap[username] = newMap[username] == false;
    this.setState({usernames: newMap});
  }

  //TODO: use a set<string> for filling the table with columns that details the filter applied

  searchUsers() {
    if (this.state.filters.length >= 0) {
      axios.get('http://localhost:8080/team/select',
        {
          params: {filter: JSON.stringify(this.state.filters)}
        }).then(function (response) {
        this.fillUsersTable(response.data);
      }.bind(this)).catch(function (response) {
        //TODO: handle errors
      });
    }
  }

  createMeeting() {
    let usersMap = this.state.usernames;
    let selected = [];
    for (let user in usersMap) {
      if (usersMap[user] == true) {
        selected.push(user);
      }
    }
    selected.push(this.props.user);

    if ((selected.length > 0) && (this.state.teamName !== '')) {
      axios.post('http://localhost:8080/team/create', {
        ownerName: this.props.user,
        name: this.state.teamName,
        members: selected
      }).then(function (response) {
        //TODO: implement a modal with a button that receives a call-function and perform any of the below actions.
        this.checkWehereItCames()
      }.bind(this)).catch(function (response) {
        //TODO: handle errors
      })
    } else {
      this.setState({message: '¡please complete the required fields!'});
      this.refs.mymodal.openModal();
    }
  }

  checkWehereItCames(){
    if (this.props.fromMeeting === true) {
      this.props.meeting();
    } else {
      this.props.normal();
    }
  }

  deleteFilter(pos) {
    let newFilters = this.state.filters;
    newFilters.map(function (filter, index) {
      if (pos === index) {
        newFilters.splice(index, 1);
      }
    });
    this.setState({filters: newFilters});
    this.searchUsers.bind(this);
  }

  fillUsersTable(data) {
    let us = [];
    let names = {};
    data.map(function (user, index) {
      if(user.username !== this.props.user){
        us.push(
          <tr key={us.length}>
            <td><input className="no-margin" type="checkbox"
                       onChange={this.handleOnChange.bind(this, user.username)}/></td>
            <td>{user.lastName}</td>
            <td>{user.name}</td>
          </tr>
        );
        names[user.username] = false;
      }
    }.bind(this));

    this.setState({users: us});
    this.setState({usernames: names});
  }

  fillFilterValues(value) {

    let filtered = filtro.filter(teamFilter => teamFilter["value"] === value);

    let url = '';
    let filterLabelName = filtered[0]["label"];

    switch (filterLabelName) {
      case "Profession":

        axios.get('http://localhost:8080/utilities/professions').then(function (response) {
          this.setValuesOptionsProfessions(response.data);
        }.bind(this));

        break;
      case "Age":
        break;
      case "Nationality":

        axios.get('http://localhost:8080/utilities/nationality/get').then(function (response) {
          this.setValuesOptionsNationalities(response.data);
        }.bind(this));

        break;
      case "Job position":
        break;
      case "Hobbies":
        break;
    }
    this.setState({value: value});
    this.setState({filterName: filterLabelName});
  }

  setValuesOptionsNationalities(data) {

    let opt = data["nationalities"].map(function (option, index) {
      var rObj = {};
      rObj["value"] = index;
      rObj["label"] = option;
      return rObj;
    });
    this.setState({values: opt});
  }

  setValuesOptionsProfessions(data) {
    let opt = data.map(function (option, index) {
      var rObj = {};
      rObj["value"] = index;
      rObj["label"] = option;
      return rObj;
    });
    this.setState({values: opt});
  }


  setFilteredValue(value) {

    let filteredLabelObject = this.state.values.filter(filter => filter["value"] == value);

    this.setState({filteredValue: value, filteredName: filteredLabelObject[0]["label"]})
  }

  handleChange = (teamName, value) => {
    this.setState({...this.state, [teamName]: value});
  };

  dropdownObjectForFilter() {
    return (
      <Dropdown label="Select filter" auto onChange={this.fillFilterValues.bind(this)} source={filtro}
                value={this.state.value}/>
    );
  };

  dropdownObjectFilteredValues() {
    return (
      <Dropdown label="Select filter" auto onChange={this.setFilteredValue.bind(this)} source={this.state.values}
                value={this.state.filteredValue}/>
    );
  };


  filterLabels() {
    return this.state.filters.map(function (filter, index) {
      return (
        <span className="tag label label-info" style={{fontSize:14, margin:10, marginTop:50}}>
          <span key={index}> {filter.field} : {filter.values}</span>
          <a href='javascript:;' onClick={this.deleteFilter.bind(this, index)}>
            <i className="remove glyphicon glyphicon-remove-sign glyphicon-white"/>
          </a>
        </span>
      );
    }.bind(this));
  }

  render() {
    return (
      <div className="container">
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
                  {this.dropdownObjectForFilter()}
                </div>

                <div className="col-md-4">
                  {this.dropdownObjectFilteredValues()}
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
              {this.filterLabels()}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <button type="button" className="btn btn-primary" style={{marginTop:20}}
                    onClick={this.searchUsers.bind(this)}>
              <span className="glyphicon glyphicon-search"/> Search
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
                  <input className="no-margin" type="checkbox"/>
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
            </div>
          </div>
        </div>
        <BootstrapModal ref="mymodal" message={this.state.message}/>
      </div>);
  }
}

TeamSuggestionForm.propTypes = {
  user: PropTypes.any,
  fromMeeting: PropTypes.bool,
  meeting: PropTypes.func,
  normal: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(TeamSuggestionForm);
