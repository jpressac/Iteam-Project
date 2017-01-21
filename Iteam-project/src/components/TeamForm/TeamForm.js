import React, {PropTypes} from "react";
import BootstrapModal from "../BootstrapModal";
import {connect} from "react-redux";
import Dropdown from "react-toolbox/lib/dropdown";
import {Button} from "react-toolbox/lib/button";
import {push} from "react-router-redux";
import {PATHS} from "../../constants/routes";
import classes from "./TeamForm.scss";
import themeLabel from "./label.scss";
import chipTheme from "./chips.scss";
import Tooltip from "react-toolbox/lib/tooltip";
import Chip from "react-toolbox/lib/chip";
import Spinner from "../Spinner/Spinner";
import InputComponent from '../InputComponent/InputComponent'
import {getProfessions, getNationalities} from '../../utils/actions/utilsActions';
import {createTeam, teamNameExistence, selectTeam} from '../../utils/actions/teamActions';
import {List, ListItem, ListSubHeader} from 'react-toolbox/lib/list';
import generateUUID from "../../constants/utils/GetUUID";
import listSubheader from './ListSubheader.css'

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


const PROFESSION = 'Profession';
const NATIONALITY = 'Nationality';
const AGE = 'Age';
const SCORING = 'Scoring';
const HOBBIES = 'Hobbies';

const filter = [
  {value: 1, label: PROFESSION},
  {value: 2, label: NATIONALITY},
  {value: 3, label: AGE},
  {value: 4, label: SCORING}
  //{value: 5, label: 'Hobbies'}
];

const TooltipButton = Tooltip(Button);

class TeamSuggestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      filters: {},
      users: [],
      selectedUsers: [],
      usernames: {},
      values: [],
      message: '',
      filterName: '',
      filteredName: '',
      filteredValue: 0,
      showSpinner: false,
      showErrorTeamName: false,
      errorTeamName: '',
      checkbox: false,
      userInformation: [],
      usersSelected: [],
      rangeFrom: 0,
      rangeTo: 0,
    }
  }

  addFilter() {
    if ((this.state.filterName !== '') && (this.state.filteredName !== '')) {

      console.log(this.state.filteredName);
      console.log(this.state.filterName);

      let newFilters = this.state.filters;

      newFilters[this.state.filteredName] = {
        values: this.state.filteredName
      };

      this.setState({
        filters: newFilters
      });
    }
  }

  addRangeFilter() {
    let rangeFilterName = '';
    if (this.state.rangeFrom != 0) {
      rangeFilterName.concat("from:", this.state.rangeFrom.toString());
    }

    if (this.state.rangeTo != 0) {
      rangeFilterName.concat("to:", this.state.rangeTo.toString());
    }

    this.setState({filters: this.state.filters[this.state.filterName] = {values: rangeFilterName}})
  }

  //TODO: use a set<string> for filling the table with columns that details the filter applied

  searchUsers() {
    if (this.state.filters.length >= 0) {
      selectTeam(JSON.stringify(this.state.filters))
        .then(function (response) {
          this.setState({userInformation: response.data});
        }.bind(this))
        .catch(function (response) {
          //TODO: handle errors
        });
    }
  }

  create() {

    let selected = this.state.usersSelected.map((user) => user.username);

    selected.push(this.props.user);

    if ((selected.length > 1) && (this.state.teamName !== '') && !this.state.showErrorTeamName) {
      this.setState({showSpinner: true});

      createTeam(this.props.user, this.state.teamName, selected)
        .then(function (response) {
          //TODO: implement a modal with a button that receives a call-function and perform any of the below actions.
          this.checkWhereItCames()
        }.bind(this))
        .catch(function (response) {
          //TODO: handle errors
        })
    } else {
      this.setState({message: '¡Please complete the required fields!'});
      this.refs.mymodal.openModal();
    }
  }

  checkWhereItCames() {
    if (this.props.fromMeeting === true) {
      this.props.meeting();
    } else {
      this.props.normal();
    }
  }

  deleteFilter(key) {
    let newFilters = this.state.filters;

    delete newFilters[key];

    this.setState({filters: newFilters});

    this.searchUsers.bind(this);
  }

  fillFilterValues(value) {

    let filtered = filter.filter(teamFilter => teamFilter["value"] === value);

    let filterLabelName = filtered[0]["label"];

    switch (filterLabelName) {
      case PROFESSION:
        getProfessions().then(function (response) {
          this.setValuesOptions(response.data);
        }.bind(this));
        break;
      case NATIONALITY:
        getNationalities().then(function (response) {
          this.setValuesOptions(response.data["nationalities"]);
        }.bind(this));
        break;
    }
    this.setState({value: value});
    this.setState({filterName: filterLabelName});
  }

  setValuesOptions(data) {

    let opt = data.map(function (option, index) {
      let rObj = {};
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
    this.setState({[teamName]: value});
  };

  dropdownObjectForFilter() {
    return (
      <Dropdown label="Select filter" theme={themeLabel} onChange={this.fillFilterValues.bind(this)} source={filter}
                value={this.state.value}/>
    );
  };

  dropdownObjectFilteredValues() {
    return (
      <Dropdown label="Select filter" auto onChange={this.setFilteredValue.bind(this)} source={this.state.values}
                value={this.state.filteredValue}>
      </Dropdown>
    );
  };

  filterLabels() {

    console.log(this.state.filters);
    return Object.keys(this.state.filters).map((key) => {
      return (
        <Chip key={generateUUID()} deletable onDeleteClick={this.deleteFilter.bind(this, key)} theme={chipTheme}>
          {this.state.filters[key].values}
        </Chip>
      )
    });
  }

  checkName() {
    teamNameExistence(this.state.teamName, this.props.user)
      .then(function () {
        this.setState({errorTeamName: ''})
      }.bind(this))
      .catch(function () {
        this.setState({errorTeamName: 'This team name already exists'})
      }.bind(this));
  }

  selectUser(username) {
    let userSelected = this.state.usersSelected;

    let userToAdd = this.state.userInformation.filter((user) => user.username === username)[0];

    if (userSelected.filter((user) => user.username === userToAdd.username).length != 1) {
      userSelected.push(userToAdd)
    }

    this.setState({
      userInformation: this.state.userInformation.filter((user) => user.username !== username),
      usersSelected: userSelected
    })
  }

  removeUser(username) {
    let removedUser = this.state.userInformation;

    let userToRemove = this.state.usersSelected.filter((user) => user.username === username)[0];

    if (removedUser.filter((user) => userToRemove.username === user.username).length != 1) {
      removedUser.push(userToRemove)
    }

    this.setState({
      userInformation: removedUser,
      usersSelected: this.state.usersSelected.filter((user) => user.username !== username)
    })
  }

  renderUsers() {
    return this.state.userInformation.map((user) => {
      return (
        <ListItem key={generateUUID()}
                  avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
                  caption={[user.username, [user.name, user.lastName].join(" ")].join(": ")}
                  legend='Here will be the feedback points'
                  onClick={this.selectUser.bind(this, user.username)}
                  rightIcon='star'/>
      )
    })
  }

  renderUserSelected() {
    return this.state.usersSelected.map((user) => {
      return (
        <ListItem key={generateUUID()}
                  avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
                  caption={[user.username, [user.name, user.lastName].join(" ")].join(": ")}
                  legend='Here will be the feedback points'
                  onClick={this.removeUser.bind(this, user.username)}
                  rightIcon='star'/>
      )
    })
  }

  handleAgeChange(key, value) {
    this.setState({[key]: value})
  }

  rangeFilter() {
    return (
      <div className="row">
        <InputComponent label="From" type="number" value={this.state.rangeFrom}
                        onValueChange={this.handleAgeChange.bind(this, "rangeFrom")} className="col-md-6"/>
        <InputComponent label="To" type="number" value={this.state.rangeTo}
                        onValueChange={this.handleAgeChange.bind(this, "rangeTo")} className="col-md-6"/>
      </div>
    )
  }

  //TODO: this should be another component.
  filters(filter) {

    switch (filter) {
      case PROFESSION:
        return this.dropdownObjectFilteredValues();
        break;
      case AGE:
        return this.rangeFilter();
      case NATIONALITY:
        return this.dropdownObjectFilteredValues();
        break;
      case SCORING:
        return this.rangeFilter();
      case HOBBIES:
        break;
      default:
        break;
    }
  }

  render() {
    if (!this.state.showSpinner) {
      return (
        <div className="container" style={{marginTop: 70, width: 700}}>
          <div className={classes.label2}>
            <label>CREATE TEAM</label>
          </div>
          <div className={classes.form}>
            <div className="form-horizontal">
              <div className="form-group">
                <div className="row">
                  <InputComponent className="col-md-8" label='Team name' type='type' required
                                  value={this.state.teamName}
                                  onValueChange={this.handleChange.bind(this, 'teamName')}
                                  onBlur={this.checkName.bind(this)} onValueError={this.state.errorTeamName}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-4">
                      {this.dropdownObjectForFilter()}
                    </div>
                    <div className="col-md-4">
                      <TooltipButton icon='add' tooltip='Add filter'
                                     style={{background: '#900C3F', color: 'white', marginTop: 10}} floating mini
                                     onClick={this.addFilter.bind(this)}/>
                    </div>
                    <div className="col-md-4">
                      <TooltipButton icon='search' tooltip='Search members'
                                     style={{background: '#900C3F', color: 'white'}}
                                     floating onClick={this.searchUsers.bind(this)}/>
                    </div>
                  </div>
                  <div className="row col-md-12">
                    {this.filters(this.state.filterName)}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12" style={{marginTop: 20}}>
                    {this.filterLabels()}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <List selectable ripple className={classes.verticalbarright}>
                      <ListSubHeader caption='Select Users' theme={listSubheader}/>
                      {this.renderUsers()}
                    </List>
                  </div>
                  <div className="col-md-6">
                    <List selectable ripple className={classes.verticalbarleft}>
                      <ListSubHeader caption='Users Selected' theme={listSubheader}/>
                      {this.renderUserSelected()}
                    </List>
                  </div>
                </div>
                <div className="row">
                  <Button style={{margin: 15, color: 'white', background: '#900C3F'}} target='_blank' raised
                          onClick={this.create.bind(this)}>
                    Create
                  </Button>
                </div>
              </div>
              <BootstrapModal ref="mymodal" message={this.state.message}/>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <Spinner/>
      )
    }
  }
}

TeamSuggestionForm.propTypes = {
  user: PropTypes.any,
  fromMeeting: PropTypes.bool,
  meeting: PropTypes.func,
  normal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamSuggestionForm);
