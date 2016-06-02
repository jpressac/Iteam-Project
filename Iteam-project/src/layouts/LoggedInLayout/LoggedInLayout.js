import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './CoreLayout.scss'
import { PATHS } from '../../constants/routes.js'
import {Link} from 'react-router'
export const LoggedInLayout = ({ children }) => (
  <div class="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem  label="My profile" nav=""></MenuItem>
      <MenuItem  label="New meeting" nav=""></MenuItem>
      <MenuItem  label="New team" ></MenuItem>
      <MenuItem label="Meeting summary" ></MenuItem>
      <MenuItem label="Join meeting"></MenuItem>

    </SlideMenu>
    <div >
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default LoggedInLayout
