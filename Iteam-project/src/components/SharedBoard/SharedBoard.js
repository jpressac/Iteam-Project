/**
 * Created by Usuario on 06/08/2016.
 */
import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "../SharedBoard/SharedBoard.scss";
import Note from "../Note/Note";
import axios from "axios";
import {ItemTypes} from "../Constants/Constants";
import {connectAndSubscribe, disconnect, sendMessage} from '../../websocket/websocket'
import BootstrapModal from '../BootstrapModal/BootstrapModal'
import flow from 'lodash/flow'
import {connect} from 'react-redux'
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
import {TEAM, MEETING} from '../../constants/HostConfiguration'
import Drawer from 'react-toolbox/lib/drawer';
import {Button, IconButton} from 'react-toolbox/lib/button';
import Clients from '../BoardSidebar/users';
import {userDisconnection} from '../../redux/reducers/Meeting/MeetingUserConnected'

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
      meetingId: state.meetingReducer.meetingId,
      connected: state.meetingUser,
      user: state.loginUser.user.username
    }
  }
};

const mapDispatchToProps = (dispatch) => ({

  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS)),

  userDisconnected: () => dispatch(userDisconnection())

});



class SharedBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      teamName: '',
      participants: [],
      usersConnected: [],
      filterTag: "all"
    }
  }

  componentDidMount() {
    //Connect with socket
    connectAndSubscribe(this.props.meetingId, this.receiveMessage.bind(this));
    //Getting already connected
    this.getConnectedUsers(this.props.meetingId);
    this.receiveConnectionStatus();
  }

  componentWillMount() {
    //Getting notes already shared in the board before rendering
    axios.get(MEETING.MEETING_INFO, {
      params: {
        meetingId: this.props.meetingId
      }
    }).then((response) => {

      this.setState({notes: response.data});

      //this.createNotes(response.data);
    }).catch((response) => {
      console.log('error ' + response)
    });
    //Get team participants for sidebar
    this.getTeam(this.props.meetingId);

  }

  componentWillUnmount() {
    //End socket connection
    disconnect()
  }

  renderNotes(noteMap, valueForFilter) {
    return Object.keys(noteMap).map((key) => {
      if(valueForFilter === "all"){
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
      }else {
        if (noteMap[key].tag === valueForFilter) {
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
        }
      }
    });
  }

  receiveConnectionStatus() {
    setInterval(this.getConnectedUsers(this.props.meetingId), 12000);
  }

  getConnectedUsers =(meetingId) => {
    axios.get(MEETING.MEETING_USERS, {
      params: {
        meetingId: meetingId
      }
    }).then(function(response) {
      if (response.data !== "") {
        this.setState({usersConnected: response.data["users"]});
        this.updateUsersConnected(response.data["users"]);
      }
    }.bind(this));
  };

  getTeam = (meetingId) => {
    axios.get(TEAM.TEAM_USER_BY_MEETING, {
      params: {
        meetingId: meetingId
      }
    }).then(function (response) {
      this.setState({teamName: response.data["teamId"]});
      this.getTeamParticipants(response.data["teamUsers"]);

    }.bind(this));
  };

  getTeamParticipants = (teamParticipants) => {

    let participantInfo = teamParticipants.map(function (participant, index) {
      let userInfo = {};

      userInfo["username"] = participant["username"];
      userInfo["status"] = 'Offline';
      return userInfo;
    });
    this.setState({participants: participantInfo});
  };

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

    //TODO: remove axios from here
    axios.post(MEETING.MEETING_IDEAS_SAVE, {
      ideas
    }).then(function (response) {

    }.bind(this)).catch(function (response) {

    });
  }

  handleEndMeeting() {
    this.saveNotes();
    this.props.onClick();
    this.props.userDisconnected();
  }

  handleLeaveMeeting() {
    if (this.props.connected) {
      //Request for deleting user from connected users
      axios.head(MEETING.MEETING_USER_CONNECTION, {
        headers: {
          username: this.props.user,
          meetingId: this.props.meetingId
        }
      }).then(function (reponse) {
        //TODO: see what we do here
      }.bind(this));
    }
    this.props.userDisconnected();
  }


  static generateRandomNumber() {
    return Math.floor(Math.random() * 500) + 1;
  }

  onChangeComment(commentText, id) {
    let map = this.state.notes;
    map[id].comments = commentText;

    this.setState({notes: map});
    this.sendUpdate("updateSharedBoardCache", id);
  }

  onUpdatePosition(id, left, top) {
    let map = this.state.notes;
    map[id].left = left;
    map[id].top = top;
    this.setState({notes: map});
  }

  remove(action, id) {
    let map = this.state.notes;
    let noteId = map[id].id;

    delete map[id];
    this.setState({notes: map});

    //TODO: change this method should delete the id, send the id and spring should do the work.
    sendMessage(action, this.props.meetingId, JSON.stringify(
      {
        id: noteId
      })
    );
  }

  onUpdateRanking(id, vote) {
    let map = this.state.notes;
    let note = map[id];
    if (note.ranking + vote >= 0) {
      note.ranking += vote;
      this.sendUpdate("updateSharedBoardCache", id)
    }
    this.setState({note: map})
  }

  sendUpdate(action, id) {
    let map = this.state.notes;
    sendMessage(action, this.props.meetingId, JSON.stringify(
      {
        id: map[id].id,
        username: map[id].username,
        title: map[id].title,
        subtitle: map[id].subtitle,
        left: map[id].left,
        top: map[id].top,
        comments: map[id].comments,
        ranking: map[id].ranking,
        meetingId: this.props.meetingId,
        boardType: "shared",
        tag: map[id].tag
      }));
  }

  sendUpdateCache(action, payload) {
    sendMessage(action, this.props.meetingId, JSON.stringify(payload));

  }

  receiveMessage(payload) {

    let map = this.state.notes;

    let jsonPayload = JSON.parse(payload);

    let jsonPayloadMessage = JSON.parse(jsonPayload.payload)

    switch (jsonPayload.action) {

      case "insertSharedBoard":

        //TODO:same as update.
        Object.keys(jsonPayloadMessage).map((key) => {
          map[key] =
            {
              id: key,
              left: SharedBoard.generateRandomNumber(),
              top: SharedBoard.generateRandomNumber(),
              username: jsonPayloadMessage[key].username,
              title: jsonPayloadMessage[key].title,
              subtitle: jsonPayloadMessage[key].subtitle,
              comments: 'No comments',
              ranking: 0,
              meetingId: this.props.meetingId,
              boardType: "shared",
              tag: jsonPayloadMessage[key].tag
            }
        });

        this.setState({notes: map});
        break;

      case "updateSharedBoardCache":

        if (map[jsonPayloadMessage.id].comments != jsonPayloadMessage.comments || map[jsonPayloadMessage.id].ranking != jsonPayloadMessage.ranking) {
          map[jsonPayloadMessage.id] =
            {
              id: jsonPayloadMessage.id,
              username: jsonPayloadMessage.username,
              left: jsonPayloadMessage.left,
              top: jsonPayloadMessage.top,
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
        break;

      case "updateCacheDelete":
        if (map[jsonPayloadMessage.id] !== null) {
          delete map[jsonPayloadMessage.id];
        }

        this.setState({notes: map});
        break;

      case "user disconnected":
        this.updateUsersConnected(jsonPayload.payload);
        break;

      case "default":
        //ver que hacer aca, si vale la pena ponerlo o no
        break;
    }
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
    this.getConnectedUsers(this.props.meetingId);
  };

  handleFilterTags = () => {
    this.setState({filterTag : "juan"});
  };



  updateUsersConnected(payload) {

    let usersStatus = this.state.participants.map((participant) => {
      let obj = {};

      if (this.state.usersConnected.includes(participant["username"])) {
        obj["username"] = participant["username"];
        obj["status"] = 'Online';
      } else {
        obj["username"] = participant["username"];
        obj["status"] = 'Offline';
      }
      return obj;
    });
    this.setState({participants: usersStatus});
  }

  render() {
    return this.props.connectDropTarget(
      <div className={classes.board}>
        <div className="col-md-12" style={{display: 'inline-block'}}>
          <BootstrapModal ref="mymodal" message={this.state.message}/>
          <label className={classes.label1}>SHARED BOARD</label>
          <IconButton icon="menu" style={{color: '#900C3F'}} inverse onClick={this.handleToggle}/>
          <IconButton icon="check_circle" style={{color: '#900C3F'}} inverse onClick={this.handleFilterTags}/>
        </div>
        <div className={classes.Notecontainer}>
          {this.renderNotes(this.state.notes, this.state.filterTag)}
        </div>
        <Drawer active={this.state.active} theme={classes}
                type="right"
                onOverlayClick={this.handleToggle}>
          <Clients clients={this.state.participants} teamName={this.state.teamName}/>
          <div>
            <Button style={{margin: 15, color: '#900C3F'}} target='_blank' raised
                    onClick={this.handleEndMeeting.bind(this)}>
              End meeting
            </Button>
            <Button style={{margin: 15, color: '#900C3F'}} target='_blank' raised
                    onClick={this.handleLeaveMeeting.bind(this)}>
              Leave meeting
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

SharedBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  meetingId: PropTypes.string,
  onClick: PropTypes.func,
  connect: PropTypes.bool,
  user: PropTypes.string,
  userDisconnected: PropTypes.func
};

export default flow(
  DropTarget(ItemTypes.NOTE, NoteTarget,
    connect =>
      ( {
          connectDropTarget: connect.dropTarget()
        }
      )), connect(mapStateToProps, mapDispatchToProps))(SharedBoard);

