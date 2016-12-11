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
import {IconButton} from 'react-toolbox/lib/button';
import classes from './theme.scss';
import themeAppBar from './HeaderLog.scss';
import themeNav from './nav.scss';


const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  sharedBoard: () => dispatch(push('/' + PATHS.MENULOGGEDIN.SHAREDBOARD))
});

const mapStateToProps = (state)=> {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      meetingTopic: state.meetingConfigurationReducer.meeting.topic
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
        <AppBar fixed flat theme={themeAppBar}>
          <div >
            <IconButton src={logo}  style={{height:50,width:100,marginRight:300}} onclick={this.props.home}/>
            <li><span className={classes.span}><label> {this.props.user}</label></span ></li>
            <li><span className={classes.span}><label> {this.props.meetingTopic}</label></span ></li>
          </div>
        </AppBar>
      </header>)
  }
}

HeaderPersonal.propTypes = {
  home: PropTypes.func,
  sharedBoard: PropTypes.func,
  user: PropTypes.any,
  meetingTopic:PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPersonal)
