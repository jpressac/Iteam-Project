import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './LoggedInLayout.scss'
import { PATHS } from '../../constants/routes.js'
import {Link} from 'react-router'

export const LoggedInLayout = ({ children }) => (
  <div className="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem  label="My profile" nav={PATHS.COMMON.ABOUT}></MenuItem>
      <MenuItem  label="New meeting" nav=""></MenuItem>
      <MenuItem  label="New team" ></MenuItem>
      <MenuItem  label="Meeting summary" ></MenuItem>
      <MenuItem  label="Join meeting"></MenuItem>

    </SlideMenu>
    <div >
      {children}
    </div>
  </div>
)

LoggedInLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default LoggedInLayout
