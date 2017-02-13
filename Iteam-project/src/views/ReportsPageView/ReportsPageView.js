
import React from 'react'
import ReportsPageForm from '../../components/ReportsPageForm/ReportsPageForm'
import classes from './ReportsPageView.scss'

export class ReportsPageView extends React.Component {
  render() {
    return (
      <div className={classes.form}>
        <ReportsPageForm  />
      </div>
    );
  }
}

export default ReportsPageView
