import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import {Form, FormGroup, Button, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './LoginForm.scss'
import fondo from './image/fondo.jpg'
import { PATHS } from '../../constants/routes'
import { IndexLink, Link } from 'react-router'

class LoginForm extends Component {

  render(){
    return(

      <div className={"container"}>
      <div className={classes.label}  style={{marginTop:20}}>
      <label>LOGIN</label>
      </div>
      <form method="POST" className="form-singin">
                <div className={"well",classes.well} style={{width:550, height:300}} >
                      <label> </label>

                      <div className="row" >
                        <div className="form-horizontal" >
                            <div className={"form-group"}  >
                              <div className="col-md-11">
                              <div className="row">
                                <label for="username" className={"col-md-4 control-label"} style={{marginLeft:20, marginTop:30, fontSize: 17}}>USERNAME <i className="glyphicon glyphicon-pencil "></i></label>
                                <span className="input-group-btn"></span>
                                <div className="col-md-6">
                                <input type="text" className="form-control"  placeholder='Username' name='username'  style={{marginLeft:10, marginTop:30}}></input>
                                </div>
                              </div>
                              </div>
                              <div className="col-md-11">
                              <div className="row">
                                <label for="password" className="col-md-4 control-label" style={{marginLeft:20, marginTop:20, fontSize: 17}}>PASSWORD <i className="glyphicon glyphicon-pencil "></i></label>
                                <span className="input-group-btn"></span>
                                <div className="col-md-6">
                                <input  className="form-control"  type='password' placeholder='Password' name='password' style={{marginLeft:10, marginTop:20}}></input>
                                </div>
                              </div>
                                </div>
                                <div className="col-md-11">
                                  <div className="row">
                                  <label style={{marginTop:30}}>Don&#39;t have an account yet? </label>
                                  <Link to={'/' + PATHS.MENUNOTLOGGEDIN.REGISTER} activeClassName="active">  Click here to sign up </Link>

                                  </div>
                                  </div>

                                <div className="col-md-11" style={{marginTop:20}}>
                                  <div className="row">
                                  <div className="checkbox col-md-7" >
                                   <label>
                                     <input type="checkbox"/> Remember me </label>
                                  </div>
                              <div className="col-md-5">
                              <button type="submit" className={"btn btn-primary", classes.btn} style={{ marginLeft:10}}>
                                <span className="glyphicon glyphicon-ok"></span> SIGN IN
                              </button>
                              </div>
                              </div>
                              </div>

                  </div>
                    </div>
                    </div>
                    </div>
                    </form>
                  </div>


    );
  };
}

export default LoginForm
