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
import InboxList from '../../Inbox/InboxList';
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
      meetingsNotViewed: [],
      showList: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.meetings != undefined) {
      this.setState({
        count: nextProps.meetings.length.toString(),
        meetingsNotViewed: nextProps.meetings
      })
    }
  }

  componentWillMount() {
    this.notShowList();
    meetingScheduler.executeNow()
  }

  componentWillUnmount() {
    this.notShowList();
    meetingScheduler.stop()
  }

  goToNewMeeting() {
    this.notShowList();
    this.props.newMeeting();
    this.props.meeting();
  }

  goToNewTeam() {
    this.notShowList();
    this.props.newMeeting();
    this.props.team();
  }

  goToHistory() {
    this.notShowList();
    this.props.meetingHistory();
  }

  goHome(){
    this.notShowList();
    this.props.home();
  }

  goProfile(){
    this.notShowList();
    this.props.profile();
  }

  goMyMeetings(){
    this.notShowList();
    this.props.myMeeting();
  }

  goTeams(){
    this.notShowList();
    this.props.teamList();
  }

  notShowList() {
    this.setState({showList: false})
  }

  onClickShowList() {
    this.setState({showList: !this.state.showList})
  }

  renderInbox() {
    if (this.state.showList) {
      return (
        <InboxList
          meetings={this.state.meetingsNotViewed}>
        </InboxList>
      )
    }
  }

  render() {
    return (
      <header >
        <AppBar fixed flat theme={themeAppBar} leftIcon={iteamLogo()}>
          <Navigation type="horizontal" theme={themeNav}>
            <ul className={classes.ul}>
              <li><Button label='HOME' theme={themeButton}
                          onClick={this.goHome.bind(this)}/></li>
              <li><Button label='PROFILE' theme={themeButton}
                          onClick={this.goProfile.bind(this)}/></li>
              <li><Button label='MY MEETINGS' theme={themeButton}
                          onClick={this.goMyMeetings.bind(this)}/></li>
              <li><Button label='NEW MEETING' theme={themeButton}
                          onClick={this.goToNewMeeting.bind(this)}/></li>
              <li><Button label='HISTORY' theme={themeButton}
                          onClick={this.goToHistory.bind(this)}/></li>
              <li><Button label='NEW TEAM' theme={themeButton}
                          onClick={this.goToNewTeam.bind(this)}/></li>
              <li><Button label='MY TEAMS' theme={themeButton}
                          onClick={this.goTeams.bind(this)}/></li>
              <li><Button icon='inbox' label={this.state.count} theme={themeButton}
                          onClick={this.onClickShowList.bind(this)}/></li>
              <li><span className={classes.span}><label>{this.props.user}</label></span ></li>
              <li><LogoutButton/></li>
            </ul>
          </Navigation>
        </AppBar>
        {this.renderInbox()}
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
