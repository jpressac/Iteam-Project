
import React from 'react'
import LightBulbImage from '../assets/LightBulb.jpg'
import classes from './HomeView.scss'

export const HomeView = () => (
  <div className={classes.homeDiv}>
    
    <img align="center"
      alt='This is a duck, because Redux!'
      className={classes.image}
      src={LightBulbImage} />
  </div>
)

export default HomeView
