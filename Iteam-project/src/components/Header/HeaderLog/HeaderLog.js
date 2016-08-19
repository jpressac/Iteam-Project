import React, {Component,PropTypes} from 'react';
import { IndexLink, Link } from 'react-router'
import classes from './HeaderLog.scss'
import { Button } from 'react-bootstrap';
import logo from '../image/logo.png'
import profile from '../image/profile.jpg'
import { PATHS } from '../../../constants/routes'
import {connect} from 'react-redux'
import Avatar from 'react-toolbox/lib/avatar';


const mapStateToProps = (state)=> {
  if(state.loginReducer.user !== null) {
    return {
      user: state.loginReducer.user.user.username
    }
  }
}

class HeaderLog extends Component {
//   //myFunction() {
//     document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
// }
  constructor(props){
    super(props);
  }

  render(){
    return(
       <div className={"navbar navbar-inverse navbar-static-top", classes.wrapper}>
         <div className="container">
           <div className={"navbar-header"}>
             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar3">

               <span className="icon-bar"/>
               <span className="icon-bar"/>
               <span className="icon-bar"/>
             </button>
             <a className="navbar-brand" href="#">
             <img src={logo} className={classes.logo} alt="Iteam"/></a>

           </div>
           <div id="navbar3" className="navbar-collapse collapse" >
               <ul className="nav navbar-nav navbar-right navbar-brand">
               <li ><Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.HOME} activeClassName="active">
                  <span className="glyphicon glyphicon-home"></span>HOME</Link></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.PROFILE} activeClassName="active">
               <img src={profile} className={"img-circle special-img", classes.pro}/> MY PROFILE  <b className="caret"></b></Link></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.MEETING} activeClassName="active">
                  <span className="glyphicon glyphicon-paperclip"></span>MEETING</Link></li>
               <li></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.NEWTEAM} activeClassName="active">
                  <span className="glyphicon glyphicon-paperclip"></span> NEW TEAM </Link></li>
               <li><Link className={classes.menus} to={'/' + PATHS.MENULOGGEDIN.BOARD} activeClassName="active">
                  <span className="glyphicon glyphicon-paperclip"></span> PERSONAL BOARD </Link></li>
               <li>
                 <Link className={classes.menus} to={'/' + PATHS.MENUNOTLOGGEDIN.HOME} activeClassName="active">
                   <span className="glyphicon glyphicon-paperclip">{this.props.user}</span>Logout</Link>

               </li>
             </ul>


           </div>

         </div>

       </div>



);
};
}

HeaderLog.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(HeaderLog)
