import React, {Component, PropTypes} from 'react';
import {AppBar} from 'react-toolbox/lib/app_bar'
import themeAppBar from './HeaderNotLog.scss'
import themeNav from './nav.scss'
import {Button} from 'react-toolbox/lib/button';
import logo from '../image/iteamLogo.jpg'
import {PATHS} from '../../../constants/routes'
import Navigation from 'react-toolbox/lib/navigation'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.HOME)),
  about: ()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.ABOUT)),
  contact: ()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.CONTACT)),
  register: ()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.REGISTER))

});

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

class HeaderNotLog extends React.Component {
  render() {
    return (
      <header >
        <AppBar fixed flat theme={themeAppBar}>
          <div >
            <img src={logo} style={{height:50,width:100,marginRight:400}}/>
            <Navigation type="horizontal" theme={themeNav}>
              <Button icon='home' label='HOME' style={{color:'#900C3F'}} onClick={this.props.home}/>
              <Button icon='create' label='REGISTER' style={{color:'#900C3F'}} onClick={this.props.register}/>
              <Button icon='bookmark' label='ABOUT' style={{color:'#900C3F'}} onClick={this.props.about}/>
              <Button icon='contact_phone' label='CONTACT' style={{color:'#900C3F'}} onClick={this.props.contact}/>
<GoogleLogin clientId="89509495276-65c7sk1u2vl5csup6gv0542oi3eg459j.apps.googleusercontent.com"
                             buttonText="Google Sign in" callback={onSignIn}/>
              </li>
            </Navigation>
          </div>
        </AppBar>
      </header>
    );
  };
}
HeaderNotLog.propTypes = {
  home: PropTypes.func,
  register: PropTypes.func,
  about: PropTypes.func,
  contact: PropTypes.func,
  login: PropTypes.func

};

export default connect(null, mapDispatchToProps)(HeaderNotLog)
