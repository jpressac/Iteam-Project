import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import { PATHS } from '../../constants/routes.js'
import {Link} from 'react-router'

export const LoggedInLayout = ({ children }) => (
  <div >
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem  label="My profile" nav={PATHS.LOGGEDIN.PROFILE}></MenuItem>
      <MenuItem  label="New meeting" nav={PATHS.LOGGEDIN.MEETING}></MenuItem>
      <MenuItem  label="New team" nav={PATHS.LOGGEDIN.NEWTEAM}></MenuItem>
      <MenuItem label="Meeting summary" ></MenuItem>
      <MenuItem label="Join meeting"></MenuItem>
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
