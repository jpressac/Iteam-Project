import React from 'react'
import MeetingSlackUsers from '../../components/MeetingSlackUsers'
import classes from '../ViewContainerCSS/ViewContainer.scss'


class MeetingSlackInfoView extends React.Component {

  render(){
    return(
      <div className={classes.formContainer}>
        <MeetingSlackUsers/>
      </div>
    )
  }
}

export default MeetingSlackInfoView
