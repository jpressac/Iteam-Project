import React, {Component,PropTypes} from 'react';
import {  Link } from 'react-router'
import { AppBar } from 'react-toolbox/lib/app_bar'
import themeAppBar from './HeaderNotLog.scss'
import themeMenu from './menu.scss'
import themeNav from './nav.scss'
import {Button} from 'react-toolbox/lib/button';
import logo from '../image/iteamLogo.jpg'
import { PATHS } from '../../../constants/routes'
import Navigation from 'react-toolbox/lib/navigation'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.HOME)),
  about:()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.ABOUT)),
  contact:()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.CONTACT)),
  login:()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.LOGIN))

});

class HeaderNotLog extends React.Component {
  render(){

    return(

      <header >

        <AppBar fixed flat theme={themeAppBar}  >

          <div >
            <img src={logo} style={{height:50,width:100,marginRight:400}}></img>
            <Navigation type="horizontal" theme={themeNav} >
              <Button icon='bookmark' label='HOME' accent onClick={this.props.home} />
              <Button icon='bookmark' label='ABOUT' accent onClick={this.props.about} />
              <Button icon='bookmark' label='CONTACT' accent onClick={this.props.contact} />
              <Button icon='bookmark' label='LOGIN' accent onClick={this.props.login} />
              

            </Navigation>
          </div>
        </AppBar>


      </header>



);
};
}
HeaderNotLog.propTypes ={
  home:PropTypes.func,
  about:PropTypes.func,
  contact:PropTypes.func,
  login:PropTypes.func

};

export default connect(null,mapDispatchToProps) (HeaderNotLog)
