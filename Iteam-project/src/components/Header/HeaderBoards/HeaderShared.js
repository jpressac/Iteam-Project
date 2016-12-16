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
  personalBoard: () => dispatch(push('/' + PATHS.MENULOGGEDIN.PERSONALBOARD))
});

const mapStateToProps = (state)=> {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      meetingTopic: state.meetingConfigurationReducer.meeting.topic
    }
  }
};

class HeaderShared extends Component {
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
                <li><img src={logo} style={{height:50,width:100,marginRight:300}} onClick={this.props.home}/></li>
                <li><Button label='PERSONAL BOARD' theme={themeButton} style={{color:'#900C3F'}}
                            onClick={this.props.personalBoard}/></li>
                <li><span className={classes.span}><label> {this.props.user}</label></span ></li>
                <li><span className={classes.span}><label> {this.props.meetingTopic}</label></span ></li>
              </ul>
            </Navigation>
          </div>
        </AppBar>
      </header>);
  };
}

HeaderShared.propTypes = {
  home: PropTypes.func,
  personalBoard: PropTypes.func,
  user: PropTypes.any,
  meetingTopic: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderShared)

