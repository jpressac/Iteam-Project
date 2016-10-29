import React, {PropTypes} from 'react'
import HeaderLog from '../../components/Header/HeaderLog'
import SlideMenu from '../../components/SlideMenu'
import MenuItem from '../../components/MenuItem'
import classes from './LoggedInLayout.scss'
import { PATHS } from '../../constants/routes'

export const LoggedInLayout = ({ children }) => (
  <div className="text-center">
    <HeaderLog />
    <div>
      {children}
    </div>
  </div>
)

LoggedInLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default LoggedInLayout
