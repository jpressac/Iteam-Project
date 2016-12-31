import React from 'react'
import TeamSuggestionForm from '../../components/TeamSugestionForm'
import classes from './TeamCreationView.scss'
export class TeamCreationView extends React.Component {
  render() {
    return (
      <div className={classes.form}>
        <TeamSuggestionForm  />
      </div>
    );
  }
}

export default TeamCreationView
