import React, {PropTypes} from 'react'
import HeaderLog from '../../components/Header/HeaderLog'
import loggedInTheme from './loggedIn.scss'
import Footer from '../../components/Footer/Footer'

export const LoggedInLayout = ({ children }) => (
  <div className={loggedInTheme.loggedIn}>
    <HeaderLog />
      {children}
    <Footer/>
  </div>
);

LoggedInLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default LoggedInLayout
