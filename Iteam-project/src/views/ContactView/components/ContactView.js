import React from 'react'
import creative from '../assets/creative.jpg'
import classes from './ContactView.scss'

export class ContactView extends React.Component {
  render(){
    return(
        <div>
          <div className={classes.label}>
            <label for="Contanct"> CONTACT US </label>

          </div>

          <div className={classes.names}>
            <label for="name" className={classes.labelNames}> First Name </label>
            <input type="text" className="text-center" id="name"></input>
            <label for="lastName" className={classes.labelNames}> Last Name </label>
            <input type="text" className="text-center" id="lastName" ></input>
          </div>

          <div className={classes.input2}>
            <label for="email" className={classes.labelNames}> Email </label>
            <input type="text" className="text-center" id="email" ></input>
          </div>

          <div className={classes.input3} >

              <label for="message" className={classes.labelMessage}> Message </label>

              <input type="text"  id="message" className={classes.inputMessage}></input>
          </div>

        <div className={classes.button} >
                <button type="button" className={classes.buttonSend} id="btnSend">Send </button>
        </div>
      </div>
    )
  }
}

export default ContactView
