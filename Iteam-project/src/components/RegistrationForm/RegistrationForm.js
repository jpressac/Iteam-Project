import React, {Component} from 'react';
import {submitUser} from '../../redux/RegistrationForm/actions.js'
import NationalitiesSelect from '../NationalitiesSelect'
import axios from 'axios'
import validator from 'validator'

class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      nationality: '',
      date: '',
      mail: '',
      gender: '',
      profession: '',
      username: '',
      password: '',
      repeatPassword: '',
      professions: [],
      errors: {}
    };

  }
  componentDidMount() {
    let opt = [];
    axios.get('http://localhost:8080/utilities/professions').then(function (response) {
      this.fillProfessions(response.data);
    }.bind(this));

  }
  handleClick() {
    if(this.validateBeforeCreation()){
      submitUser(this.state);

    }
  }

  fillProfessions(data) {
    let opt = [];
    if (data !== null) {
      data.map(function (option, index) {
        opt.push(
          <option key={index} value={option}>{option}</option>
        );
      }.bind(this));
      this.setState({professions: opt});
      this.forceUpdate();
    }
  }
  validateEmptyFields(fieldValue){
    if(!validator.isNull(fieldValue)){
      return false;
    }else{
      return true;
    }
  }
  validateDate(dateValue){
    if(!validator.isDate(dateValue)){
      return 'Invalid field';
    }
  }
  validateMail(mail){
    if(!validator.isEmail(mail)){
      return 'Invalid field';
    }
  }
  validateNames(name){
    if(!validator.isAlpha(name)){
      return 'Invalid field';
    }
  }
  validateBeforeCreation() {
    let errors2 = {};
    let ban = true;
    errors2.mail = this.validateEmptyFields(this.state.mail) ? 'Required field' : this.validateMail(this.state.mail);
    errors2.name = this.validateEmptyFields(this.state.firstName) ? 'Required field' : this.validateNames(this.state.firstName);
    errors2.lastName = this.validateEmptyFields(this.state.lastName) ? 'Required field' : this.validateNames(this.state.lastName);
    errors2.date = this.validateEmptyFields(this.state.date)  ? 'Required field' : this.validateDate(this.state.date);

    //validate that both of the PASSWORD fields have the same value
    if((!validator.isNull(this.state.password)) && (!validator.isNull(this.state.repeatPassword))){
      if(this.state.password !== this.state.repeatPassword){
        errors2.password = 'The passwords don&#39;t match';
      }
    }else{
        errors2.password = 'Required fields';
    }
    if(this.validateEmptyFields(this.state.gender)){
      errors2.gender = 'Required field'  ;
    }
    if(this.validateEmptyFields(this.state.nationality)){
      errors2.nationality = 'Required field';
    }
    if(this.validateEmptyFields(this.state.profession)) {
      errors2.profession = 'Required field';
    }
    
    Object.keys(errors2).forEach(function(key) {
      if(errors2[key] !== undefined){
        ban = false;
      }
    });
    this.setState({errors: errors2});
    return ban;
  }

  firstNameChanged(event) {
    let first = event.target.value;
    if(first !== ''){
      this.setState({firstName: first });
    }
  }
  lastNameChanged(event) {
    let last = event.target.value;
    if(last !== ''){
      this.setState({lastName: last });
    }
  }
  dateChanged(event) {
    let actualDate = event.target.value;
    console.log(actualDate);
    this.setState({date: actualDate});

  }
  emailChanged(event) {
    let email = event.target.value;
    if(email !== ''){
      this.setState({mail: email });
    }
  }
  usernameChanged(event) {
    let user = event.target.value;
    if (user !== '') {
      this.setState({username: user});
    }
  }
  passwordChanged(event) {
      let pass = event.target.value;
      if(pass !== ''){
        this.setState({password: pass });
      }
    }
  repeatPasswordChanged(event) {
    let repeatPass = event.target.value;
    if(repeatPass !== ''){
      this.setState({repeatPassword: repeatPass });
    }
  }
  maleCheckboxChanged(event) {
    let checked = event.target.checked;
    if (checked) {
      this.setState({gender: 'male'});
    } else {
      this.setState({gender: 'female'});
    }
  }
  femaleCheckboxChanged(event) {
    let checked = event.target.checked;
    if(checked){
      this.setState({gender: 'female' });
    }else{
      this.setState({gender: 'male' });
    }
  }
  nationalityChanged(event){
    let actualNationality = event.target.value;
    this.setState({nationality: actualNationality});
  }
  professionChanged(event){
    let actualProfession = event.target.value;
    this.setState({profession: actualProfession});
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 className="panel-title">Register</h4>
              </div>
              <div className="panel-body">
                <form className="form-horizontal">
                  <div className="form-group">
                    <label for="inputfirstname" className="col-md-4 control-label">First Name</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputfirstname"
                             ref="firstName" onChange={this.firstNameChanged.bind(this)}/>

                      <label htmlFor="inputemail">{this.state.errors.name}</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputlastname" className="col-md-4 control-label" >Last Name</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputlastname"
                             ref="lastName" onChange={this.lastNameChanged.bind(this)}/>
                      <label htmlFor="inputlastname" className="control-label">{this.state.errors.lastName}</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputdateofbirth" className="col-md-4 control-label"> Date of Birth</label>
                    <div className="col-md-8">
                     <input type="date" className="form-control" id="inputname" ref="birthDate" placeholder="" onChange={this.dateChanged.bind(this)}></input>
                      <label htmlFor="inputdateofbirth">{this.state.errors.date}</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputgender" className="col-md-6">Gender</label>
                    <div className="col-md-3">
                      <label>
                        <input type="radio" name="gender" ref="male" onClick={this.maleCheckboxChanged.bind(this)}></input>
                        Male
                      </label>
                      <label>
                        <input type="radio" name="gender" ref="female" onClick={this.femaleCheckboxChanged.bind(this)}></input>
                        Female
                      </label>
                    </div>
                    <label htmlFor="inputgender">{this.state.errors.gender}</label>
                  </div>
                  <div className="form-group">
                    <label for="cmbNationality" className="col-md-4">Nationality</label>
                    <div className="col-md-8" id="cmbNationality">
                      <NationalitiesSelect  onchange={this.nationalityChanged.bind(this)}></NationalitiesSelect>
                    </div>
                    <label htmlFor="cmbNationality">{this.state.errors.nationality}</label>
                  </div>
                  <div className="form-group">
                    <label for="inputemail" className="col-md-4">E-mail</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputemail" placeholder=" E-mail "
                             ref="mail" onChange={this.emailChanged.bind(this)}></input>
                    </div>
                    <label htmlFor="inputemail">{this.state.errors.mail}</label>
                  </div>
                  <div className="form-group">
                    <label for="inputprofession" className="col-md-4">Profession</label>
                    <div className="col-md-8">
                      <select  className="form-control" id="inputprofession" ref="profession" onChange={this.professionChanged.bind(this)}>
                        <option value ="" default> Choose a profession </option>
                        {this.state.professions}
                      </select>
                    </div>
                    <label htmlFor="inputprofession">{this.state.errors.profession}</label>
                  </div>
                  <div className="form-group">
                    <label for="inputusername" className="col-md-4">User name</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputusername" placeholder="User name"
                             ref="username" onChange={this.usernameChanged.bind(this)}></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputpassword" className="col-md-4">Password</label>
                    <div className="col-md-8">
                      <input type="password" name="" className="form-control" ref="password" onChange={this.passwordChanged.bind(this)}></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputconfirmpassword" className="col-md-4">Confirm Password</label>
                    <div className="col-md-8">
                      <input type="password" name="" className="form-control" ref="repeatPassword" onChange={this.repeatPasswordChanged.bind(this)}></input>
                    </div>
                    <label htmlFor="inputconfirmpassword">{this.state.errors.password}</label>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <input type="button" onClick={this.handleClick.bind(this)}
                             className="btn btn-success" value="Register"></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>);
  };
}
export default RegistrationForm
