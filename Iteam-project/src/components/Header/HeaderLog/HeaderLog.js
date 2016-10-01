import React, {Component, PropTypes} from 'react';
import {IndexLink, Link} from 'react-router'
import classes from './HeaderLog.scss'
import logo from '../image/logo.png'
import {PATHS} from '../../../constants/routes'
import {connect} from 'react-redux'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import {logout} from '../../../redux/reducers/Login/LoginUser'
import LogoutButton from './LogoutButton'
import {push} from 'react-router-redux'

const mapStateToProps = (state)=> {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.name
    }
  }
};




class HeaderLog extends Component {

  constructor(props) {
    super(props);
  }

    teamClick=() =>  {
      push('/' + PATHS.MENULOGGEDIN.NEWTEAM)
    };

   actions = [
    { label: 'Team', raised: true, icon: 'access_alarm', onClick:this.teamClick()},
    { label: 'Location', raised: true, accent: true, icon: 'room'}
  ];

  render() {
    return (

    <header >

      <AppBar fixed flat className={classes.appBar} >
        <a href="/home">LOGO</a>
        <div>
          <Navigation type='horizontal'  actions={actions}  />
            <Navigation type='horizontal'  >
            <Link id="home" className={classes.menus}  to={'/' + PATHS.MENULOGGEDIN.HOME} activeClassName="active">HOME</Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.MYMEETINGS} activeClassName="active"> My meetings</Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.PROFILE} activeClassName="active"> MY PROFILE</Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.NEWTEAM} activeClassName="active">NEW TEAM </Link>
            <Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.BOARD} activeClassName="active"> PERSONAL BOARD </Link>
            <span className = "glyphicon glyphicon-paperclip" > {this.props.user}</span >  <LogoutButton >Logout</LogoutButton>



          </Navigation>
        </div>
      </AppBar>



  </header>
  );
  };
}

HeaderLog.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(HeaderLog)
