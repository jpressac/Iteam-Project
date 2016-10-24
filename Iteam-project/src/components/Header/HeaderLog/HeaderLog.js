import React, {Component, PropTypes} from 'react';
import { Link} from 'react-router'
import classes from './HeaderLog.scss'
import logo from '../image/logo.png'
import {PATHS} from '../../../constants/routes'
import {connect} from 'react-redux'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import LogoutButton from './LogoutButton'
import {Button, IconButton} from 'react-toolbox/lib/button';

const mapStateToProps = (state)=> {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};


class HeaderLog extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (

    <header >

      <AppBar fixed flat  >
        <a href="/home"></a>
        <div className={classes.div}>
          <Navigation type='horizontal' accent >
             <Link id="home"   className={classes.menus}  to={'/' + PATHS.MENULOGGEDIN.HOME} activeClassName="active">HOME</Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.MYMEETINGS} activeClassName="active"> MY MEETINGS</Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.MEETING} activeClassName="active"> NEW MEETING</Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.PROFILE} activeClassName="active"> MY PROFILE</Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.NEWTEAM} activeClassName="active">NEW TEAM </Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.BOARD} activeClassName="active"> PERSONAL BOARD </Link>
            <span className = "glyphicon glyphicon-user" ><label> {this.props.user}</label></span >
          </Navigation>
        </div>
        <LogoutButton ></LogoutButton>
      </AppBar>

  </header>
  );
  };
}

HeaderLog.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(HeaderLog)
