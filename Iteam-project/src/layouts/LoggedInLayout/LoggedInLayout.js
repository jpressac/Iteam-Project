import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './LoggedInLayout.scss'
import { PATHS } from '../../constants/routes'

export const LoggedInLayout = ({ children }) => (
  <div className="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem  label="My profile" nav={PATHS.LOGGEDIN.PROFILE}/>
      <MenuItem  label="New meeting" nav={PATHS.LOGGEDIN.MEETING}/>
      <MenuItem  label="New team" nav={PATHS.LOGGEDIN.NEWTEAM}/>
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
