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
import {sendNote, disconnect, connectAndSubscribe} from '../../websocket/websocket'


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
          </div>
          <div className="col-md-4">
            <button type="button" className={" btn btn-success"}
                    onClick={this.generateReport.bind(this)}> GENERATE REPORT
            </button>
          </div>
        </div>
        <div className={classes.Notecontainer}>
          {Object.keys(notemap).map((key) => {
              console.log(notemap[key].left + ' key:' + key);
              console.log(notemap[key].top + ' key:' + key);
              return (
                <Note key={key}
                      id={key}
                      onRemove={this.remove.bind(this)}
                      onAddComment={this.onChangeComment.bind(this)}
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

  onChangeComment(commentText, id) {
    let map = this.state.notes;
    map[id].comments = commentText;
    this.sendUpdate("update", id);
    this.setState({notes: map});
  }

  updatePosition(id, left, top) {
    let map = this.state.notes;
    map[id].left = left;
    map[id].top = top;
    this.sendUpdate("update", id);
    this.setState({notes: map});
  }

  remove(action, id) {
    let map = this.state.notes;
    delete map[id];
    this.setState({notes: map});
    //TODO, channel es la meeting id
    sendNote(action, '13', JSON.stringify(
      {
        "id": id
      })
    );
  }

  updateRancking(vote, id) {
    let map = this.state.notes;
    map[id].ranking += vote;
    this.setState({note: map})
  }

  constructor(props) {
    super(props);
    this.state = {notes: {}}
  };

  sendUpdate(action, id) {
    let map = this.state.notes;
    //TODO, channel es la meeting id
    sendNote(action, '13', JSON.stringify(
      {
        "id": id,
        "username": map[id].username,
        "title": map[id].title,
        "subtitle": map[id].subtitle,
        "left": map[id].left,
        "top": map[id].top,
        "comments": map[id].comments,
        "ranking": map[id].ranking,
        "meetingId": 'meeting123',
        "boardType": "shared"
      })
    );
  }


  receiveNote(payload) {
    let map = this.state.notes;
    let id = this.nextId();
    let jsonPayload = JSON.parse(payload);
    let jsonPayloadMessage =  JSON.parse(jsonPayload.payload);
    console.log('message: ' + jsonPayload.payload);
    console.log('message: ' + jsonPayloadMessage);
    switch (jsonPayload.action){
      case "insert":
        map[id] =
        {
          id: id,
          left: SharedBoard.generateRandomNumber(),
          top: SharedBoard.generateRandomNumber(),
          username: jsonPayloadMessage.username,
          title: jsonPayloadMessage.title,
          subtitle: jsonPayloadMessage.subtitle,
          comments: 'add comments',
          ranking: 0,
          meetingId: 'meeting123',
          boardType: "shared"
        };
        this.setState({notes: map});
        break;

      case "update":
        console.log("note id:" + jsonPayloadMessage.id);
        if (map[jsonPayloadMessage.id].comments != jsonPayloadMessage.comments || (map[jsonPayloadMessage.id].left !== jsonPayloadMessage.left && map[jsonPayloadMessage.id].top !== jsonPayloadMessage.top)) {
          console.log("belu jodida estuvo aqui " + jsonPayloadMessage.id);
          map[jsonPayloadMessage.id] =
          {
            id: jsonPayloadMessage.id,
            left: jsonPayloadMessage.left,
            top: jsonPayloadMessage.top,
            username: jsonPayloadMessage.username,
            title: jsonPayloadMessage.title,
            subtitle: jsonPayloadMessage.subtitle,
            comments: jsonPayloadMessage.comments,
            ranking: jsonPayloadMessage.ranking,
            meetingId: 'meeting123',
            boardType: "shared"
          };
        }
        console.log("juan genio " + jsonPayloadMessage.id);
        this.setState({notes: map});
        break;

      case "delete":
        if (map[jsonPayloadMessage.id] !== null) {
          delete map[jsonPayloadMessage.id];
        }
        this.setState({notes: map});
        break;

      case "default":
          //ver que hacer aca, si vale la pena ponerlo o no
            break;
    }
  }

  componentDidMount() {
    //Connect with socket
    connectAndSubscribe('13', this.receiveNote.bind(this));
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
