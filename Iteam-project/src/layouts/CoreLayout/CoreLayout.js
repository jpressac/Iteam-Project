import React from 'react'
import Header from '../../components/Header'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div class="text-center">
    <Header />
    <SlideMenu  alignment="left">
      <MenuItem >Login</MenuItem>
      <MenuItem >Register</MenuItem>
      <MenuItem >About us</MenuItem>
      <MenuItem >How to?</MenuItem>
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
