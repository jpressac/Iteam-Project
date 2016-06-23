import React, {Component,PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
import { Button } from 'react-bootstrap';

class Header extends Component {
  render(){
    return(
      <div className={"bs-docs-header", classes.navbar} id="content">
      <div className="container">
      <h1>ITEAM</h1>
      <p></p>
      </div>
      </div>
 /*<header className={"navbar navbar-static-top bs-docs-nav",classes.navbarBright} id="top" role="banner">
  <div className={"navbar-header",classes.navbarHeader}>
<a href="../"  className={"navbar-header",classes.navbarHeader}>ITEAM</a>*/




);
};
}

export default Header


/*<div className={classes.wrapper}>
  <h1 align="left" className={classes.mainHeader}>ITEAM</h1>

</div>

<header class="navbar navbar-static-top bs-docs-nav" id="top" role="banner">
<div class="container">
 <div class="navbar-header">
 <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-navbar" aria-controls="bs-navbar" aria-expanded="false">
 <span class="sr-only">Toggle navigation</span>
  <span class="icon-bar"></span> <span class="icon-bar"></span>
  <span class="icon-bar"></span>
  </button>
   <a href="../" class="navbar-brand">Bootstrap</a>

   <a href="http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/" class="v4-tease">Aww yeah, Bootstrap 4 is coming!</a>
*/
