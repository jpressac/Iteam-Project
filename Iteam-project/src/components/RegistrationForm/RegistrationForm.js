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
      nationality: null,
      date: null,
      mail: '',
      gender: null,
      profession: null,
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
    debugger
    let errors2 = {};
    if (!validator.isNull(this.state.mail)) {
      if (!validator.isEmail(this.state.mail)) {
        errors2.mail = 'Invalid email address';
      }
    } else {
      errors2.mail = 'Required field';
    }
    if (!validator.isNull(this.state.firstName)) {
      if (!validator.isAlpha(this.state.firstName)) {
        errors2.name = 'Invalid name';
      }
    } else {
      errors2.name = 'Required field';
    }
    if(!validator.isNull(this.state.lastName)) {
      if (!validator.isAlpha(this.state.lastName)) {
        errors2.lastName = 'Invalid last name';
      }
    } else{
        errors2.lastName = 'Required field';
    }
    this.setState({errors: errors2});
      //submitUser(this.state);
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
  validateBeforeCreation() {
      debugger
      if (!/.+@.+\..+/.test(this.state.mail)) {
      //if(!validator.isEmail(this.state.mail)){
        this.setState({error :'Invalid mail'});
        console.log('enbtreo');
      }
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
                  </div>
                  <div className="form-group">
                    <label for="inputUsername" className="col-md-4">Nationality</label>
                    <div className="col-md-8">
                      <NationalitiesSelect  onchange={this.nationalityChanged.bind(this)}></NationalitiesSelect>
                    </div>
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
                        <option value ="" default>  </option>
                        {this.state.professions}
                      </select>
                    </div>
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
                      <label htmlFor="inputconfirmpassword">{this.state.errors.password}</label>
                    </div>
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
