import React from 'react'
import NoteForm from '../../components/NoteForm/NoteForm.js'
import classes from './NoteView.scss'

export class NoteView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer} >
      <NoteForm></NoteForm>
      </div>
);
};
}
export default NoteView
