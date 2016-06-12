
import React from 'react'
import LightBulbImage from '../assets/home.jpg'
import classes from './HomeView.scss'
import RegistrationForm from '../../../components/RegistrationForm'

export class HomeView extends React.Component {
  render(){
    return(
      <div className={classes.homeDiv}>
        <img align="center"
          className={classes.image}
          src={LightBulbImage} />
      </div>
)
}
}
export default HomeView
