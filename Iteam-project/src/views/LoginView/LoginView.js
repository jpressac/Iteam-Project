import React from 'react'
import Login from '../../components/LoginForm/'
import classes from './LoginView.scss'

class LoginView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <Login></Login>
      </div>
    )
  }
}

export default LoginView
