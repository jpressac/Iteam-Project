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
      <MenuItem  label="Login" nav="/"></MenuItem>
      <MenuItem  label="Register" nav="/register"></MenuItem>
      <MenuItem label="About Us"></MenuItem>
      <MenuItem label="Contact"></MenuItem>

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
