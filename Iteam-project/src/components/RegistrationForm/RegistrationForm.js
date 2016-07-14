import React, {Component} from 'react';
import {submitUser} from '../../redux/RegistrationForm/actions.js'
import NationalitiesSelect from '../NationalitiesSelect'
import axios from 'axios'

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      nationality: null,
      month: null,
      year: null,
      day: null,
      mail: null,
      male: null,
      female: null,
      profession: null,
      username: null,
      password: null,
      repeatPassword: null,
      professions: []
    };

  }
  componentDidMount() {
    let opt = [];
    debugger
    axios.get('http://localhost:8080/utilities/professions').then(function (response) {
      console.log(response.data);
      debugger
      this.fillProfessions(response.data);
  }.bind(this));

  }
  handleClick() {

    submitUser(this.state);
  }
  fillProfessions(data) {
    let opt = [];
    debugger
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
  monthChanged(event){
    let actualMonth = event.target.value;
    this.setState({month: actualMonth});
  }
  yearChanged(event){
    let actualYear = event.target.value;
    this.setState({year: actualYear});
  }
  dayChanged(event){
    let actualDay = event.target.value;
    this.setState({day: actualDay});
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
      this.setState({male: true});
    } else {
      this.setState({male: false});
    }
  }
  femaleCheckboxChanged(event) {
    let checked = event.target.checked;
    if(checked){
      this.setState({female: true });
    }else{
      this.setState({female: false });
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
                      <input type="text" className="form-control" id="inputfirstname" placeholder="Enter First Name..."
                             ref="firstName" onChange={this.firstNameChanged.bind(this)}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputlastname" className="col-md-4 control-label" >Last Name</label>
                    <div className="col-md-8">
                      <input type="text" className="form-control" id="inputlastname" placeholder="Enter Last Name..."
                             ref="lastName" onChange={this.lastNameChanged.bind(this)}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="inputdateofbirth" className="col-md-4 control-label"> Date of Birth</label>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-md-5">
                          <select className="form-control" defaultvalue="January" name="" ref="month" onChange={this.monthChanged.bind(this)}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <select name="" className="form-control" defaultvalue="1" ref="day" onChange={this.dayChanged.bind(this)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="col-md-4">
                          <select name="" className="form-control" defaultvalue="1980" ref="year" onChange={this.yearChanged.bind(this)}>
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
