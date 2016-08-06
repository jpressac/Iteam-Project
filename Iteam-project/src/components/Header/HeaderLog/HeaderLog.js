import React, {Component,PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import classes from './HeaderLog.scss'
import { Button } from 'react-bootstrap';
import logo from '../image/logo.png'
import profile from '../image/profile.jpg'
import { PATHS } from '../../../constants/routes'

class HeaderLog extends React.Component {

  render(){
    return(
      <div className={"navbar navbar-default navbar-static-top"} role="navigation">
      <div className="container">
       <div className={"navbar-header", classes.header}>
             <a className="navbar-brand" href="#">
             <img src={logo} className={classes.logo} alt="Iteam"/></a>

           <button type="button" className="navbar-toggle navbar-inverse" data-toggle="collapse" data-target=".navHeaderCollapse">
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
           </button>
           </div>
           <div  className="collapse navbar-collapse navHeaderCollapse " >
               <ul className="nav navbar-nav navbar-right ">

               <li ><Link  to={'/' + PATHS.MENUNOTLOGGEDIN.HOME} activeClassName="active">
                  <span className="glyphicon glyphicon-home"></span>HOME</Link></li>

                <li className="dropdown"><a href="#" className={"dropdown-toggle"} data-toggle="dropdown" >
               <img src={profile} className={"img-circle special-img", classes.pro}/> MY PROFILE  <b className="caret"></b></a>
               <ul className="dropdown-menu">
                   <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.PROFILE}>My profile</Link> </li>
                   <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.PROFILE}>Sing out</Link> </li>
               </ul>
               </li>

               <li className="dropdown"><a href="#" className={"dropdown-toggle"} data-toggle="dropdown" >
                  <span className="glyphicon glyphicon-paperclip"></span>MEETING <b className="caret"></b></a>
                    <ul className="dropdown-menu">
                        <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.MEETING}>NEW MEETING</Link> </li>
                        <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.MYMEETINGS}>My meetings</Link> </li>
                    </ul>
                    </li>

               <li><Link  to={'/' + PATHS.MENULOGGEDIN.NEWTEAM} activeClassName="active">
                  <span className="glyphicon glyphicon-paperclip"></span> NEW TEAM </Link></li>
               <li><Link to={'/' + PATHS.MENULOGGEDIN.BOARD} activeClassName="active">
                  <span className="glyphicon glyphicon-paperclip"></span> PERSONAL BOARD </Link></li>


             </ul>


           </div>

         </div>

       </div>



);
};
}

export default HeaderLog
