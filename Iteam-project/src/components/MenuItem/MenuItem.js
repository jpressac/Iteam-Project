import React, { Component, PropTypes }  from 'react';
import {Link} from 'react-router';
import classes from './MenuItem.scss';
import {PATHS} from '../../constants/routes.js'
export class MenuItem extends React.Component {


    render(){
      const {label,nav}= this.props;

      return (
        <div className={classes.menuItem}>
        <li className={"sidebar-brand", classes.bullet}>
          <Link to={'/' + nav} activeClassName="active" className={classes.menuItem}>
          {label}
          </Link>
          </li>
        </div>

      )

    }
}
MenuItem.propTypes = {
  label: PropTypes.string,
  nav: PropTypes.string
  }

export default MenuItem
