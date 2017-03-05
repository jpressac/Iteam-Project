import React, {Component, PropTypes} from 'react'
import {AppBar} from 'react-toolbox/lib/app_bar'
import themeAppBar from '../header.scss'
import themeNav from '../nav.scss'
import {Button} from 'react-toolbox/lib/button'
import themeButton from './buttonTheme.scss'
import logo from '../image/LogoBordo.png'
import {PATHS} from '../../../constants/routes'
import Navigation from 'react-toolbox/lib/navigation'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'

const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.HOME)),
  about: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.ABOUT)),
  contact: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.CONTACT)),
  register: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.REGISTER)),
  sharedReports: () => dispatch(push('/' + PATHS.SHARED_REPORT.REPORT_NOT_LOGGEDIN))
});

const iteamLogo= () => (
  <img className={themeAppBar.logo} src={logo}/>
)

class HeaderNotLog extends React.Component {

  render() {
    return (
      <AppBar fixed flat theme={themeAppBar} leftIcon={iteamLogo()}>
          <Navigation type='horizontal' theme={themeNav}>
            <Button icon='contact_phone' label='CONTACT' onClick={this.props.contact} theme={themeButton}/>
            <Button icon='share' label='SHARED REPORT' onClick={this.props.sharedReports} theme={themeButton}/>
            <Button icon='create' label='REGISTER' onClick={this.props.register} theme={themeButton}/>
            <Button icon='bookmark' label='ABOUT' onClick={this.props.about} theme={themeButton}/>
            <Button icon='home' label='HOME' onClick={this.props.home} theme={themeButton}/>
          </Navigation>
      </AppBar>
    );
  };
}

HeaderNotLog.propTypes = {
  home: PropTypes.func,
  register: PropTypes.func,
  about: PropTypes.func,
  contact: PropTypes.func,
  login: PropTypes.func,
  sharedReports: PropTypes.func
}

export default connect(null, mapDispatchToProps)(HeaderNotLog)
