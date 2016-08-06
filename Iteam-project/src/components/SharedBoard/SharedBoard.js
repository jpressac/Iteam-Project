/**
 * Created by Usuario on 06/08/2016.
 */
import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "../PersonalBoard/PersonalBoard.scss";
import Note from "../Note/Note";
import axios from "axios";
import BootstrapModal from "../BootstrapModal";
import {ItemTypes} from "../Constants/Constants";


const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.updatePosition(item.id, left, top);
  }
};


class SharedBoard extends Component {

  render() {
    let notemap = this.state.notes;
    const {connectDropTarget} = this.props;

    return connectDropTarget(
      <div className={classes.board}>
        <label className={classes.label1}>SHARED BOARD</label>
        <div className="col-md-12">
          <div className="col-md-4">
            <button type="button" className={" btn btn-success"} onClick={this.saveNotes.bind(this)}>
              SAVE
            </button>
            <BootstrapModal ref="mymodal" message={this.state.message}></BootstrapModal>
          </div>
          <div className="col-md-4">
            <button type="button" className={" btn btn-success"}
                    onClick={this.generateReport.bind(this)}> GENERATE REPORT
            </button>
            <BootstrapModal ref="mymodal" message={this.state.message}></BootstrapModal>
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


  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  saveNotes() {
    let notemap = this.state.notes;
    let ideas = Object.keys(notemap).map((key) => {
      return (
      {
        username: notemap[key].username,
        content: notemap[key].content,
        comments: notemap[key].comments,
        ranking: notemap[key].ranking,
        meetingId: notemap[key].meetingId
      }
      );
    });
    axios.post('http://localhost:8080/meeting/ideas/save', {
      ideas
    }).then(function (response) {
      console.log(response.status);
      this.setState({message: '¡Your notes were successfully saved!'});
      this.refs.mymodal.openModal();
    }.bind(this)).catch(function (response) {
      console.log(response.status);
    });
    console.log(ideas);
  }

  generateReport() {
    axios.get('http://localhost:8080/meeting/report', {
      params: {
        meetingId: 'meeting123'
      }
    }).then(
      function (response) {
        console.log(response.data);
        this.fillUsersTable(response.data);
      }
    ).catch(
      function (response) {
        console.log(response.error);
      })
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
      left: SharedBoard.generateRandomNumber(),
      top: SharedBoard.generateRandomNumber(),
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

  constructor(props) {
    super(props);
    this.state = {notes: {}}
  }
  ;
}

SharedBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(ItemTypes.NOTE, NoteTarget,
  connect =>
    ( {
      connectDropTarget: connect.dropTarget()
    }
    ))(SharedBoard);
