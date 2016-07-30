import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import {Form, FormGroup, Button, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './ProfileForm.scss'
import profile from '../Header/image/profile.jpg'
import {getUserData} from '../../redux/modules/ProfileData'
import axios from 'axios'

class ProfileForm extends Component {
  constructor(props){
    super(props);
    this.state= {
      data: []
      }
    }

    fillfields() {
      let data= this.state.data;
      this.refs.name.value= data.name;
      this.refs.lastName.value= data.lastName;
      this.refs.nationality.value= data.nationality;
      this.refs.birthday.value= data.bornDate;
      this.refs.profession.value= data.profession;
      this.refs.hobbie.value= data.hobbies;
      this.refs.userName.value= data.username;
      this.refs.mail.value= data.mail;

    }
  componentDidMount(){
    getUserData().then( () => {
      axios.get('http://localhost:8080/user'
                          ).then(function(response){
                          this.setState({ data: response.data} );
                          this.fillfields();

                    }.bind(this)).catch(function(response){
                      console.log(response.error);
                    });
    })
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
                                            <input className="form-control" ref="name" type='textarea'  name='name' style={{marginLeft:10}}></input>
                                        </div>
                                          <label for="LastName" className={"col-md-2 control-label"} style={{ fontSize: 17}}>Last Name</label>
                                          <div className="col-sm-4">
                                              <input  className="form-control" ref="lastName" type='textarea'  name='lastName' style={{marginLeft:10}}></input>
                                          </div>
                                        </div>
                                </div>

                                <div className="col-md-11">
                                        <div className="row" style={{marginTop:30}}>
                                        <label for="Nationality" className={"col-md-2 control-label"} style={{ fontSize: 17}}>Nationality</label>
                                        <div className="col-sm-4">
                                            <input  className="form-control" ref="nationality" type='textarea'  name='Nationality' style={{marginLeft:10}}></input>
                                        </div>
                                            <label for="Birthday"  className={"col-md-2 control-label"} style={{ fontSize: 17}}>Birthday</label>
                                            <div className="col-sm-4">
                                                <input disabled  className="form-control" ref="birthday" type='textarea'  name='Birthday' style={{marginLeft:10}}></input>
                                            </div>
                                          </div>
                                  </div>
                                  <div className="col-md-11">
                                      <div className="row" style={{marginTop:50}}>
                                          <label for="Profession" className={"col-md-4 control-label"} style={{ fontSize: 17}}>Profession</label>
                                          <div className="col-sm-6">
                                              <input  className="form-control" ref="profession" type='textarea'  name='Profession' style={{marginLeft:10}}></input>
                                          </div>
                                        </div>
                                  </div>


                                  <div className="col-md-11">
                                      <div className="row" style={{marginTop:30}}>
                                          <label for="Hobbie" className={"col-md-4 control-label"} style={{ fontSize: 17}}>Hobbie</label>
                                          <div className="col-sm-6">
                                              <input  className="form-control" ref="hobbie" type='textarea'  name='Hobbie' style={{marginLeft:10}}></input>
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
                                                  <input disabled  className="form-control" ref="userName" type='textarea'  name='UserName' style={{marginLeft:10}}></input>
                                              </div>
                                              <label for="Mail" className={"col-md-2 control-label"} style={{ fontSize: 17}}>Mail</label>
                                              <div className="col-sm-4">
                                                  <input  disabled  className="form-control" ref="mail" type='textarea'  name='Mail' style={{marginLeft:10}}></input>
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
