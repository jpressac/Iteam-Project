import React, {Component,PropTypes} from 'react';
import classes from './RegistrationForm.scss'
import TextBox from '../Form/TextBox/TextBox.js'
import RadioButton from '../Form/RadioButton/RadioButton.js'
import { Button } from 'react-bootstrap';
//import DatePicker from '../Form/DatePicker/DatePicker.js'

class RegistrationForm extends Component {

  render(){
    return(
    <form role="form" className={classes.form}>
    <label for="nombre completo"> Nombre completo </label>
                  <div class="row" id="datos_personales">
                      <div class="col-md-6">
                          <TextBox label="First name"></TextBox>
                      </div>
                      <div class="col-md-6">
                          <TextBox label="Last name"></TextBox>
                      </div>
                      <div class="col-md-8">
                          <div class="form-group">
                              <label class="control-label">Nacionalidad</label>
                              <div class="selectContainer">
                                  <select class="form-control" name="nacionalidad">
                                      <option value=""></option>
                                      <option value="arg">Argentina</option>
                                      <option value="br">Brasil</option>
                                      <option value="usa">EEUU</option>
                                  </select>
                              </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          //TODO datepicker
                        </div>
                        <div class="col-md-6">
                            <TextBox label="Mail"></TextBox>
                        </div>
                        <div class="col-md-6">
                            <RadioButton groupName="Sexo" label="Male"></RadioButton>
                            <RadioButton groupName="Sexo" label="Female"></RadioButton>
                        </div>
                        <div class="col-md-6">
                            <TextBox label="Profession"></TextBox>
                        </div>
                        <div class="col-md-6">
                            <TextBox label="User Name"></TextBox>
                        </div>
                        <div class="col-md-6">
                            <TextBox label="Password"></TextBox>
                        </div>
                        <div class="col-md-6">
                            <TextBox label="Repeat password"></TextBox>
                        </div>
                        <div class="col-md-6">
                            <Button type="button" bsStyle="success">Submit</Button>
                        </div>
                      </div>
              </form>);
  };
}
//DatePicker selected={this.state.date} onChange={this.handleChange}></DatePicker>
export default RegistrationForm;
