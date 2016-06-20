import React, { Component, PropTypes } from 'react';
//import { DragSource } from 'react-dnd';
//import { DropTarget } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
import classes from './Board.scss';
import Note from '../Note/Note.js';


// export const ItemTypes = {
//   NOTE: 'Note'
// };
//
// const BoardTarget = {
//   drop(props, monitor) {
//     moveNote(props.x, props.y);
//   }
// };
//
// function collect(connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget()
//   };
// }


class Board extends React.Component{

  render(){
    return(
      <div className={classes.board}>
      {this.state.notes.map(this.eachNote.bind(this))}
        <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
          onClick={this.add.bind(this, "New note")}/>
        </div>
        )
  }

  // renderNote(x, y) {
  //   const [noteX, noteY] = this.props.NotePosition;
  //   if (x === noteX && y === noteY) {
  //     return <Note />;
  //   }
  // }


  add(text){
    var arr = this.state.notes;
    arr.push(text);
    this.setState({notes:arr})
    this.forceUpdate();
  }

  update(newText, i){
    var arr = this.state.notes
    arr[i]=newText
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
      <Note key={i}
        index={i}
        onChange= {this.update.bind(this)}
        onRemove={this.remove.bind(this)}
      >{note}</Note>
    );
  }

  constructor(props){
    super(props);
    this.state= {notes: ['Call Bill']}
  }
}

// Board.propTypes = {
//   x: PropTypes.number.isRequired,
//   y: PropTypes.number.isRequired
// }

// export default DropTarget(ItemTypes.NOTE, BoardTarget, collect)(Board);
// export default DragDropContext(HTML5Backend)(Board);

export default Board
