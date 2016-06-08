import React, {Component} from 'react';
import classes from './RegistrationForm.scss'
import TextBox from '../Form/TextBox/'
import RadioButton from '../Form/RadioButton/'
import { Button } from 'react-bootstrap';
//import DatePicker from '../Form/DatePicker/DatePicker.js'

class RegistrationForm extends Component {

  render(){
    return(
    <form role="form" className={classes.form}>
    <label for="nombre completo"> Nombre completo </label>
                  <div className="row" id="datos_personales">
                      <div className="col-md-6">
                          <TextBox label="First name"></TextBox>
                      </div>
                      <div className="col-md-6">
                          <TextBox type="text" label="Last name"></TextBox>
                      </div>
                      <div className="col-md-8">
                          <div className="form-group">
                              <label className="control-label">Nationality</label>
                              <div className="selectContainer">
                                  <select className="form-control" name="nacionalidad">
                                      <option value=""></option>
                                      <option value="arg">Argentina</option>
                                      <option value="br">Brasil</option>
                                      <option value="usa">EEUU</option>
                                  </select>
                              </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          //TODO datepicker
                        </div>
                        <div className="col-md-6">
                            <TextBox type="email" label="Mail"></TextBox>
                        </div>
                        <div className="col-md-6">
                            <RadioButton groupName="Sexo" label="Male"></RadioButton>
                            <RadioButton groupName="Sexo" label="Female"></RadioButton>
                        </div>
                        <div className="col-md-6">
                            <TextBox type="text" label="Profession"></TextBox>
                        </div>
                        <div className="col-md-6">
                            <TextBox type="text" label="Username"></TextBox>
                        </div>
                        <div className="col-md-6">
                            <TextBox type="password" label="Password"></TextBox>
                        </div>
                        <div className="col-md-6">
                            <TextBox type="password" label="Repeat password"></TextBox>
                        </div>
                        <div className="col-md-6">
                            <Button type="submit" bsStyle="success">Register</Button>
                        </div>
                      </div>
              </form>);
  };
}
//DatePicker selected={this.state.date} onChange={this.handleChange}></DatePicker>
export default RegistrationForm;
