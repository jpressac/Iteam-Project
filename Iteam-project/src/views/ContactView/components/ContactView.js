import React, {Component,PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import classes from './ContactView.scss'


 class ContactView extends React.Component {

   handleClick(){
       console.dir(this.refs);
       console.log(this.refs.firstName.value)

       this.setState({
         firstName: this.refs.firstName.value,
         lastName: this.refs.lastName.value,

          mail: this.refs.mail.value,
          message: this.refs.message.value,

       });
     }
  render(){
    return(

            <form className="form-horizontal" role="form" ref="form">

            <div className={"form-group",classes.label}>
            <label for="contacto"> CONTACT US </label>
            </div>

              <div className={"form-group",classes.formContent}>
                        <div className={"row", "form-group"}>
                          <label className={"control-label", "col-sm-2"}> Name </label>
                            <div className="col-md-4">
                          <input type="text" className={"form-control", classes.input} placeholder= "name" label="First name" ref="firstName" ></input>
                            </div>
                          </div>

                          <div className={"form-group"}>
                              <label className={"control-label", "col-sm-2"}> Last Name </label>
                              <div className="col-md-4">
                              <input label="Last name" className={"form-control", classes.input} placeholder= "last name" ref="lastName"></input>
                          </div>
                          </div>


                          <div className={"form-group"}>
                              <label className={"control-label", "col-sm-2"}> Mail </label>
                              <div className="col-md-4">
                              <input label="Mail" className={"form-control", classes.input} placeholder= "iteam@example.com" ref="mail"></input>
                          </div>
                          </div>

                          <div className={"form-group"}>
                              <label className={"control-label", "col-sm-2"}> Message </label>
                              <div className="col-md-4">
                                  <input type="message" label="Message" className={"form-control", classes.inputMessage} placeholder= "write your message"ref="message"></input>
                              </div>
                              </div>

                              <div className={"col-md-4"}>
                                  <Button  bsStyle="danger" className={classes.buttonSend}  onClick={this.handleClick.bind(this)} >Send</Button>
                              </div>

                        </div>
                       </form>);
                };
              }

          /*  </div>

              <div className={classes.names}>
              <label for="name" className={"form-control",classes.labelNames}> First Name </label>
                <input type="text" className="form-control" id="name"></input>
              <label for="lastName" className={"form-control",classes.labelNames}> Last Name </label>
                <input type="text" className="form-control" id="lastName" ></input>
                </div>

                <div className={classes.input2}>
                <label for="email" className={"control-label",classes.labelNames}> Email </label>
                  <input type="text" className={"form-control"}  id="email" ></input>
                </div>

                <div className={classes.input3} >
                <label for="message" className={"form-control",classes.labelMessage}> Message </label>
                <input type="text"  id="message" className={"form-control",classes.inputMessage}></input>
                </div>

                  <div className={classes.button} >
                        <button type="button" className={classes.buttonSend} id="btnSend">Send </button>
                    </div>

      </div>*/


export default ContactView
