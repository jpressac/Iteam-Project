import React from 'react'
import Mymeeting from '../../components/MymeetForm/'
import classes from './MymeetView.scss'

class MymeetView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <Mymeeting></Mymeeting>
      </div>
    )
  }
}

export default MymeetView
