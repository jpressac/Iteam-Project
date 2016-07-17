import React, {Component,PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import classes from './HeaderNotLog.scss'
import { Button } from 'react-bootstrap';
import logo from '../image/logo.png'
import { PATHS } from '../../../constants/routes'

class HeaderNotLog extends Component {
  render(){
    return(
    
         <div className={"navbar navbar-inverse navbar-static-top", classes.wrapper}>
         <div className="container">
           <div className={"navbar-header"}>
             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar3">

               <span className="icon-bar"></span>
               <span className="icon-bar"></span>
               <span className="icon-bar"></span>
             </button>
             <a className="navbar-brand" href="#">
             <img src={logo} className={classes.logo} alt="Iteam"/></a>

           </div>
           <div id="navbar3" className="navbar-collapse collapse" >
               <ul className="nav navbar-nav navbar-right navbar-brand">
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



);
};
}

export default HeaderNotLog
