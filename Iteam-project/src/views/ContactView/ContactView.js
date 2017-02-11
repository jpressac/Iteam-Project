import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';
import classes from './ContactView.scss'

export class ContactView extends React.Component {

  render() {
    return (
      <div className={classes.formContainer}>
        <ContactForm />
      </div>
    );
  }
}

export default ContactView
