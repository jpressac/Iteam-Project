import React, {PropTypes} from 'react'
import BootstrapModal from '../BootstrapModal'
import {connect} from 'react-redux'
import {Button} from 'react-toolbox/lib/button'
import {push} from 'react-router-redux'
import {PATHS} from '../../constants/routes'
import classes from './TeamForm.scss'
import chipTheme from './chips.scss'
import Tooltip from 'react-toolbox/lib/tooltip'
import Chip from 'react-toolbox/lib/chip'
import Spinner from '../Spinner/Spinner'
import InputComponent from '../InputComponent/InputComponent'
import DropdownComponent from '../DropdownComponent/DropdownComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import {getProfessions, getNationalities} from '../../utils/actions/utilsActions'
import {createTeam, teamNameExistence, selectTeam} from '../../utils/actions/teamActions'
import {List, ListItem, ListSubHeader} from 'react-toolbox/lib/list'
import generateUUID from '../../constants/utils/GetUUID'
import listSubheader from './ListSubheader.css'

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      fromMeeting: state.meetingForTeamReducer,
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

const filterValues = [PROFESSION, NATIONALITY, AGE, SCORING, HOBBIES];

const TooltipButton = Tooltip(Button);

class TeamForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      filters: {},
      users: [],
      selectedUsers: [],
      usernames: {},
      message: '',
      showSpinner: false,
      showErrorTeamName: false,
      errorTeamName: '',
      checkbox: false,
      userInformation: [],
      usersSelected: [],
      rangeFrom: 0,
      rangeTo: 0,
      valuesForFilter: {},
      dropdownSource: [],
      dropdownSourceP: [],
      filterToShow: '',
      filterToAddValue: ''
    }
  }

  addFilter() {
    if (this.state.filterToShow === PROFESSION || this.state.filterToShow === NATIONALITY) {
      this.addComboFilter();
    } else {
      this.addRangeFilter();
    }
  }

  addComboFilter() {
    if (this.state.filterToAddValue !== '') {
      let newFilters = this.state.filters;

      newFilters[this.state.filterToAddValue] = {
        values: this.state.filterToAddValue,
        key: this.state.filterToShow
      };

      this.setState({
        filters: newFilters
      });
    }
  }

  addRangeFilter() {
    let rangeFilterName = this.state.filterToShow;

    //TODO: don't like this variable
    let update = false;


    if (0 != this.state.rangeFrom) {
      update = true;
      rangeFilterName = rangeFilterName.concat(" from:", this.state.rangeFrom.toString());
    }

    if (0 != this.state.rangeTo) {
      update = true;
      rangeFilterName = rangeFilterName.concat(" to:", this.state.rangeTo.toString());
    }

    let newFilters = this.state.filters;

    if (update) {
      newFilters[this.state.filterToShow] = {
        values: rangeFilterName,
        from: this.state.rangeFrom,
        key: this.state.filterToShow,
        to: this.state.rangeTo
      };

      this.setState({filters: newFilters})
    }
  }

  searchUsers() {
    selectTeam(JSON.stringify(this.processFilters()))
      .then(function (response) {
        this.setState({userInformation: response.data});
      }.bind(this))
      .catch(function (response) {
        //TODO: handle errors
      });
  }

  processFilters() {
    return Object.values(this.state.filters).map((filter) => {

      let obj = {};
      obj.field = filter.key;

      //Here will crate the filters for Profession and Nationality
      if (filter.key === PROFESSION || filter.key === NATIONALITY) {
        obj.values = [filter.values];
      } else {
        //Here will create the filters for Age and Scoring
        if (filter.key === AGE || filter.key === SCORING) {
          obj.values = [filter.from, filter.to];
        }
      }
      return obj;
    });
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

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

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

  selectFilter(filterName) {

    this.setState({filterToShow: filterName})

    switch (filterName) {
      case PROFESSION:
        getProfessions().then(function (response) {
          this.setState({
            dropdownSourceP: response.data,
          });
        }.bind(this));
        break;
      case NATIONALITY:
        getNationalities().then(function (response) {
          this.setState({
            dropdownSource: response.data["nationalities"],
          });
        }.bind(this));
        break;
    }
  }

  //TODO: this should be another component.
  filters() {
    switch (this.state.filterToShow) {

      case PROFESSION:
        if (this.state.dropdownSourceP.length > 0) {
          return this.dropdownObjectFilteredValues(this.state.dropdownSourceP);
        }
        break;

      case AGE:
        return this.rangeFilter();
        break;

      case NATIONALITY:
        if (this.state.dropdownSource.length > 0) {
          return this.dropdownObjectFilteredValues(this.state.dropdownSource);
        }
        break;

      case SCORING:
        return this.rangeFilter();

      case HOBBIES:
        break;

      default:
        break;
    }
  }

  dropdownObjectFilteredValues(sourceData) {
    return (
      <DropdownComponent label="Select Filter" source={sourceData}
                         initialValue="" onValueChange={this.handleChange.bind(this, 'filterToAddValue')}/>
    );
  };

  filterLabels() {
    return Object.keys(this.state.filters).map((key) => {
      return (
        <Chip key={generateUUID()} deletable onDeleteClick={this.deleteFilter.bind(this, key)} theme={chipTheme}>
          {this.state.filters[key].values}
        </Chip>
      )
    });
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

  rangeFilter() {
    return (
      <div className="row">
        <InputComponent label="From" type="number" value={this.state.rangeFrom.toString()}
                        onValueChange={this.handleChange.bind(this, "rangeFrom")} className="col-md-6"/>
        <InputComponent label="To" type="number" value={this.state.rangeTo.toString()}
                        onValueChange={this.handleChange.bind(this, "rangeTo")} className="col-md-6"/>
      </div>
    )
  }


  render() {
    if (!this.state.showSpinner) {
      return (
        <div className={"container " + classes.teamContainer}>
          <div className={classes.label}>
            <label>CREATE TEAM</label>
          </div>
          <div className={"row " + classes.form}>
            <InputComponent className={"row col-md-12 " + classes.paddingZero} label='Team name' type='type' required
                            value={this.state.teamName}
                            onValueChange={this.handleChange.bind(this, 'teamName')}
                            onBlur={this.checkName.bind(this)} onValueError={this.state.errorTeamName}/>
            <div className="col-md-4">
              <DropdownComponent label="Select Filter" source={filterValues}
                                 initialValue="" onValueChange={this.selectFilter.bind(this)}/>
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
            <div className="row col-md-12">
              {this.filters()}
            </div>
            <div className="row">
              <div className="col-md-12" style={{marginTop: 20}}>
                {this.filterLabels()}
              </div>
            </div>
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
            <ButtonComponent className={"col-md-12"} value="Create" raisedValue onClick={this.create.bind(this)}/>
            <BootstrapModal ref="mymodal" message={this.state.message}/>
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

TeamForm.propTypes = {
  user: PropTypes.any,
  fromMeeting: PropTypes.bool,
  meeting: PropTypes.func,
  normal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamForm);
