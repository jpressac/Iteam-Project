import React, {PropTypes} from 'react'
import HeaderNotLog from '../../components/Header/HeaderNotLog'

export const NotLoggedIn = ({ children }) => (

  <div className="text-center">
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
