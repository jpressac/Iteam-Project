import React, { Component, PropTypes }  from 'react';
import classes from './MenuItem.scss';

class MenuItem extends Component {

    render(){
      return (<li  className={classes.menuItem}>{this.props.children}</li>);
    }
}
export default MenuItem
