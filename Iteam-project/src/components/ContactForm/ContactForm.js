import React, {Component, PropTypes} from 'react'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import classes from './ContactForm.scss'

class ContactForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: ''
    }
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  sendMessage() {
    //TODO: here we will need to send a message, Google will be the best choice
  }

  render() {
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
                          onValueChange={this.handleChange.bind(this, 'message')} label="Message"
                          value={this.state.message} maxLength={200}/>
          <div className="row">
            <ButtonComponent className={"col-md-12 " + classes.buttonCreate} raisedValue iconButton="send" value="Send"
                             onClick={this.sendMessage.bind(this)}/>
          </div>
        </div>
      </div>
    )
  };
}
export default ContactForm
