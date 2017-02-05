import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/';
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

export class RegistrationView extends React.Component {

  render() {
    return (
      <div className={classes.formContainer}>
        <RegistrationForm />
      </div>
    );
  }
}

export default RegistrationView
