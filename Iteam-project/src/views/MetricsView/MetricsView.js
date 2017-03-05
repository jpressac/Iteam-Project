import React from 'react'
import classes from './MetricsView.scss'
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
