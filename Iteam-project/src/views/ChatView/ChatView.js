import React from 'react'
import Chat from '../../components/Chat/Chat'
import classes from './ChatView.scss'

class ChatView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer}>
        <Chat/>
      </div>
    )
  }
}

export default ChatView
