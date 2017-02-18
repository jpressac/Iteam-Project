import React from 'react'
import HomeForm from '../../components/HomeForm/'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

class HomeView extends React.Component {
  render() {
    return (
      <div className={classes.formContainer}>
        <HomeForm />
      </div>
    )
  }
}

export default HomeView

