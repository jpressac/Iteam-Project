import React from 'react'
import TeamForm from '../../components/TeamForm'
import classes from './TeamCreationView.scss'

export class TeamCreationView extends React.Component {
  render() {
    return (
      <div className={classes.form}>
        <TeamForm  />
      </div>
    );
  }
}

export default TeamCreationView
