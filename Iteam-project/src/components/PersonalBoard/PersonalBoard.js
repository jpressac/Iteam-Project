import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "./PersonalBoard.scss";
import Note from "../Note/Note";
import {ItemTypes} from "../Constants/Constants";
import {Button} from 'react-toolbox';
import flow from 'lodash/flow'
import {connect as con,initWebSocket, sendNote, disconnect} from '../../websocket/websocket'
import {connect} from 'react-redux'
import {addNote, deleteNote, like, unlike, editNote} from '../../redux/reducers/Login/LoginUser';

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
    user: state.loginUser.user.username
  }
};

class PersonalBoard extends Component {

  render() {
    let notemap = this.state.notes;
    const {connectDropTarget} = this.props;

    return connectDropTarget(
      <div className={classes.board}>
        <label className={classes.label1}>PERSONAL BOARD</label>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              <Button label="Add note" onClick={this.add.bind(this, "New note")}/>
            </div>
          </div>
        </div>
        <div className={classes.Notecontainer}>
          {Object.keys(notemap).map((key) => {
              return (
                <Note key={key}
                      id={key}
                      onChange={this.update.bind(this)}
                      onRemove={this.remove.bind(this)}
                      onSend={this.send.bind(this)}
                      left={notemap[key].left}
                      top={notemap[key].top}
                      subtitle={notemap[key].subtitle}
                      boardType={notemap[key].boardType}
                      title= {notemap[key].title}/>
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
      ranking: 10,
      meetingId: 'meeting123',
      boardType: "personal"
    };

    this.setState({notes: map});
  }

  update(titleText, subtitleText, id) {
    let map = this.state.notes;
    map[id].title = titleText;
    map[id].subtitle = subtitleText;
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
    // send to shared board
    //TODO, channel es la meeting id
    sendNote("insert",'13', JSON.stringify(
      {
        "username": map[id].username,
        "title": map[id].title,
        "subtitle": map[id].subtitle
      })
    );
    this.remove(id)
  }

  componentDidMount() {
    initWebSocket();
    con();
  }

  componentWillUnmount(){
    disconnect()
  }

  constructor(props) {
    super(props);
    this.state = {notes: {}}
  }
  ;
}

PersonalBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default flow(
  DropTarget(ItemTypes.NOTE, NoteTarget,
    connection =>
      ( {
        connectDropTarget: connection.dropTarget()
      }
      )), connect(mapStateToProps))(PersonalBoard);
