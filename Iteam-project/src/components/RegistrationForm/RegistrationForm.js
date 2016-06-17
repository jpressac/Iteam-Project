import React, {Component} from 'react';
import classes from './RegistrationForm.scss'
import TextBox from '../Form/TextBox/'
import RadioButton from '../Form/RadioButton/'
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {submitUser} from '../../redux/RegistrationForm/actions.js'
import NationalitiesSelect from '../NationalitiesSelect'

class RegistrationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      nationality: '',
      dateOfBirth:'',
      mail: '',
      male: '',
      female: '',
      profession: '',
      username: '',
      password: '',
      repeatPassword: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){

      console.dir(this.refs);
      console.log(this.refs.firstName.value)

      this.setState({
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
        nationality: this.refs.country.value,
        dateOfBirth: this.refs.month.value + '/' + this.refs.day.value + '/' + this.refs.year.value,
        mail: this.refs.mail.value,
        male: this.refs.male.value,
        female: this.refs.female.value,
        profession: this.refs.profession.value,
        username: this.refs.username.value,
        password: this.refs.password.value,
        repeatPassword: this.refs.repeatPassword.value
      });
      console.log(this.state.dateOfBirth);
      debugger
      console.log(this.state);
      submitUser(this.state);
    }
    render(){
      return(
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
                      <input type="text" className="form-control" id="inputfirstname" placeholder="Enter First Name..." ref="firstName"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputlastname" className="col-md-4 control-label">Last Name</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputlastname" placeholder="Enter Last Name..." ref="lastName" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputdateofbirth" className="col-md-4 control-label"> Date of Birth</label>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-5">
                          <select className="form-control" defaultvalue="January"name="" ref="month">
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <select name="" className="form-control" defaultvalue="1" ref="day">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <select name="" className="form-control" defaultvalue="1980" ref="year">
                            <option value="1980">1980</option>
                            <option value="1981">1981</option>
                            <option value="1982">1982</option>
                            <option value="1983">1983</option>
                            <option value="1984">1984</option>
                            <option value="1985">1985</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputgender" className="col-md-6">Gender</label>
                    <div className="col-md-3">
                      <label>
                        <input type="radio" name="gender" ref="male"></input>
                        Male
                      </label>
                      <label>
                        <input type="radio" name="gender" ref="female"></input>
                        Female
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputUsername" className="col-md-4">Nationality</label>
                    <div className="col-md-8">
                      <NationalitiesSelect ></NationalitiesSelect>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputemail" className="col-md-4">E-mail</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputemail" placeholder=" E-mail " ref="mail"></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputprofession" className="col-md-4">Profession</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputprofession" placeholder="Profession" ref="profession"></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputusername" className="col-md-4">User name</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputusername" placeholder="User name" ref="username"></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputpassword" className="col-md-4">Password</label>
                    <div className="col-md-8">
                      <input type="password" name="" className="form-control" ref="password"></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputconfirmpassword" className="col-md-4">Confirm Password</label>
                    <div className="col-md-8">
                      <input type="password" name="" className="form-control" ref="repeatPassword" ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <input type="button" onClick={this.handleClick} value="Register" className="btn btn-success"></input>
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
// <select name="" className="form-control" defaultvalue="usa" ref="country">
//   <option value="australia">Australia</option>
//   <option value="canada">Canada</option>
//   <option value="united Kingdom">United Kingdom</option>
//   <option value="usa">USA</option>
// </select>
export default RegistrationForm
