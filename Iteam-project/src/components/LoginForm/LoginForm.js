import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import { Button, FormGroup } from 'react-bootstrap';
import classes from './LoginForm.scss'

class LoginForm extends Component {

  render(){
    return(
      <form method="POST" className={classes.form, "form-signin"}>
        <FormGroup>
          <label className="control-label">Username</label>
          <span className="input-group-btn"></span>
          <input className="form-control" type='text' placeholder='Username' name='username'/><br/>

          <label className="control-label">Password</label>
          <span className="input-group-btn"></span>
          <input className="form-control" type='password' placeholder='Password' name='password'/><br/>
        </FormGroup>
        <FormGroup>
          <Button type='submit' >Sign in</Button>
        </FormGroup>
      </form>
    )
  }
}

export default LoginForm
