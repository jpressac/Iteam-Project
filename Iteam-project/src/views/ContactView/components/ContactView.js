import React from 'react'
import creative from '../assets/creative.jpg'
import classes from './ContactView.scss'


export class ContactView extends React.Component {
  render(){
    return(
      <div className="form-group">

            <div className={classes.label}>
            <label for="contacto"> CONTACT US </label>

            </div>

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

      </div>
)

}
}
// var styles = StyleSheet.create({
// container: {
//      flex: 1,
//      justifyContent: 'center',
//      alignItems: 'center',
//      backgroundColor: '#F5FCFF',
//      flexDirection: 'column',
// },
//      backgroundImage:{
//      width:320,
//      height:480,
//    }
// });
export default ContactView
