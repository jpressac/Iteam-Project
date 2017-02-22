import React, {Component, PropTypes} from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem, ListDivider, ListSubHeader} from 'react-toolbox/lib/list';
import classes from './MyTeamsForm.scss';
import avatarPeople from './account-multiple.png'
import listItemGrey from './ListItemGrey.scss'
import listFormat from './List.scss'
import {TEAM} from '../../constants/HostConfiguration'
import Spinner from '../Spinner/Spinner';
import ReactPagination from 'react-paginate'
import InputComponent from '../InputComponent'
import pagination from '../MeetingsHistoryForm/pagination.scss'
import {calculateTotalPages, calculateOffset} from '../../utils/mathUtils'
import {getTeamByOwner, getTeamByOwnerPaginated} from '../../utils/actions/teamActions'

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};

const ITEMS_PER_PAGE = 10;

class MyTeamsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      teams: {},
      showSpinner: true,
      searchField: '',
      offset: 0,
      totalTeams: 0,
      totalPages: 0
    }
  }

  componentDidMount() {
    this.getAllTeams();
  }

  getAllTeams() {
    getTeamByOwnerPaginated(this.state.offset, ITEMS_PER_PAGE).then(function (response) {
      this.fillFields(response.data);
    }.bind(this));
  }

  fillFields(data) {
    this.setState({
      teams: data.model,
      totalTeams: data.total,
      showSpinner: false
    }, () => {
      this.calculateTotalPages();
    });
  }

  calculateTotalPages() {
    let total = calculateTotalPages(this.state.totalTeams, ITEMS_PER_PAGE);
    this.setState({totalPages: total});
  }

  handleSubmit(e) {
    if (e.which == 13) {
      e.preventDefault();
      this.searchByToken();
    }
  }

  searchByToken() {
    if (this.state.searchField.length != 0) {
      getTeamByOwner(this.state.searchField, this.state.offset, ITEMS_PER_PAGE).then(function (response) {
        this.fillFields(response.data)
      }.bind(this))
    }
    else {
      this.getAllTeams();
    }
  }

  handlePageClick = (data) => {
    let actualPageNumber = data.selected;
    let offset = calculateOffset(actualPageNumber, ITEMS_PER_PAGE);

    this.setState({offset: offset}, () => {
      this.getAllTeams();
    });
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render() {
    if (!this.state.showSpinner) {
      let teamMap = this.state.teams;
      let members;

      return (
        <div className={"container"} style={{marginTop: 70}}>
          <div className={classes.content}>
            <div className={classes.label2}>
              <label>MY TEAMS</label>
            </div>
            <div>
              <InputComponent label='Team Name' name="searchField" value={this.state.searchField}
                              onKeyPress={this.handleSubmit.bind(this)}
                              onValueChange={this.handleChange.bind(this,'searchField')}/>
            </div>
            <List theme={listFormat} ripple>
              <ListSubHeader />
              {Object.keys(teamMap).map((key) => {
                members = teamMap[key].team.members;
                return (
                  <div key={key}>
                    <ListItem
                      theme={listItemGrey}
                      avatar={avatarPeople}
                      caption={teamMap[key].team.name}
                      legend={members.join(", ")}>
                    </ListItem>
                    <ListDivider />
                  </div>
                );
              })}
            </List>
            <ReactPagination previousLabel={"<<"}
                             nextLabel={">>"}
                             pageCount={this.state.totalPages}
                             marginPagesDisplayed={2}
                             pageRangeDisplayed={5}
                             onPageChange={this.handlePageClick}
                             initialPage={0}
                             disableInitialCallback={false}
                             pageClassName={pagination.li}
                             previousClassName={pagination.li}
                             nextClassName={pagination.li}
                             containerClassName={pagination.ul}
                             pageLinkClassName={pagination.link}
                             activeClassName={pagination.liActive}

            />

          </div>
        </div>
      )
    } else {
      return (
        <Spinner/>
      )
    }
  }
}


MyTeamsForm.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(MyTeamsForm);
