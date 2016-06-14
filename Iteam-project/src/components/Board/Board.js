import React from 'react';
import classes from './Board.scss'
import Note from '../Note/Note.js'

class Board extends React.Component{

  render(){
    return(
    <div className={classes.board}>
    {this.state.notes.map(this.eachNote)
      <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
        onClick={this.add.bind(this, "New note")}/>
      </div>
        })
  }

  add(text){
    var arr = this.state.notes;
    arr.push(text);
    this.setState({notes:arr})
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
        onChange={this.update.bind(this)}
        onRemove={this.remove.bind(this)}
      >{note.note}</note>
    )
  }

  constructor(props){
    super(props);
    notes: []
  }
}

export default Board
