import React from 'react'
import Profile from '../../components/ProfileForm/'
import classes from './ProfileView.scss'

class ProfileView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <Profile></Profile>
      </div>
    )
  }
}

export default ProfileView
