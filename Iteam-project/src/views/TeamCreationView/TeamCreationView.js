import React from 'react'
import TeamSugestionForm from '../../components/TeamSugestionForm'
import classes from './TeamCreationView.scss'
export class TeamCreationView extends React.Component {
  render() {
    return (
      <div className={classes.form}>
        <TeamSugestionForm  />
      </div>
    );
  }
}

export default TeamCreationView
