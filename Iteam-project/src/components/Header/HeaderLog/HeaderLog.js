import React, {Component, PropTypes} from 'react';
import {IndexLink, Link} from 'react-router'
import classes from './HeaderLog.scss'
import {Button} from 'react-bootstrap';
import logo from '../image/logo.png'
import profile from '../image/profile.jpg'
import {PATHS} from '../../../constants/routes'
import {connect} from 'react-redux'
import AppBar from 'react-toolbox/lib/app_bar'
import Avatar from 'react-toolbox/lib/avatar';
import {IconMenu, MenuItem, MenuDivider} from 'react-toolbox/lib/menu';
import {logout} from '../../../redux/reducers/Login/LoginUser'
import LogoutButton from './LogoutButton'

const mapStateToProps = (state)=> {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.name
    }
  }
}

class HeaderLog extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
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

              <li > <IconMenu icon='Meeting' position='topRight'  className={classes.menu}><b className="caret"></b>
                <li> <Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.MYMEETINGS} activeClassName="active"> <MenuItem>My meetings</MenuItem></Link></li>
                <li> <Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.MEETING} activeClassName="active"> <MenuItem>NEW MEETING</MenuItem></Link></li>

              </IconMenu></li>

              <li > <IconMenu icon='My Profile' position='topLeft' menuRipple><b className="caret"></b>
                <Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.PROFILE} activeClassName="active"> <MenuItem>MY PROFILE</MenuItem></Link>
                <Link className={classes.itemMenu} to={'/' + PATHS.MENUNOTLOGGEDIN.PROFILE} activeClassName="active"> <MenuItem>Sign Out</MenuItem></Link>
              </IconMenu></li>

              <li ><Link  to={'/' + PATHS.MENULOGGEDIN.HOME} activeClassName="active">
                <span className="glyphicon glyphicon-home"></span>HOME</Link></li>

              <li className="dropdown"><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.PROFILE} activeClassName="active">
                <img src={profile} className={"img-circle special-img", classes.pro}/> MY PROFILE  <b className="caret"></b></Link>
                <ul className="dropdown-menu">
                  <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.PROFILE} activeClassName="active">My profile</Link> </li>
                  <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.PROFILE} activeClassName="active">Sign out</Link> </li>
                </ul>
              </li>

              <li className="dropdown"><a href="" className={"dropdown-toggle"} data-toggle="dropdown" >
                <span className="glyphicon glyphicon-paperclip"></span>MEETING <b className="caret"></b></a>
                <ul className="dropdown-menu">
                  <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.MEETING} activeClassName="active">NEW MEETING</Link> </li>
                  <li><Link className={classes.itemMenu} to={'/' + PATHS.MENULOGGEDIN.MYMEETINGS} activeClassName="active">My meetings</Link> </li>
                </ul>
              </li>

              <li><Link  to={'/' + PATHS.MENULOGGEDIN.NEWTEAM} activeClassName="active">
                <span className="glyphicon glyphicon-paperclip"></span> NEW TEAM </Link></li>
              <li><Link to={'/' + PATHS.MENULOGGEDIN.BOARD} activeClassName="active">
                <span className="glyphicon glyphicon-paperclip"></span> PERSONAL BOARD </Link></li>
              <li><span className = "glyphicon glyphicon-paperclip" > {this.props.user}</span > </li>
              <li>
                <LogoutButton ></LogoutButton>
              </li>
            </ul>
          </div>
        </div>
      </div>);
  };
}

HeaderLog.propTypes = {
  user: PropTypes.any
};

export default connect(mapStateToProps)(HeaderLog)
