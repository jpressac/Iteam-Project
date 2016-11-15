import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "./PersonalBoard.scss";
import Note from "../Note/Note";
import {ItemTypes} from "../Constants/Constants";
import {IconButton} from 'react-toolbox/lib/button';
import flow from 'lodash/flow'
import {connect as con, initWebSocket, sendMessage, disconnect} from '../../websocket/websocket'
import {connect} from 'react-redux'

const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.updatePosition(item.id, left, top);
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.loginUser.user.username,
    meetingId: state.meetingReducer.meetingId
  }
};

class PersonalBoard extends Component {

  createNotes(noteMap) {
    return Object.keys(noteMap).map((key) => {
      return (
        <Note key={key}
              id={key}
              onChange={this.update.bind(this)}
              onRemove={this.remove.bind(this)}
              onSend={this.send.bind(this)}
              left={noteMap[key].left}
              top={noteMap[key].top}
              subtitle={noteMap[key].subtitle}
              boardType={noteMap[key].boardType}
              title={noteMap[key].title}
              tag={noteMap[key].tag}
        />
      );
    });
  }


  render() {
    return this.props.connectDropTarget(
      <div className={classes.board}>
        <label className={classes.label1}>PERSONAL BOARD</label>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <IconButton icon="add_box" onClick={this.add.bind(this, "New note")}/>
            </div>
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
      username: this.props.user,
      title: text,
      subtitle: "No subtitle",
      comments: "No comments",
      tag: "No tag",
      ranking: 0,
      meetingId: this.props.meetingId,
      boardType: "personal"
    };

    this.setState({notes: map});
  }

  update(titleText, subtitleText, id, tag) {
    let map = this.state.notes;
    let note = map[id];
    note.title = titleText;
    note.subtitle = subtitleText;
    note.tag = tag;
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

  send(id) {
    let map = this.state.notes;
    var note = JSON.stringify(map);
    // send to shared board
    console.log(note);
    //TODO, channel es la meeting id, iria this.props.meeting
    sendMessage("insert", this.props.meetingId, JSON.stringify(
      {
        "username": map[id].username,
        "title": map[id].title,
        "subtitle": map[id].subtitle,
        "tag": map[id].tag
      })
    );
    this.remove(id)
  }

  updateConnectionStatus(action, status) {
    sendMessage(action, this.props.meetingId, JSON.stringify({
      "username": this.props.user,
      "status": status
    }));
  }

  componentDidMount() {
    initWebSocket();
    con();
    setTimeout(this.updateConnectionStatus.bind(this, 'user connected', 'Online'), 2000);
  }

  componentWillUnmount() {
    this.updateConnectionStatus('user disconnected', 'Offline');
    disconnect();
  }

  constructor(props) {
    super(props);
    this.state = {notes: {}}
  }
  ;
}

PersonalBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  user: PropTypes.any,
  meetingId: PropTypes.string
};

export default flow(
  DropTarget(ItemTypes.NOTE, NoteTarget,
    connection =>
      ( {
        connectDropTarget: connection.dropTarget()
      }
      )), connect(mapStateToProps))(PersonalBoard);
