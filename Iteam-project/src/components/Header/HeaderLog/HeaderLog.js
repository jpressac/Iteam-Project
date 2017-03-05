import React, {Component, PropTypes} from 'react';
import logo from '../image/LogoBordo.png'
import {PATHS} from '../../../constants/routes'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import LogoutButton from './LogoutButton'
import {Button,IconButton} from 'react-toolbox/lib/button';
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
import Avatar from 'react-toolbox/lib/avatar';
import Chip from 'react-toolbox/lib/chip';
import themeIcons from './icons.scss'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  profile: () => dispatch(push('/' + PATHS.MENULOGGEDIN.PROFILE)),
  myMeeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MYMEETINGS)),
  meeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MEETING)),
  teamList: () => dispatch(push('/' + PATHS.MENULOGGEDIN.TEAMLIST)),
  team: () => dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM)),
  newMeeting: () => dispatch(fromMeetingOrTeam()),
  meetingHistory: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HISTORY)),
  sharedReport: () => dispatch(push('/' + PATHS.SHARED_REPORT.REPORT_LOGGEDIN))
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
   goTo(value){
     this.notShowList();
     value();
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
        <AppBar fixed flat theme={themeAppBar} >
          <Button  onClick={this.goTo.bind(this, this.props.home)} theme={themeButton} neutral={false}>
          <img className={themeAppBar.logo} src={logo} /></Button>
          <Navigation type="horizontal" theme={themeNav}>
            <ul className={classes.ul}>

              <li><Button label='MY MEETINGS' theme={themeButton}
                          onClick={this.goTo.bind(this, this.props.myMeeting)}/></li>
              <li><Button label='NEW MEETING' theme={themeButton}
                          onClick={this.goToNewMeeting.bind(this)}/></li>
              <li><Button label='HISTORY' theme={themeButton}
                          onClick={this.goTo.bind(this, this.props.meetingHistory)}/></li>
              <li><Button label='NEW TEAM' theme={themeButton}
                          onClick={this.goToNewTeam.bind(this)}/></li>
              <li><Button label='MY TEAMS' theme={themeButton}
                          onClick={this.goTo.bind(this, this.props.teamList)}/></li>
              <li><Button label='SHARED REPORT' theme={themeButton}
                          onClick={this.goTo.bind(this, this.props.sharedReport)}/></li>
              <li><Button  onClick={this.goTo.bind(this, this.props.profile)} neutral={false}><Chip>
                <Avatar icon="account_circle" />
                <span className={classes.span}><label>{this.props.user}</label></span >
              </Chip></Button>
              </li>
              <li><Button icon='inbox' label={this.state.count} theme={themeIcons}
                          onClick={this.onClickShowList.bind(this)}/></li>

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
  meetings: PropTypes.any,
  sharedReport: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLog)
