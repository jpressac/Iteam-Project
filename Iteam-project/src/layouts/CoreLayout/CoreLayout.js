import React, {PropTypes} from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
  <div class="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem label="Login" ></MenuItem>
      <MenuItem label="Register"></MenuItem>
      <MenuItem label="About us"></MenuItem>
      <MenuItem label="How to?"></MenuItem>

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
