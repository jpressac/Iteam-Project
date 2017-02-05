import React from 'react'
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
