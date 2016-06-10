import React, {Component,PropTypes} from 'react';
import classes from './RegistrationForm.scss'
import TextBox from '../Form/TextBox/TextBox.js'
import RadioButton from '../Form/RadioButton/RadioButton.js'
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {submitUser} from '../../redux/RegistrationForm/actions.js'

class RegistrationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      nationality: '',
      mail: '',
      male: '',
      female: '',
      profession: '',
      username: '',
      password: '',
      repeatPassword: ''
    }
  }
  handleClick(){
      console.dir(this.refs);
      console.log(this.refs.firstName.value)

      this.setState({
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value,
      //nationality: this.refs.nationality.value,
         mail: this.refs.mail.value,
         male: this.refs.male.value,
         female: this.refs.female.value,
         profession: this.refs.profession.value,
         username: this.refs.username.value,
         password: this.refs.password.value,
         repeatPassword: this.refs.repeatPassword.value
      });

      console.log(this.state);
      submitUser(this.state);
    }
    render(){
      return(
        <form role="form" ref="form">
        <label for="nombre completo"> Nombre completo </label>
                  <div class="row" id="datos_personales">
                      <div className="form-inline" class="col-md-6">
                      <label> Nombre </label>
                          <input type="text" className="form-control" label="First name" ref="firstName" ></input>
                      </div>
                      <div className="form-inline" class="col-md-6">
                          <label> Apellido </label>
                          <input label="Last name" className="form-control" ref="lastName"></input>
                      </div>
                      <div className="form-inline" class="col-md-8">
                          <div class="form-group">
                              <label className="control-label" >Nacionalidad</label>
                          </div>
                      </div>
                      <div className="form-inline" class="col-md-6">
                            <label className="control-label" >Mail</label>
                            <input type="email" label="Mail" className="form-control" ref="mail"></input>
                        </div>
                        <div class="col-md-6">
                        <label className="control-label" >Male</label>
                            <input type="radio" className="form-control" groupName="Sexo" ref="male"></input>
                        <label className="control-label" >Male</label>    
                            <input type="radio" className="form-control" groupName="Sexo" ref="female"></input>
                        </div>
                        <div className="form-inline" class="col-md-6">
                              <label className="control-label" >Profesión</label>
                            <input type="text" className="form-control" ref="profession"></input>
                        </div>
                        <div className="form-inline" class="col-md-6">
                              <label className="control-label" >Nombre de usuario</label>
                            <input type="text" className="form-control" ref="username"></input>
                        </div>
                        <div className="form-inline" class="col-md-6">
                              <label className="control-label" >Password</label>
                            <input type="password" label="Password" className="form-control" ref="password"></input>
                        </div>
                        <div className="form-inline" class="col-md-6">
                              <label className="control-label" >Repeat Password</label>
                            <input type="password" label="Repeat password" className="form-control" ref="repeatPassword"></input>
                        </div>
                        <div class="col-md-6">
                            <Button  bsStyle="success" onClick={this.handleClick.bind(this)} >Register</Button>
                        </div>
                      </div>
              </form>);
  };
}
export default RegistrationForm
