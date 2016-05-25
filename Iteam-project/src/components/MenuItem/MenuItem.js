import React, { Component, PropTypes }  from 'react';
import classes from './MenuItem.scss';

export class MenuItem extends React.Component {


    render(){
      const {label}= this.props;

      return (
        <div className={classes.menuItem}  style={{fontSize: '1.5rem', fontWeight: 'initial', paddingTop: '0.8rem', paddingBottom: '0.8rem'}}>
          <i ></i>
          <span> {label}</span>
          <i className="fa fa-angle-down"></i>
        </div>
      )

    }
}
MenuItem.propTypes = {
  label: PropTypes.string
  }

export default MenuItem
