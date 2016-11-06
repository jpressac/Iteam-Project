/**
 * Created by Randanne on 15/10/2016.
 */
import React from 'react'
import ReportsForm from '../../components/ReportsForm/ReportForm'
import classes from './ReportsView.scss'

export class RegistrationView extends React.Component {
  render() {
    return (
      <div className={classes.form}>
        <ReportsForm  />
      </div>
    );
  }
}

export default RegistrationView
