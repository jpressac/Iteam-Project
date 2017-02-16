import React from 'react'
import ReportsForm from '../../components/ReportsForm/ReportForm'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

export class ReportsView extends React.Component {
  render() {
    return (
      <div className={classes.formContainer}>
        <ReportsForm  />
      </div>
    );
  }
}

export default ReportsView
