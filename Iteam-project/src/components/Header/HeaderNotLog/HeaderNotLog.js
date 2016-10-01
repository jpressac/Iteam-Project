import React, {Component,PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import classes from './HeaderNotLog.scss'
import { PATHS } from '../../../constants/routes'

class HeaderNotLog extends React.Component {
  render(){
    return(
      <header>
      <div className={"navbar navbar-default navbar-static-top"} role="navigation">
      <div className="container">
       <div className={"navbar-header", classes.header}>

           <button type="button" className="navbar-toggle navbar-inverse" data-toggle="collapse" data-target=".navHeaderCollapse">
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
           <span class="icon-bar"></span>
           </button>
           </div>
           <div  className="collapse navbar-collapse navHeaderCollapse navbar-right" >
               <ul className="nav navbar-nav navbar-right ">

               <li ><Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.HOME} activeClassName="active">
                  <span className="glyphicon glyphicon-home"></span>HOME</Link></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.ABOUT} activeClassName="active">
                  <span className="glyphicon glyphicon-paperclip"></span>ABOUT</Link></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.CONTACT} activeClassName="active">
                  <span className="glyphicon glyphicon-paperclip"></span>CONTACT</Link></li>
               <li></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.REGISTER} activeClassName="active">
                  <span className="glyphicon glyphicon-user"></span> Register </Link></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.LOGIN} activeClassName="active">
                  <span className="glyphicon glyphicon-log-in"></span> Login </Link></li>

             </ul>


           </div>

         </div>

       </div>

</header>

);
};
}

export default HeaderNotLog
