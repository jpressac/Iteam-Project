import React, {PropTypes} from 'react'
import HeaderNotLog from '../../components/Header/HeaderNotLog'
import Footer from '../../components/Footer/Footer'
import notLoggedInTheme from './notLoggedIn.scss'

export const NotLoggedIn = ({children}) => (

  <div className={notLoggedInTheme.notLoggedIn}>
    <HeaderNotLog />
    {children}
 <Footer/>
  </div>
)

NotLoggedIn.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default NotLoggedIn
