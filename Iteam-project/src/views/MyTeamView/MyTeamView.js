import React from 'react'
import MyTeamsForm from '../../components/MyTeamsForm/MyTeamsForm'
import classes from './MyTeamView.scss'

class MyTeamView extends React.Component {

  render(){
    return(
      <div className={classes.formContainer}>
        <MyTeamsForm/>
      </div>
    )
  }
}

export default MyTeamView
