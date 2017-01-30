import React, {Component, PropTypes}from 'react';
import classes from './HomeForm.scss'
import {PATHS} from '../../constants/routes'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import themeLabel from './label.scss'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import buttonTheme from './buttonTheme.scss'

const mapDispatchToProps = dispatch => ({

  login: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.LOGIN)),
  register: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.REGISTER)),
  meeting: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MEETING))

});

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  } else {
    return ({});
  }
}

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      userName: '',
      password: ''
    }
  };

  handleChange(key, value) {
    this.setState({[key]: value});
  };

  getStarted = () => {
    if (this.props.user != null) {
      this.props.meeting()
    }
    else {
      this.props.register()
    }
  }

  renderDialog() {
    return (
      <Dialog
        active={this.state.active}
        className={classes.form}
        onEscKeyDown={this.handleChange.bind(this, 'active', !this.state.active)}
        onOverlayClick={this.handleChange.bind(this, 'active', !this.state.active)}
        title='SING IN'>

        <form method="POST" className={classes.content}>
          <Input type='text' label='USERNAME' name='username' value={this.state.userName}
                 theme={themeLabel} onChange={this.handleChange.bind(this, 'userName')} maxLength={25}/>

          <Input type='password' label='PASSWORD' name='password' value={this.state.password}
                 theme={themeLabel} onChange={this.handleChange.bind(this, 'password')} maxLength={25}/>

          <Button type="submit" icon="done" label="SING IN" theme={buttonTheme}/>
        </form>
      </Dialog>
    )
  }

  render() {
    return (
      <div className={classes.background}>
        <label className={classes.label}> MAKE REMOTE MEETINGS</label>
        <p className={classes.p}> Online brainstorming, synthesis and collaboration</p>
        <div className="row">
          <ButtonComponent className="col-md-6" iconButton='bookmark' value='GET STARTED'
                           onClick={this.getStarted}/>
          <ButtonComponent className="col-md-6" iconButton='person' value='LOGIN'
                           onClick={this.handleChange.bind(this, 'active', !this.state.active)}/>
        </div>
        {this.renderDialog()}
      </div>
    )
  }
}

HomeForm.propTypes = {
  register: PropTypes.func,
  user: PropTypes.any,
  login: PropTypes.func,
  meeting: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeForm)
