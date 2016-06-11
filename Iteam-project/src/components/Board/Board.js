import React from 'react';
import classes from './Board.scss'
import Note from '../Note/Note.js'

class Board extends React.Component{

  render(){
    return(
    <div className={classes.board}></div>
    {this.state.notes.map(this.eachNote)
    }
  )
  }

  update(newText, i){
    var arr = this.state.notes
    arr[i]=newText
    this.setState({notes:arr})
  }
  remove(i){
    var arr = this.state.note
    arr.splice(i,1)
    this.setState({notes:arr})
  }
  eachNote(note, i){
    return(
      <Note key={i}
        index={i}
        onChange={this.update}
        onRemove={this.remove}
      >{note}</note>
    )
  }

}
