import React, {PropTypes, Component} from 'react'
import classes from './footer.scss'
import facebook from './image/facebook.png'
import twitter from './image/twitter.png'
import google from './image/google.png'
import mail from './image/mail.png'
import logo from './image/iteamLogo.jpg'
import slack from './image/slack.png'

class Footer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className={"container " + classes.footer}>
        <div className="col-md-9">
          <img className={classes.logo} src={logo}/>
          <p className={classes.links}>
            <label className={classes.labels}> &copy; Copyright 2017 iteamHTML.am </label>
            <a href="#"> Terms & conditions  </a>
          <a href="#"> Privacy policy </a>
          <a href="#">  Copyrights Notification</a>
          </p>

        </div>

        <div className={"col-md-3" + classes.socialMedia}>
            <img className={classes.button} src={slack} alt="slack" />
          <img className={classes.button} src={google} alt="google" />
          <img className={classes.button} src={mail} alt="mail" />
        <p className={classes.links}> <label className={classes.labels}>  iteam.proyecto@gmail.com</label></p>
        </div>
      </div>
    )
  }
}

export default Footer
