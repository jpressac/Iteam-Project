import React from 'react'
import Meeting from '../../components/MeetingForm/'
import classes from './MeetingView.scss'

class MeetingView extends React.Component {

  render(){
    return(
      <div className={classes.formContainer}>
        <Meeting></Meeting>
      </div>
    )
  }
}

export default MeetingView
