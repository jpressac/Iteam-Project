/**
 * Created by Randanne on 10/12/2016.
 */
import React from 'react'
import HeaderPersonal from '../../components/Header/HeaderBoards/HeaderPersonal'

export const PersonalBoard = ({ children }) => (

  <div className="text-center">
    <HeaderPersonal />
    <div>
      {children}
    </div>
  </div>

)

PersonalBoard.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default PersonalBoard
