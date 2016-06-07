import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import { Button, FormGroup } from 'react-bootstrap';
import classes from './Login.scss'

class Login extends Component {

  render(){
    return(
      <form role="form" className={classes.form}>
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

export default Login
