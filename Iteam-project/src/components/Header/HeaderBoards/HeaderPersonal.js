/**
 * Created by Randanne on 10/12/2016.
 */
import React, {Component, PropTypes} from 'react';
import {PATHS} from '../../../constants/routes'
import logo from '../image/iteamLogo.jpg';
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {Button} from 'react-toolbox/lib/button';
import classes from './theme.scss';
import themeAppBar from './HeaderLog.scss';
import themeNav from './nav.scss';
import themeButton from './button.scss'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  sharedBoard: () => dispatch(push('/' + PATHS.MENULOGGEDIN.SHAREDBOARD))
});

const mapStateToProps = (state)=> {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      meetingTopic: state.meetingReducer.meeting.topic
    }
  }
};

class HeaderPersonal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (

      <header >
        <AppBar title={this.props.meetingTopic} fixed flat theme={themeAppBar}>
          <div >
            <Navigation type="horizontal" theme={themeNav}>
              <ul className={classes.ul}>
                <li><span className={classes.span}><label> {this.props.user}</label></span ></li>
              </ul>
            </Navigation>
          </div>
        </AppBar>
      </header>);
  };
}

HeaderPersonal.propTypes = {
  home: PropTypes.func,
  sharedBoard: PropTypes.func,
  user: PropTypes.any,
  meetingTopic: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPersonal)
