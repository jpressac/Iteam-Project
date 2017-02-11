import React from 'react'
import classes from '../../components/ComponentCSSForms/componentCSS.scss'

export const PersonalBoard = ({children}) => (

  <div name="Personal Board Layout" className={classes.containerBoard}>
    {children}
  </div>
);

PersonalBoard.propTypes = {
  children: React.PropTypes.element.isRequired
};
