import React, {Component, PropTypes} from 'react'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import classes from './ContactForm.scss'
import {postContactMessage} from '../../utils/actions/contactActions'
import BootstrapModal from '../BootstrapModal/BootstrapModal'
import Spinner from '../Spinner/Spinner'

class ContactForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
      subject: '',
      modalMessage: '',
      showSpinner: false
    }
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  sendMessage() {
    if (this.state.message != '' && this.state.subject != '' && this.state.email != '' && this.state.name != '') {

      this.setState({
        showSpinner: true,
        subject: '',
        message: '',
        email: '',
        name: ''
      })

      postContactMessage(this.state.subject, this.state.email, this.state.message, 'iteamappdevelopment')
        .then(() => {
          this.setState({modalMessage: 'You message was delivered successfully', showSpinner: false})
          this.refs.contactModal.openModal()
        })
    } else {
      this.setState({modalMessage: 'Please fulfill all the fields'})
      this.refs.contactModal.openModal()
    }
  }

  render() {
    if (!this.state.showSpinner) {
      return (

        <div className={"container " + classes.contact}>
          <div className={classes.label}>
            <label>CONTACT US</label>
          </div>
          <div className={classes.form}>
            <InputComponent className={"col-md-12 " + classes.paddingZero}
                            onValueChange={this.handleChange.bind(this, 'name')} label="Name"
                            value={this.state.name} maxLength={40}/>
            <InputComponent className={"col-md-12 " + classes.paddingZero}
                            onValueChange={this.handleChange.bind(this, 'email')} type='email' label='Email address'
                            icon='email'
                            value={this.state.email} maxLength={40}/>
            <InputComponent className={"col-md-12 " + classes.paddingZero}
                            onValueChange={this.handleChange.bind(this, 'subject')} label='Subject'
                            value={this.state.subject} maxLength={40}/>
            <InputComponent className={"col-md-12 " + classes.paddingZero}
                            onValueChange={this.handleChange.bind(this, 'message')} label="Message"
                            value={this.state.message} maxLength={200}/>
            <div className="row">
              <ButtonComponent className={"col-md-12 " + classes.buttonCreate} raisedValue iconButton="send"
                               value="Send"
                               onClick={this.sendMessage.bind(this)}/>
            </div>
          </div>
          <BootstrapModal ref="contactModal" message={this.state.modalMessage}/>
        </div>
      )
    } else {
      return (
        <Spinner/>
      )
    }
  };
}
export default ContactForm
