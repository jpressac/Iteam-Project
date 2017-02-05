import React from 'react'
import TeamForm from '../../components/TeamForm'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

export class TeamCreationView extends React.Component {
  render() {
    return (
      <div className={classes.formContainer}>
        <TeamForm  />
      </div>
    );
  }
}

export default TeamCreationView
