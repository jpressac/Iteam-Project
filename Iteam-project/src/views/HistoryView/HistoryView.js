/**
 * Created by Randanne on 15/01/2017.
 */
import React from 'react';
import MeetingHistory from '../../components/MeetingsHistoryForm/MeetingHistory'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

class HistoryView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <MeetingHistory />
      </div>
    )
  }
}

export default HistoryView
