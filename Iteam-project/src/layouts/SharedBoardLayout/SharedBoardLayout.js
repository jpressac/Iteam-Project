import React from 'react'
import classes from '../../components/ComponentCSSForms/componentCSS.scss'

export const SharedBoard = ({children}) => (

  <div name="Shared Board Layout" className={classes.containerBoard}>
    {children}
  </div>
);

SharedBoard.propTypes = {
  children: React.PropTypes.element.isRequired
};
