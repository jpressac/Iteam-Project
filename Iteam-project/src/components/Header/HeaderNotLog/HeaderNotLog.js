import React, {Component,PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import classes from './HeaderNotLog.scss'
import { Button } from 'react-bootstrap';
import logo from '../image/logo.png'
import { PATHS } from '../../../constants/routes'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'

class HeaderNotLog extends React.Component {
  render(){
    return(



      <header >

        <AppBar fixed flat className={classes.appBar} >
          <a href="/home">LOGO</a>
          <div>
            <Navigation type='horizontal' >
              <Link id="home" className={classes.menus}  to={'/' + PATHS.MENUNOTLOGGEDIN.HOME} activeClassName="active">HOME</Link>
              <Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.ABOUT} activeClassName="active">ABOUT</Link>
              <Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.CONTACT} activeClassName="active">CONTACT</Link>
              <Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.REGISTER} activeClassName="active">REGISTER </Link>
              <Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.LOGIN} activeClassName="active">Login </Link>

            </Navigation>
          </div>
        </AppBar>







      </header>



);
};
}

export default HeaderNotLog
