import React, {PropTypes} from 'react'
import HeaderLog from '../../components/Header/HeaderLog'
import loggedInTheme from './loggedIn.scss'

export const LoggedInLayout = ({ children }) => (
  <div className={loggedInTheme.loggedIn}>
    <HeaderLog />
      {children}
  </div>
);

LoggedInLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default LoggedInLayout
