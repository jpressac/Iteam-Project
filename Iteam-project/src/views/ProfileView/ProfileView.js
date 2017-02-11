import React from 'react'
import Profile from '../../components/ProfileForm/'
import classes from '../../views/ViewContainerCSS/ViewContainer.scss'

class ProfileView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <Profile/>
      </div>
    )
  }
}

export default ProfileView
