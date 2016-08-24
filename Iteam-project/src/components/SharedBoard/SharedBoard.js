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
import {connectAndSubscribe as conAndSub, disconnect} from '../../websocket/websocket'


const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.onUpdatePosition(item.id, left, top);
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
          </div>
          <div className="col-md-4">
            <button type="button" className={" btn btn-success"}
                    onClick={this.generateReport.bind(this)}> GENERATE REPORT
            </button>
          </div>
        </div>
        <div className={classes.Notecontainer}>
          {Object.keys(notemap).map((key) => {
              return (
                <Note key={key}
                      id={key}
                      onRemove={this.remove.bind(this)}
                      onAddComment={this.onChangeComment.bind(this)}
                      onVote={this.onUpdateRanking.bind(this)}
                      left={notemap[key].left}
                      top={notemap[key].top}
                      boardType="shared"
                      comments={notemap[key].comments}
                      title={notemap[key].title}
                      subtitle={notemap[key].subtitle}
                />
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
        content: notemap[key].title,
        comments: [notemap[key].comments],
        ranking: notemap[key].ranking,
        meetingId: notemap[key].meetingId
      }
      );
    });
    axios.post('http://localhost:8080/meeting/ideas/save', {
      ideas
    }).then(function (response) {
      this.setState({message: '¡Your notes were successfully saved!'});
      this.refs.mymodal.openModal();
    }.bind(this)).catch(function (response) {
    });
  }

  generateReport() {
    axios.get('http://localhost:8080/meeting/report', {
      params: {
        meetingId: 'meeting123'
      }
    }).then(
      function (response) {
        this.fillUsersTable(response.data);
      }
    ).catch(
      function (response) {
      })
  }

  static generateRandomNumber() {
    return Math.floor(Math.random() * 200) + 1;
  }

  onChangeComment(commentText, id) {
    let map = this.state.notes;
    map[id].comments = commentText;
    this.setState({notes: map});
  }

  onUpdatePosition(id, left, top) {
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

  onUpdateRanking(id, vote) {
    let map = this.state.notes;
    let note = map[id];
    console.log('note before ' + note.ranking);
    if (note.ranking + vote >= 0) {
      note.ranking += vote;
      console.log('note after ' + note.ranking);
    }
    this.setState({note: map})
  }

  constructor(props) {
    super(props);
    this.state = {notes: {}}
  };

  receiveNote(payload) {
    let map = this.state.notes;
    let id = this.nextId();
    let jsonPayload = JSON.parse(payload);
    map[id] =
    {
      id: id,
      left: SharedBoard.generateRandomNumber(),
      top: SharedBoard.generateRandomNumber(),
      username: jsonPayload.username,
      title: jsonPayload.title,
      subtitle: jsonPayload.subtitle,
      comments: 'add comments',
      ranking: 0,
      meetingId: 'meeting123',
      boardType: "shared"
    };
    this.setState({notes: map});
  }

  componentDidMount() {
    //Connect with socket
    conAndSub('13', this.receiveNote.bind(this))
  }

  componentWillUnmount() {
    disconnect()
  }
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
