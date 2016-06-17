import React from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './NotLoggedIn.scss'
import { PATHS } from '../../constants/routes'

export const NotLoggedIn = ({ children }) => (

  <div className="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem label="Home" nav={PATHS.COMMON.HOME}></MenuItem>
      <MenuItem label="Login" nav={PATHS.COMMON.LOGIN}></MenuItem>
      <MenuItem label="Register" nav={PATHS.COMMON.REGISTER}></MenuItem>
      <MenuItem label="About Us" nav={PATHS.COMMON.ABOUT}></MenuItem>
      <MenuItem label="Contact" nav={PATHS.COMMON.CONTACT}></MenuItem>


      </SlideMenu>
      <div>
        {children}
      </div>
  </div>

)

NotLoggedIn.propTypes = {
  children: React.PropTypes.element.isRequired
}
export default NotLoggedIn
