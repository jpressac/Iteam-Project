/**
 * Created by Randanne on 10/12/2016.
 */
import React from 'react'
import HeaderShared from '../../components/Header/HeaderBoards/HeaderShared'

export const SharedBoard = ({children}) => (

  <div name="Shared Board Layout">
    {children}
  </div>

);

SharedBoard.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default SharedBoard
