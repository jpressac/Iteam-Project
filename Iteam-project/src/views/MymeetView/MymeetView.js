import React from 'react'
import Mymeeting from '../../components/MymeetForm/'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

class MymeetView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <Mymeeting/>
      </div>
    )
  }
}

export default MymeetView
