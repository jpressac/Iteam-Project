import React, {Component, PropTypes} from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem, ListDivider, ListSubHeader} from 'react-toolbox/lib/list';
import classes from './MyTeamsForm.scss';
import avatarPeople from './account-multiple.png'
import listItemGrey from './ListItemGrey.scss'
import listFormat from './List.scss'


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
      teams: {}
    }
  }


  fillfields(teams) {
    this.setState({teams: teams});
  }


  componentDidMount() {
    axios.get('http://localhost:8080/team/byowner'
    ).then(function (response) {
      this.fillfields(response.data);
    }.bind(this));
  }


  render() {
    var teammap = this.state.teams;
    var members;

    return (
      <div className={"container"} style={{marginTop:70}}>
        <div className={classes.content}>
          <div className={classes.label2}>
            <label>MY TEAMS</label>
          </div>
          <List theme={listFormat} ripple>
            <ListSubHeader />
            {Object.keys(teammap).map((key) => {
              members= teammap[key].team.members;
              console.log('key: ' + teammap[key].team.members);
              return (
                <div>
                  <ListItem
                    theme={listItemGrey}
                    avatar={avatarPeople}
                    caption={teammap[key].team.name}
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
  }
}


MyTeamsForm.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(MyTeamsForm);
