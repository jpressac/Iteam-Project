import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <header className={classes.navbarBright} role="banner">
  <div className={classes.navbarHeader}>
  <h1  className={classes.navbarBrand}>ITEAM</h1>
  </div>
  </header>

)

export default Header
/*<div className={classes.wrapper}>
  <h1 align="left" className={classes.mainHeader}>ITEAM</h1>

</div>
*/
