import React, {PropTypes} from 'react'
import HeaderNotLog from '../../components/Header/HeaderNotLog'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './NotLoggedIn.scss'
import { PATHS } from './../../constants/routes'

export const NotLoggedIn = ({ children }) => (

  <div className="text-center">
    <HeaderNotLog />
  
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>

)

NotLoggedIn.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default NotLoggedIn
