import React, {Component, PropTypes} from 'react';
import {IndexLink, Link} from 'react-router'
import classes from './HeaderNotLog.scss'
import {Button} from 'react-bootstrap';
import logo from '../image/logo.png'
import {PATHS} from '../../../constants/routes'
import GoogleLogin from 'react-google-login'
import axios from 'axios'


var onSignIn = function (response) {
  console.log('puto el que lee ' + response.googleId);
  console.log('puto el que lee ' + response.tokenId);
  console.log('puto el que lee ' + response.profileObj.name);
  console.log('puto el que lee ' + response.profileObj.email);
  console.log('puto el que lee ' + response.profileObj.givenName);
  console.log('puto el que lee ' + response.profileObj.familyName);
  console.log('puto el que lee ' + response.profileObj.imageUrl);

  //first implementation of google token_id
  axios({
    url: 'http://localhost:8080/usergoogle',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: {
      tokenId: response.tokenId
    }
  }).then((responsePost) => {
    //ver que hacer aca
    console.log('hola puto ' + responsePost.status)
    console.log('hola puto ' + responsePost.data)
    console.log('hola puto ' + responsePost.headers)
  }).catch((responsePost) => {
    //ver que hacer con las excepciones
    console.log('te cagaste puto ' + responsePost)
  })

};

class HeaderNotLog extends Component {
  render() {
    return (

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
          <div id="navbar3" className="navbar-collapse collapse">
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
                <span className="glyphicon glyphicon-log-in"></span> Login </Link>
                <GoogleLogin clientId="89509495276-65c7sk1u2vl5csup6gv0542oi3eg459j.apps.googleusercontent.com"
                             buttonText="Google Sign in" callback={onSignIn}/>
              </li>

            </ul>


          </div>

        </div>

      </div>



    );
  };
}

export default HeaderNotLog
