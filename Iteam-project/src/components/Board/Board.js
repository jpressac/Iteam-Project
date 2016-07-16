import React, {Component,PropTypes} from 'react';
import { DropTarget } from 'react-dnd';
import classes from './Board.scss';
import Note from '../Note/Note';
import { ItemTypes } from '../Constants/Constants';


const styles = {
  width: 300,
  height: 300,
  position: 'relative'
};

const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.updatePosition(item.id, left, top);
  }
};


class Board extends Component{

  render(){
    const { connectDropTarget } = this.props;
    const { notes } = this.state;
    console.log(this)
    return connectDropTarget(
      <div className={classes.board}>
            <div className={classes.button}>
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                  onClick={this.add.bind(this, "New note")}/>
            </div>
            <div style={styles}>
                {this.state.notes.map(this.eachNote.bind(this))}
          </div>
        </div>
    );
  }

  nextId() {
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
  }

  add(text){
    var arr = this.state.notes;
    arr.push({
            id: this.nextId(),
            text: text,
            left:0,
            top:0
        });
    this.setState({notes:arr})
    this.forceUpdate();
  }

  update(newText, i){
    var arr = this.state.notes
    arr[i].text = newText;
    this.setState({notes:arr})
    this.forceUpdate();
  }

  updatePosition(id, left, top){
    var arr = this.state.notes
    arr[id].left = left;
    arr[id].top = top;
    this.setState({notes:arr})
    this.forceUpdate();
  }

  remove(i){
    var arr = this.state.notes
    arr.splice(i,1)
    this.setState({notes:arr})
    this.forceUpdate();
  }

  eachNote(notes, i){
    return(
      <Note key={i}
        id={notes.id}
        onChange= {this.update.bind(this)}
        onRemove={this.remove.bind(this)}
        left= {notes.left}
        top= {notes.top}
      >{notes.text}</Note>
    );
  }

  constructor(props){
    super(props);
    this.state= {notes:[]}
  };
}

Board.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(ItemTypes.NOTE, NoteTarget,  connect =>
        ({ connectDropTarget: connect.dropTarget()}))(Board);
