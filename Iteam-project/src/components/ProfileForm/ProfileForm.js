import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import {Form, FormGroup, Button, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './ProfileForm.scss'
import profile from '../Header/image/profile.jpg'
import axios from 'axios'

class ProfileForm extends Component {
  getData(){
    //TODO: USAR USER AUTENTICATED PARA OBTENER USERNAME
     axios
  }
  render(){
    return(

      <div className={"container"}>

                  <div className={classes.label}  style={{marginTop:20}}>
                        <label>MY PROFILE</label>
                        </div>
                    <div className={"well",classes.well} style={{width:850, height:850}} >
                        <label> </label>

                      <div className="row" >
                        <div className="form-horizontal" >
                            <div className={"form-group"}  >

                              <div className="add-photo settings change avatar-added"   data-hook="upload">
                               <img src={profile} className={"img-circle special-img", classes.pro} />
                               <div data-hook="webcam"></div>
                                   </div>

                                <div >
                                   <label className={classes.label2}>PERSONAL INFORMATION</label>
                                  </div>
                              <div className="col-md-11">
                                      <div className="row" style={{marginTop:30}}>
                                        <label for="Name" className={"col-md-2 control-label"} style={{ fontSize: 17}}>First Name</label>
                                        <div className="col-sm-4">
                                            <input className="form-control"  type='textarea'  name='textarea' style={{marginLeft:10}}></input>
                                        </div>
                                          <label for="LastName" className={"col-md-2 control-label"} style={{ fontSize: 17}}>Last Name</label>
                                          <div className="col-sm-4">
                                              <input  className="form-control"  type='password'  name='password' style={{marginLeft:10}}></input>
                                          </div>
                                        </div>
                                </div>

                                <div className="col-md-11">
                                        <div className="row" style={{marginTop:30}}>
                                        <label for="Nationality" className={"col-md-2 control-label"} style={{ fontSize: 17}}>Nationality</label>
                                        <div className="col-sm-4">
                                            <input  className="form-control"  type='textarea'  name='Nationality' style={{marginLeft:10}}></input>
                                        </div>
                                            <label for="Birthday"  className={"col-md-2 control-label"} style={{ fontSize: 17}}>Birthday</label>
                                            <div className="col-sm-4">
                                                <input disabled  className="form-control"  type='textarea'  name='Birthday' style={{marginLeft:10}}></input>
                                            </div>
                                          </div>
                                  </div>
                                  <div className="col-md-11">
                                      <div className="row" style={{marginTop:50}}>
                                          <label for="Profession" className={"col-md-4 control-label"} style={{ fontSize: 17}}>Profession</label>
                                          <div className="col-sm-6">
                                              <input  className="form-control"  type='textarea'  name='Profession' style={{marginLeft:10}}></input>
                                          </div>
                                        </div>
                                  </div>
                                  <div className="col-md-11">
                                      <div className="row" style={{marginTop:30}}>
                                          <label for="Hobbie" className={"col-md-4 control-label"} style={{ fontSize: 17}}>Hobbie</label>
                                          <div className="col-sm-6">
                                              <input  className="form-control"  type='textarea'  name='Hobbie' style={{marginLeft:10}}></input>
                                          </div>
                                        </div>
                                  </div>

                                  <div >
                                   <label className={classes.label2}>ACCOUNT INFORMATION</label>
                                    </div>
                                    <div className="col-md-11">
                                            <div className="row" style={{marginTop:30}}>
                                              <label for="UserName" className={"col-md-2 control-label"} style={{ fontSize: 17}}>User Name</label>
                                              <div className="col-sm-4">
                                                  <input disabled  className="form-control"  type='textarea'  name='UserName' style={{marginLeft:10}}></input>
                                              </div>
                                                <label for="Password" className={"col-md-2 control-label"} style={{ fontSize: 17}}>Password</label>
                                                <div className="col-sm-4">
                                                    <input disabled  className="form-control"  type='password'  name='password' style={{marginLeft:10}}></input>
                                                </div>
                                              </div>
                                      </div>
                                      <div className="col-md-11">
                                          <div className="row" style={{marginTop:30}}>
                                              <label for="Mail" className={"col-md-4 control-label"} style={{ fontSize: 17}}>Mail</label>
                                              <div className="col-sm-6">
                                                  <input  disabled  className="form-control"  type='textarea'  name='Mail' style={{marginLeft:10}}></input>
                                              </div>
                                            </div>
                                      </div>
                                      <div className="col-md-12">
                                          <div className="row" style={{marginTop:30}}>
                                          <div className="col-sm-6">
                                          <button type="button" className={"btn btn-primary", classes.btn} style={{marginTop:40}}>
                                            <span className="glyphicon glyphicon-ok"></span> SAVE CHANGES
                                          </button>
                                          </div>
                                          <div className="col-sm-6">
                                          <button type="button" className={"btn btn-primary", classes.btn} style={{marginTop:40}}>
                                            <span className="glyphicon glyphicon-remove"></span> DISCARD
                                          </button>
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
