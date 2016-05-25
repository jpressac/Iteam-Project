import React, {Component,PropTypes} from 'react';
import classes from './RegistrationForm.scss'
class RegistrationForm extends Component {

  render(){
    return(
    <form role="form" className={classes.form}>
    <label for="nombre completo"> Nombre completo </label>
                  <div class="row" id="nombre completo">
                      <div class="col-md-6">
                          <div class="form-group input-group">
                              <span class="input-group-btn"></span>
                              <input class="form-control" type="text" placeholder="Nombre" id="nombre"></input>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group input-group">
                              <span class="input-group-btn"></span>
                              <input class="form-control" type="text" placeholder="Apellido" id="apellido"></input>
                          </div>
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
                            <div class="form-group">
                              <label class="control-label">Profesión</label>
                                <span class="input-group-btn"></span>
                                <input class="form-control" type="text" placeholder="Profesión" id="profesión"></input>
                            </div>
                        </div>
                  </div>
              </form>);
  };
}
export default RegistrationForm;
