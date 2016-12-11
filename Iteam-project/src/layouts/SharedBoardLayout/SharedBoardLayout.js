/**
 * Created by Randanne on 10/12/2016.
 */
import React from 'react'
import HeaderShared from '../../components/Header/HeaderBoards/HeaderShared'

export const SharedBoard = ({ children }) => (

  <div className="text-center">
    <HeaderShared />
    <div>
      {children}
    </div>
  </div>

)

SharedBoard.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default SharedBoard
