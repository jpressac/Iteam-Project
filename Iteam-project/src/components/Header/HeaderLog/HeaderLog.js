import React, {Component, PropTypes} from 'react';
import logo from '../image/iteamLogo.jpg'
import {PATHS} from '../../../constants/routes'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import LogoutButton from './LogoutButton'
import {Button} from 'react-toolbox/lib/button';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import themeAppBar from '../header.scss'
import themeNav from '../nav.scss'
import classes from './theme.scss'
import {fromMeetingOrTeam} from '../../../redux/reducers/Meeting/MeetingForTeamReducer'
import {meetingsNotViewed} from '../../../redux/reducers/Meeting/MeetingNotViewedReducer'
import themeButton from './button.scss'
import Inbox from '../../Inbox/Inbox'
import meetingScheduler from '../../../utils/actions/getMeetingTask'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  profile: () => dispatch(push('/' + PATHS.MENULOGGEDIN.PROFILE)),
  myMeeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MYMEETINGS)),
  meeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MEETING)),
  teamList: () => dispatch(push('/' + PATHS.MENULOGGEDIN.TEAMLIST)),
  team: () => dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM)),
  newMeeting: () => dispatch(fromMeetingOrTeam()),
  meetingHistory: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HISTORY))
});

const mapStateToProps = (state) => {
  if (state.loginUser != null) {
    return {
      user: state.loginUser.user.username,
      meetings: state.meetingsNotViewed
    };
  }
  else {
    return ({})
  }
};

const iteamLogo = () => (
  <img className={themeAppBar.logo} src={logo}/>
);

class HeaderLog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: '',
      meetingsNotViewed: []
    }
  }

  componentWillReceiveProps(nextProps) {
    console.debug(this.props.meetings);
    console.debug(nextProps.meetings);
    if (this.props.meetings != undefined) {
      if (this.props.meetings.length != nextProps.meetings.length) {
        this.setState({
          count: nextProps.meetings.length.toString(),
          meetingsNotViewed: nextProps.meetings
        })
      }
    }
  }

  componentWillMount() {
    meetingScheduler.executeNow()
  }

  componentDidUnmount() {
    meetingScheduler.stop()
  }

  goToNewMeeting() {
    this.props.newMeeting();
    this.props.meeting();
  }

  goToNewTeam() {
    this.props.newMeeting();
    this.props.team();
  }

  goToHistory() {
    this.props.meetingHistory();
  }

  renderInbox() {
    console.debug('hasta aca llega, count: ' + this.state.count);
    console.debug('meetings: ' + this.state.meetingsNotViewed);
    this.setState({count: ''});
    return (
      <Inbox
        meetings={this.state.meetingsNotViewed}
      />
    )
  }

  render() {
    return (
      <header >
        <AppBar fixed flat theme={themeAppBar} leftIcon={iteamLogo()}>
          <Navigation type="horizontal" theme={themeNav}>
            <ul className={classes.ul}>
              <li><Button label='HOME' theme={themeButton}
                          onClick={this.props.home}/></li>
              <li><Button label='PROFILE' theme={themeButton}
                          onClick={this.props.profile}/></li>
              <li><Button label='MY MEETINGS' theme={themeButton}
                          onClick={this.props.myMeeting}/></li>
              <li><Button label='NEW MEETING' theme={themeButton}
                          onClick={this.goToNewMeeting.bind(this)}/></li>
              <li><Button label='HISTORY' theme={themeButton}
                          onClick={this.goToHistory.bind(this)}/></li>
              <li><Button label='NEW TEAM' theme={themeButton}
                          onClick={this.goToNewTeam.bind(this)}/></li>
              <li><Button label='MY TEAMS' theme={themeButton}
                          onClick={this.props.teamList}/></li>
              <li><Button label='INBOX' theme={themeButton}
                          onClick={this.renderInbox.bind(this)}/>{this.state.count.toString()}</li>
              <li><span className={classes.span}><label> {this.props.user}</label></span ></li>
              <li><LogoutButton/></li>
            </ul>
          </Navigation>
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
  meetingHistory: PropTypes.func,
  meetings: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLog)
