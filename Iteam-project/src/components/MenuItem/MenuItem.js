import React, { Component, PropTypes }  from 'react';
import {Link} from 'react-router';
import classes from './MenuItem.scss';
import {PATHS} from '../../constants/routes.js'
export class MenuItem extends React.Component {


    render(){
      const {label,nav}= this.props;

      return (
        <div className={classes.menuItem}  style={{fontSize: '1.5rem', fontWeight: 'initial', paddingTop: '0.8rem', paddingBottom: '0.8rem'}}>
        <li>
          <Link to={'/application/' + nav} activeClassName="active">

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
