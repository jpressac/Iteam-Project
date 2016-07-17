import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import {Form, FormGroup, Button, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './ProfileForm.scss'
import profile from '../Header/image/profile.jpg'


class ProfileForm extends Component {

  render(){
    return(

      <div className={"container"}>
      <div className={classes.label}  style={{marginTop:20}}>
      <label>MY PROFILE</label>
      </div>
                <div className={"well",classes.well} style={{width:700, height:700}} >
                      <label> </label>

                      <div className="row" >
                        <div className="form-horizontal" >
                            <div className={"form-group"}  >
                              <div className="col-md-11">
                              <div className="col-md-3">
                               <img src={profile} className={"img-circle special-img", classes.pro} rows="3"/>
                              </div>
                              <div className="row">
                                <label for="username" className={"col-md-3 control-label"} style={{marginLeft:20, marginTop:30, fontSize: 17}}>First Name</label>
                                <div className="col-md-5">
                                    <input  className="form-control"  type='password' placeholder='Password' name='password' style={{marginLeft:10, marginTop:20}}></input>
                                </div>
                              </div>

                              <div className="col-md-11">
                                <div className="col-md-3">
                                ""
                                </div>
                                <div className="row">
                                  <label for="username" className={"col-md-3 control-label"} style={{marginLeft:20, marginTop:30, fontSize: 17}}>Last Name</label>
                                  <div className="col-md-5">
                                      <input  className="form-control"  type='password' placeholder='Password' name='password' style={{marginLeft:10, marginTop:20}}></input>
                                  </div>
                                </div>
                                </div>


                    </div>
                    </div>
                    </div>
                    </div>

                  </div></div>


    );
  };
}

export default ProfileForm
