import React from 'react'
import RegistrationForm from '../../components/RegistrationForm/'
import classes from './RegistrationView.scss'
import {connect} from 'react-redux'
import {submitUser} from '../../redux/RegistrationForm/actions.js'

export class RegistrationView extends React.Component {
  render() {
    return (
      <div className={classes.form}>
        <RegistrationForm  />
      </div>
    );
  }
}

export default RegistrationView
