import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './CoreLayout.scss'
import { PATHS } from '../../constants/routes.js'
import {Link} from 'react-router'
export const CoreLayout = ({ children }) => (
  <div class="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem label="Login" nav={PATHS.COMMON.LOGIN}></MenuItem>
      <MenuItem label="Register" nav={PATHS.COMMON.REGISTER}></MenuItem>
      <MenuItem label="About Us" nav={PATHS.COMMON.ABOUT}></MenuItem>
      <MenuItem label="Contact" nav={PATHS.COMMON.CONTACT}></MenuItem>

      </SlideMenu>
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
