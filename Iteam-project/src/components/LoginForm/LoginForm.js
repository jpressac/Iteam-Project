import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import { Button, FormGroup } from 'react-bootstrap';
import classes from './LoginForm.scss'

class LoginForm extends Component {

  render(){
    return(
      <form action="/login" method="POST" className={classes.form, "form-signin"}>
        <FormGroup>
          <TextBox type='text' label='Username'></TextBox>
          <TextBox type='password' label='Password'></TextBox>
        </FormGroup>
        <FormGroup>
          <Button type='submit' >Sign in</Button>
        </FormGroup>
      </form>
    )
  }
}

export default LoginForm
