import React, {Component} from 'react'
import classes from './LoginForm.scss'
import {PATHS} from '../../constants/routes'
import {Link} from 'react-router'
import Input from 'react-toolbox/lib/input';
//import GoogleLogin from 'react-google-login'


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      userName:'',
      password:''

    }
  };

  handleChangeUserName = (userName, value) => {
    this.setState({...this.state, [userName]: value});
  };
  handleChangePassword = (password, value) => {
    this.setState({...this.state, [password]: value});
  };

  render() {
    return (

      <div className={"container"}>
        <div className={classes.label} style={{marginTop: 50}}>
          <label>SIGN IN</label>
        </div>
        <form method="POST" className="form-singin">

          <div className="form-horizontal">
            <div className={"form-group"}>
              <div className="col-md-11">
                <div className="row">
                  <Input type='text' label='USERNAME'  name='username' value={this.state.userName}
                         onChange={this.handleChangeUserName.bind(this, 'userName')} maxLength={150}/>

                  </div>
                </div>
              </div>
              <div className="col-md-11">
                <div className="row">
                  <Input type='password' label='PASSWORD'  name='password' value={this.state.password}
                         onChange={this.handleChangePassword.bind(this, 'password')} maxLength={150}/>

                  </div>
                </div>
              </div>
              <div className="col-md-11 col-sm-11 col-xs-12">
                <div className="row">
                  <label style={{marginTop: 30}}>Don&#39;t have an account yet? </label>
                  <div className="clearfix visible-xs-block"></div>
                  <Link to={'/' + PATHS.MENUNOTLOGGEDIN.REGISTER} activeClassName="active"> Click here to sign
                    up </Link>

                </div>
              </div>

              <div className="col-md-11 " style={{marginTop: 20}}>
                <div className="row">
                  <div className="checkbox col-md-7  col-sm-6 col-xs-8">
                    <label>
                      <input type="checkbox"/>
                      Remember me
                    </label>
                  </div>
                  <div className="col-md-5 col-sm-6 col-xs-8">
                    <button type="submit" className={"btn btn-primary", classes.btn} style={{marginLeft: 10}}>
                      <span className="glyphicon glyphicon-ok"/> SIGN IN
                    </button>
                  </div>
                </div>
              </div>


        </form>
      </div>

    );
  };
}

export default LoginForm
