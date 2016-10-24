import React, {Component,PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import { AppBar } from 'react-toolbox/lib/app_bar'
import themeAppBar from './HeaderNotLog.scss'
import themeMenu from './menu.scss'
import themeNav from './nav.scss'

import { Button } from 'react-bootstrap';
import logo from '../image/iteamLogo.jpg'
import { PATHS } from '../../../constants/routes'

import Navigation from 'react-toolbox/lib/navigation'

class HeaderNotLog extends React.Component {
  render(){
    return(

      <header >

        <AppBar fixed flat theme={themeAppBar}  >

          <div >
            <img src={logo} style={{height:50,width:100,marginRight:400}}></img>
            <Navigation type="horizontal" theme={themeNav} >
              <Link id="home"  style={{color:'rgb(136,14,79)', margin:30}} to={'/' + PATHS.MENUNOTLOGGEDIN.HOME} activeClassName="active">HOME</Link>
                <Link theme={themeMenu.menu} style={{color:'rgb(136,14,79)', margin:30}} to={'/' + PATHS.MENUNOTLOGGEDIN.ABOUT} activeClassName="active">ABOUT</Link>
               <Link  theme={themeMenu} style={{color:'rgb(136,14,79)', margin:30}} to={'/' + PATHS.MENUNOTLOGGEDIN.CONTACT} activeClassName="active">CONTACT</Link>
                <Link theme={themeMenu} style={{color:'rgb(136,14,79)', margin:30}} to={'/' + PATHS.MENUNOTLOGGEDIN.REGISTER} activeClassName="active">REGISTER </Link>
                <Link theme={themeMenu} style={{color:'rgb(136,14,79)', margin:30}}  to={'/' + PATHS.MENUNOTLOGGEDIN.LOGIN} activeClassName="active">Login </Link>

            </Navigation>
          </div>
        </AppBar>


      </header>



);
};
}

export default HeaderNotLog
