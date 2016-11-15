import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'
import {AppBar} from 'react-toolbox/lib/app_bar'
import themeAppBar from './HeaderNotLog.scss'
import themeMenu from './menu.scss'
import themeNav from './nav.scss'
import {Button} from 'react-toolbox/lib/button';
import logo from '../image/iteamLogo.jpg'
import {PATHS} from '../../../constants/routes'
import Navigation from 'react-toolbox/lib/navigation'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.HOME)),
  about: ()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.ABOUT)),
  contact: ()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.CONTACT)),
  register: ()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.REGISTER))

});

class HeaderNotLog extends React.Component {
  render() {

    return (

      <header >

        <AppBar fixed flat theme={themeAppBar}>

          <div >
            <img src={logo} style={{height:50,width:100,marginRight:400}}></img>
            <Navigation type="horizontal" theme={themeNav}>
              <Button icon='home' label='HOME' style={{color:'#900C3F'}} onClick={this.props.home}/>
              <Button icon='create' label='REGISTER' style={{color:'#900C3F'}} onClick={this.props.register}/>
              <Button icon='bookmark' label='ABOUT' style={{color:'#900C3F'}} onClick={this.props.about}/>
              <Button icon='contact_phone' label='CONTACT' style={{color:'#900C3F'}} onClick={this.props.contact}/>


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
