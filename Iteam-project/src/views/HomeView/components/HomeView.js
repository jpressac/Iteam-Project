
import React from 'react'
import team from '../assets/group.jpg'
import  meeting from '../assets/Creativeteam_opt.jpg'
import  report from '../assets/group4_opt.jpg'
import classes from './HomeView.scss'
import {Grid, Row, Col, Image, Carousel} from 'react-bootstrap'
import RegistrationForm from '../../../components/RegistrationForm'
import ReactDOM from 'react-dom';



export class HomeView extends React.Component {
  render(){
    return(
      <div>
        <div className={classes.label2}>
          <label>START NOW</label>
        </div>
        <img src={meeting} align="center"/>
      </div>

)
}
}
export default HomeView
