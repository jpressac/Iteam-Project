import React, {Component, PropTypes} from 'react';
import logo from '../image/iteamLogo.jpg'
import {PATHS} from '../../../constants/routes'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import LogoutButton from './LogoutButton'
import {Button} from 'react-toolbox/lib/button';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import themeAppBar from './HeaderLog.scss'
import themeNav from './nav.scss'
import classes from './theme.scss'
import {fromMeetingOrTeam} from '../../../redux/reducers/Meeting/MeetingForTeamReducer'
import themeButton from './button.scss'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  profile: () => dispatch(push('/' + PATHS.MENULOGGEDIN.PROFILE)),
  myMeeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MYMEETINGS)),
  meeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MEETING)),
  teamList: () => dispatch(push('/' + PATHS.MENULOGGEDIN.TEAMLIST)),
  team: () => dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM)),
  newMeeting: () => dispatch(fromMeetingOrTeam()),
  chat: ()=> dispatch(push('/' + PATHS.MENULOGGEDIN.CHAT))

});
const mapStateToProps = (state) => {
  if (state.loginUser != null) {
    return {
      user: state.loginUser.user.username
    }
  } else {
    return ({})
  }
};

class HeaderLog extends Component {

  constructor(props) {
    super(props);
  }

  goToNewMeeting() {
    this.props.newMeeting();
    this.props.meeting();
  }

  goToNewTeam() {
    this.props.newMeeting();
    this.props.team();
  }


  render() {
    return (

      <header >
        <AppBar fixed flat theme={themeAppBar}>
          <div >

            <img src={logo} style={{height: 50, width: 100, marginRight: 300}}/>

            <Navigation type="horizontal" theme={themeNav}>
              <ul className={classes.ul}>
                <li><Button label='HOME' className={themeButton.button} style={{color: '#900C3F'}}
                            onClick={this.props.home}/></li>
                <li><Button label='PROFILE' theme={themeButton} style={{color: '#900C3F'}}
                            onClick={this.props.profile}/></li>
                <li><Button label='MY MEETINGS' theme={themeButton} style={{color: '#900C3F'}}
                            onClick={this.props.myMeeting}/></li>
                <li><Button label='NEW MEETING' theme={themeButton} style={{color: '#900C3F'}}
                            onClick={this.goToNewMeeting.bind(this)}/></li>
                <li><Button label='NEW TEAM' theme={themeButton} style={{color: '#900C3F'}}
                            onClick={this.goToNewTeam.bind(this)}/></li>
                <li><Button label='MY TEAMS' theme={themeButton} style={{color: '#900C3F'}}
                            onClick={this.props.teamList}/></li>
                <li><span className={classes.span}><label> {this.props.user}</label></span ></li>
                <li><LogoutButton style={{color: '#900C3F'}}/>></li>
                <li><Button label='CHAT' theme={themeButton} style={{color: '#900C3F'}}
                            onClick={this.props.chat}/></li>
              </ul>
            </Navigation>
          </div>
        </AppBar>
      </header>
    );
  };
}

HeaderLog.propTypes = {
  home: PropTypes.func,
  profile: PropTypes.func,
  myMeeting: PropTypes.func,
  meeting: PropTypes.func,
  user: PropTypes.any,
  team: PropTypes.func,
  newMeeting: PropTypes.func,
  teamList: PropTypes.func,
  chat: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLog)
