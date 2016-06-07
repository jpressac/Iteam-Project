import React from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.js'
import classes from './RegistrationView.scss'
export class RegistrationView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer} >
        <RegistrationForm></RegistrationForm>
      </div>
)
}
}
export default RegistrationView
