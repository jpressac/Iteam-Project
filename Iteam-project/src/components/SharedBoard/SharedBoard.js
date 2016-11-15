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
import flow from 'lodash/flow'
import {connect} from 'react-redux'
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
import Drawer from 'react-toolbox/lib/drawer';
import { IconButton } from 'react-toolbox/lib/button';
import Clients from '../BoardSidebar/users'

const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.onUpdatePosition(item.id, left, top);
  }
};

const mapStateToProps = (state) => {
  if (state.meetingReducer != null) {
    return {
      meetingId: state.meetingReducer.meetingId
    }
  }
}
const mapDispatchToProps = (dispatch) => ({

  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))

});

class SharedBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      teamName: '',
      participants: []
    }
  }

  componentDidMount(){
    //Connect with socket
    connectAndSubscribe(this.props.meetingId, this.receiveNote.bind(this));
    //Get team participants for sidebar
    this.getTeam(this.props.meetingId);
  }

  componentWillMount(){
    //Getting notes already shared in the board before rendering
    axios.get('http://localhost:8080/meeting/meetinginfo?meetingId=' + this.props.meetingId).then((response) => {
      if(response.data !== ""){
        this.setState({notes: response.data});
      }
    }).catch((response) => {
      console.log('error ' + response)
    })
  }

  componentWillUnmount() {
    //End socket connection
    disconnect()
  }
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

  //Method for generating note unique ID
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
        meetingId: this.props.meetingId
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
    sendNote(action, this.props.meetingId , JSON.stringify(
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

  getTeam = (meetingId) => {
    axios.get('http://localhost:8080/team/users/bymeeting?meetingId=' + meetingId
    ).then(function (response) {
      console.log('TEAM INFO' + JSON.stringify(response.data));
      this.setState({teamName: response.data["teamId"]});
      this.getTeamParticipants(response.data["teamUsers"]);
      console.log('State' + this.state.teamName);
    }.bind(this));
  };

  getTeamParticipants = (teamParticipants) => {

    console.log(teamParticipants);
    let participantInfo = teamParticipants.map(function(participant,index) {
      let userInfo = {};

      userInfo["username"] = participant["username"];
      userInfo["status"] = 'false';
      return userInfo;
    });
    this.setState({participants:participantInfo})
    console.log('PARTI' + this.state.participants);
  };
  sendUpdate(action, id) {
    let map = this.state.notes;
    //TODO, channel es la meeting id
    sendNote(action, this.props.meetingId , JSON.stringify(
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
        "boardType": "shared",
        "tag": map[id].tag
      }
      )
    )

  }

  sendUpdateCache(action, payload) {
    sendNote(action, this.props.meetingId, JSON.stringify(payload));

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
          meetingId: this.props.meetingId,
          boardType: "shared",
          tag: jsonPayloadMessage.tag
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
            meetingId: this.props.meetingId,
            boardType: "shared",
            tag: jsonPayloadMessage.tag
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

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

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
            <IconButton icon="menu" inverse onClick={this.handleToggle}/>
          </div>
          <div className="col-md-4">
            <button type="button" className={" btn btn-success"}
                    onClick={this.props.onClick}> GENERATE REPORT
            </button>
          </div>
        </div>
        <div className={classes.Notecontainer}>
          {this.createNotes(this.state.notes)}
        </div>
        <Drawer active={this.state.active} theme={classes}
                type="right"
                onOverlayClick={this.handleToggle}>
          <Clients clients={this.state.participants} teamName={this.state.teamName}/>
        </Drawer>
      </div>
    );
  }
}

SharedBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  meetingId: PropTypes.string,
  onClick : PropTypes.func
};

export default flow(
  DropTarget(ItemTypes.NOTE, NoteTarget,
    connect =>
      ( {
        connectDropTarget: connect.dropTarget()
      }
      )),connect(mapStateToProps,mapDispatchToProps))(SharedBoard);

