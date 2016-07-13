import React, {Component,PropTypes} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classes from './Board.scss';
import Note from '../Note/Note';
import Square from '../Square/Square';
import BoardSquare from '../BoardSquare/BoardSquare';
import { moveNote } from './Game';

class Board extends React.Component{

  renderSquare(z) {
    const x = z % 8;
    const y = Math.floor(z / 8);
    debugger
    console.log(this);
    return (
      <div key={z}
      style={{ width: '12.5%', height: '12.5%' }}>
           <BoardSquare x={x}
                        y={y}>
                        {this.state.notes.map(this.eachNote.bind(this))}
         </BoardSquare>
      </div>
    );
  }

renderNote(x,y){
  const [noteX, noteY] = this.props.NotePosition;
  if (x === noteX && y === noteY) {
    {this.state.notes.map(this.eachNote.bind(this))}
  }
}

  render(){
    const squares = [];
    for (let z = 0; z < 5; z++) {
      squares.push(this.renderSquare(z));
    }
    return(
      <div className={classes.board}>
        <div className={classes.button}>
            <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
              onClick={this.add.bind(this, "New note")}/>
        </div>
          {squares}
      </div>
    )
  }

handleSquareClick(toX, toY) {
    moveNote(toX, toY)
  }

  nextId() {
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
  }

  add(text){
    var arr = this.state.notes;
    arr.push({
            id: this.nextId(),
            note: text
        });
    this.setState({notes:arr})
    this.forceUpdate();
  }

  update(newText, i){
    var arr = this.state.notes
    arr[i].note = newText;
    this.setState({notes:arr})
    this.forceUpdate();
  }

  remove(i){
    var arr = this.state.notes
    arr.splice(i,1)
    this.setState({notes:arr})
    this.forceUpdate();
  }

  eachNote(note, i){
    return(
      <Note key={note.id}
        index={i}
        onChange= {this.update.bind(this)}
        onRemove={this.remove.bind(this)}
      >{note.note}</Note>
    );
  }

  constructor(props){
    super(props);
    this.state= {notes:[]}
  }
}

Board.propTypes = {
  NotePosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};

export default DragDropContext(HTML5Backend)(Board);
