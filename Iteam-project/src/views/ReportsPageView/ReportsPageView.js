
import React from 'react'
import ReportsPageForm from '../../components/ReportsPageForm/ReportsPageForm'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

export class ReportsPageView extends React.Component {
  render() {
    return (
      <div className={classes.formContainer}>
        <ReportsPageForm  />
      </div>
    );
  }
}

export default ReportsPageView
