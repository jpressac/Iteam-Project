/**
 * Created by Usuario on 06/08/2016.
 */
import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "../SharedBoard/SharedBoard.scss";
import Note from "../Note/Note";
import axios from "axios";
import {ItemTypes} from "../Constants/Constants";
import {connectAndSubscribe, disconnect, sendNote} from '../../websocket/websocket'
import BootstrapModal from '../BootstrapModal/BootstrapModal'

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


  createNotes(noteMap){
    return  Object.keys(noteMap).map((key) => {
        return (
          <Note key={key}
                id={key}
                onRemove={this.remove.bind(this)}
                onAddComment={this.onChangeComment.bind(this)}
                onVote={this.onUpdateRanking.bind(this)}
                left={noteMap[key].left}
                top={noteMap[key].top}
                boardType="shared"
                comments={noteMap[key].comments}
                title={noteMap[key].title}
                subtitle={noteMap[key].subtitle}
                tag={noteMap[key].tag}
          />
        );
      });
  }


  render() {
    return this.props.connectDropTarget(
      <div className={classes.board}>
        <BootstrapModal ref="mymodal" message={this.state.message}/>
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
          {this.createNotes(this.state.notes)}
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
    let ideas = Object.values(notemap).map((value) => {
      return (
      {
        username: value.username,
        title: value.title,
        subtitle: value.subtitle,
        comments: value.comments,
        ranking: value.ranking,
        meetingId: value.meetingId,
        tag: value.tag
      }
      );
    });
    //no tener hardcodeado la url y sacar el axios de aca
    axios.post('http://localhost:8080/meeting/ideas/save', {
      ideas
    }).then(function (response) {
      this.setState({message: '¡Your notes were successfully saved!'});
      this.refs.mymodal.openModal();
      this.setState({notes: {}})
    }.bind(this)).catch(function (response) {
      this.setState({message: '¡Your notes were not saved!'});
      this.refs.mymodal.openModal();
    });
  }

  generateReport() {
    axios.get('http://localhost:8080/meeting/report', {
      params: {
        meetingId: 'meeting123'
      }
    }).then(
      function (response) {
        this.setState({message: '¡Your report was successfully generated!'});
        this.refs.mymodal.openModal();
      }
    ).catch(
      function (response) {
        this.setState({message: '¡Your report was not generated!'});
        this.refs.mymodal.openModal();
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

  onUpdatePosition(id, left, top) {
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

  onUpdateRanking(id, vote) {
    let map = this.state.notes;
    let note = map[id];
    if (note.ranking + vote >= 0) {
      note.ranking += vote;
      this.sendUpdate("update", id)
    }
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
      }
      )
    )

  }

  sendUpdateCache(action, payload) {
    sendNote(action, '13', JSON.stringify(payload));

  }

  receiveNote(payload) {

    let map = this.state.notes;
    let id = this.nextId();
    let jsonPayload = JSON.parse(payload);
    let jsonPayloadMessage;
    if (jsonPayload.action === 'updateCache') {
      console.log(jsonPayload.payload);
    } else {
      jsonPayloadMessage = JSON.parse(jsonPayload.payload);
    }
    switch (jsonPayload.action) {
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
        this.sendUpdateCache('updateCache', this.state.notes);
        break;

      case "update":
        if (map[jsonPayloadMessage.id].comments != jsonPayloadMessage.comments || (map[jsonPayloadMessage.id].left !== jsonPayloadMessage.left && map[jsonPayloadMessage.id].top !== jsonPayloadMessage.top)
          || map[jsonPayloadMessage.id].ranking !== jsonPayloadMessage.ranking) {
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
        this.setState({notes: map});
        this.sendUpdateCache('updateCache', this.state.notes);
        break;

      case "delete":
        if (map[jsonPayloadMessage.id] !== null) {
          delete map[jsonPayloadMessage.id];
        }
        this.setState({notes: map});
        this.sendUpdateCache('updateCache', this.state.notes);
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

  componentWillMount(){
    axios.get('http://localhost:8080/meeting/meetinginfo?meetingId=13').then((response) => {
      console.log('hola puteta ' + response.data);
      if(response.data !== ""){
        this.setState({notes: response.data});
      }
    }).catch((response) => {
      console.log('error ' + response)
    })
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
