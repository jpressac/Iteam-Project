
import React from 'react'
import LightBulbImage from '../assets/home.jpg'
import classes from './HomeView.scss'
import RegistrationForm from '../../../components/RegistrationForm'

export class HomeView extends React.Component {
  render(){
    return(
      <div className={classes.homeDiv}>

        <img align="center"
          alt='This is a duck, because Redux!'
          className={classes.image}
          src={home} />
          <input type="text" className="text-center"></input>
      </div>
)
}
}
export default HomeView
