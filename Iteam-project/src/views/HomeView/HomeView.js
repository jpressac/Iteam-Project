import React from 'react'
import HomeForm from '../../components/HomeForm/'
import classes from './HomeView.scss'

class HomeView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <HomeForm></HomeForm>
      </div>
    )
  }
}

export default HomeView

