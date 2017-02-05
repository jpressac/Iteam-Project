import React from 'react'
import classes from '../PersonalBoardLayout/board.scss'

export const SharedBoard = ({children}) => (

  <div name="Shared Board Layout" className={classes.board}>
    {children}
  </div>
);

SharedBoard.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default SharedBoard
