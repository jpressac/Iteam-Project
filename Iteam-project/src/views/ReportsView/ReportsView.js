import React from 'react'
import ReportsForm from '../../components/ReportsForm/ReportForm'
import classes from '../ViewContainerCSS/ViewContainer.scss'

export class ReportsView extends React.Component {
  render() {
    return (
      <div className={classes.form}>
        <ReportsForm  />
      </div>
    );
  }
}

export default ReportsView
