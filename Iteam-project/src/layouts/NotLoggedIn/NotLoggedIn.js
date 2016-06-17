import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './NotLoggedIn.scss'
import { PATHS } from '../../constants/routes'

export const NotLoggedIn = ({ children }) => (

  <div className="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem label="Home" nav={PATHS.MENUNOTLOGGEDIN.HOME}></MenuItem>
      <MenuItem label="Login" nav={PATHS.MENUNOTLOGGEDIN.LOGIN}></MenuItem>
      <MenuItem label="Register" nav={PATHS.MENUNOTLOGGEDIN.REGISTER}></MenuItem>
      <MenuItem label="About Us" nav={PATHS.MENUNOTLOGGEDIN.ABOUT}></MenuItem>
      <MenuItem label="Contact" nav={PATHS.MENUNOTLOGGEDIN.CONTACT}></MenuItem>
    </SlideMenu>
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

NotLoggedIn.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default NotLoggedIn
