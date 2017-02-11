import React from 'react'
import MeetingConfig from '../../components/MeetingConfigForm'
import classes from '../ViewContainerCSS/ViewContainer.scss'

class MeetingConfigView extends React.Component {

  render(){
    return(
      <div className={classes.formContainer}>
        <MeetingConfig/>
      </div>
    )
  }
}

export default MeetingConfigView
