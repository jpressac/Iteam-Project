import React, {Component, PropTypes} from 'react';
import { Link} from 'react-router'
import logo from '../image/iteamLogo.jpg'
import {PATHS} from '../../../constants/routes'
import AppBar from 'react-toolbox/lib/app_bar'
import Navigation from 'react-toolbox/lib/navigation'
import LogoutButton from './LogoutButton'
import {Button, IconButton} from 'react-toolbox/lib/button';
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import themeAppBar from './HeaderLog.scss'
import themeNav from './nav.scss'
import classes from './theme.scss'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  profile:() => dispatch(push('/' + PATHS.MENULOGGEDIN.PROFILE)),
  myMeeting:()=> dispatch(push('/' + PATHS.MENULOGGEDIN.MYMEETINGS)),
  meeting:()=> dispatch(push('/' + PATHS.MENULOGGEDIN.MEETING)),
  team:()=> dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM))

});
const mapStateToProps = (state)=> {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};


class HeaderLog extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (

    <header >

      <AppBar fixed flat theme={themeAppBar}  >

        <div >

          <img src={logo} style={{height:50,width:100,marginRight:300}}></img>
           
          <Navigation type="horizontal" theme={themeNav} >
            <ul className={classes.ul}>
           <li> <Button  label='HOME' accent onClick={this.props.home} /></li>
            <li><Button label='PROFILE' accent onClick={this.props.profile} /></li>
            <li><Button  label='MY MEETINGS' accent onClick={this.props.myMeeting} /></li>
           <li> <Button label='NEW MEETING' accent onClick={this.props.meeting} /></li>
            <li><Button  label='NEW TEAM' accent onClick={this.props.team} /></li>
            <li><span className = "glyphicon glyphicon-user" className={classes.span}><label> {this.props.user}</label></span ></li>
            <li><LogoutButton ></LogoutButton></li>
              </ul>
          </Navigation>
        </div>

      </AppBar>

  </header>
  );
  };
}

HeaderLog.propTypes = {
   home:PropTypes.func,
  profile:PropTypes.func,
  myMeeting:PropTypes.func,
  meeting:PropTypes.func,
  user: PropTypes.any,
  team:PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLog)
