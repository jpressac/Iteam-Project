import React, {Component,PropTypes} from 'react';
import classes from './NoteForm.scss'
import Note from '../Note/Note.js'


class NoteForm extends Component {
  render(){
    return(
      <body>
          <Note></Note>
      </body>
    );
    };
  }
  export default NoteForm;
