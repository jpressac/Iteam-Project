import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "./PersonalBoard.scss";
import Note from "../Note/Note";
import {ItemTypes} from "../Constants/Constants";
import {Button} from 'react-toolbox';
import {connect, sendNote} from '../../websocket/websocket'
import { addNote, deleteNote, like, unlike, editNote } from '../../redux/reducers/BoardReducer';

const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.updatePosition(item.id, left, top);
  }
};
const actionsToProps = dispatch => ({
  addNote: (text) => dispatch(addNote(text)),
  deleteNote: note => dispatch(deleteNote(note)),
  like: note => dispatch(like(note)),
  unlike: note => dispatch(unlike(note)),
  edit: (note, content) => dispatch(editNote(note, content))
});

class PersonalBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: {}
    }
  }


  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }


  static generateRandomNumber() {
    return Math.floor(Math.random() * 200) + 1;
  }

  add(text) {
    let map = this.state.notes;
    let id = this.nextId();
    map[id] =
    {
      id: id,
      left: PersonalBoard.generateRandomNumber(),
      top: PersonalBoard.generateRandomNumber(),
      username: "belen",
      content: 'No comments',
      comments: ['My first note :)'],
      ranking: 10,
      meetingId: 'meeting123'
    };

    this.setState({notes: map});
  }

  update(newText, id) {
    let map = this.state.notes;
    map[id].content = newText;
    this.setState({notes: map});
  }

  updatePosition(id, left, top) {
    let map = this.state.notes;
    map[id].left = left;
    map[id].top = top;
    this.setState({notes: map});
  }

  remove(id) {
    let map = this.state.notes;
    delete map[id];
    this.setState({notes: map});
  }
  onSendNote(){
    sendNote(this.state.notes[0].content);
  }
  render() {
    let notemap = this.state.notes;
    const {connectDropTarget} = this.props;

    return connectDropTarget(
      <div className={classes.board}>
        <label className={classes.label1}>PERSONAL BOARD</label>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <button type="button" className={" btn btn-primary"}
                      onClick={this.add.bind(this, "New note")}>
                <span className="glyphicon glyphicon-plus"/> ADD NOTE
              </button>
              <Button label="Connect" accent onClick={connect} />
              <Button label="Send Note" accent onClick={this.onSendNote.bind(this)} />
            </div>
          </div>
        </div>
        <div className={classes.Notecontainer}>
          {Object.keys(notemap).map((key) => {
              console.log(notemap[key].left + ' key:' + key);
              console.log(notemap[key].top + ' key:' + key);
              return (
                <Note key={key}
                      id={key}
                      onChange={this.update.bind(this)}
                      onRemove={this.remove.bind(this)}
                      left={notemap[key].left}
                      top={notemap[key].top}
                >{notemap[key].content}</Note>
              );
            }
          )}
        </div>
      </div>
    );
  }

}

PersonalBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  addNote: noop,
  deleteNote: noop,
  like: noop,
  unlike: noop,
  editNote: noop,
};

export default DropTarget(ItemTypes.NOTE, NoteTarget,
  connect =>
    ( {
      connectDropTarget: connect.dropTarget()
    }
    ))(PersonalBoard);
