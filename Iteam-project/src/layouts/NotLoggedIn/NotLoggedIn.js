import React, {PropTypes} from 'react'
import HeaderNotLog from '../../components/Header/HeaderNotLog'

export const NotLoggedIn = ({ children }) => (

  <div>
    <HeaderNotLog />
    <div>
      {children}
    </div>
  </div>

)

NotLoggedIn.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default NotLoggedIn
