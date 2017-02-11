import React from 'react'
import Meeting from '../../components/MeetingForm/'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

class MeetingView extends React.Component {

  render(){
    return(
      <div className={classes.formContainer}>
        <Meeting/>
      </div>
    )
  }
}

export default MeetingView
