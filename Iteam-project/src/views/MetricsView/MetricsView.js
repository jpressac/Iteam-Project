import React from 'react'
import classes from '../ViewContainerCSS/ViewContainer.scss'
import MeetingComponent from '../../components/MetricsComponent/MetricsComponent'

class MetricsView extends React.Component {

  render(){
    return (
      <div className={classes.formContainer}>
        <MeetingComponent />
      </div>
    )
  }
}

export default MetricsView
