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


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};

class MyTeamsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      teams: {},
      showSpinner: true
    }
  }

  componentDidMount() {
    axios.get(TEAM.TEAM_BY_OWNER
    ).then(function (response) {
      this.fillFields(response.data);
    }.bind(this));
  }

  fillFields(teams) {
    this.setState({teams: teams, showSpinner: false});
  }

  render() {
    if(!this.state.showSpinner) {
      let teamMap = this.state.teams;
      let members;

      return (
        <div className={"container"} style={{marginTop: 70}}>
          <div className={classes.content}>
            <div className={classes.label2}>
              <label>MY TEAMS</label>
            </div>
            <List theme={listFormat} ripple>
              <ListSubHeader />
              {Object.keys(teamMap).map((key) => {
                members = teamMap[key].team.members;
                console.log('key: ' + teamMap[key].team.members);
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
          </div>
        </div>
      )
    }else {
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
