/**
 * Created by Randanne on 10/12/2016.
 */
import React from 'react'
import HeaderPersonal from '../../components/Header/HeaderBoards/HeaderPersonal'
import classes from './board.scss'

export const PersonalBoard = ({children}) => (

  <div name="Personal Board Layout" className={classes.board}>
    {children}
  </div>

);

PersonalBoard.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default PersonalBoard
