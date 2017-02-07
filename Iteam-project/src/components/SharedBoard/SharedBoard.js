/**
 * Created by Usuario on 06/08/2016.
 */
import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "../SharedBoard/SharedBoard.scss";
import Note from "../Note/Note";
import axios from "axios";
import {ItemTypes} from "../Constants/Constants";
import {connectAndSubscribe, disconnect, sendMessage} from "../../websocket/websocket";
import flow from "lodash/flow";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {PATHS} from "../../constants/routes";
import {TEAM, MEETING} from "../../constants/HostConfiguration";
import Drawer from "react-toolbox/lib/drawer";
import {Layout, NavDrawer, Panel, Sidebar} from "react-toolbox";
import Clients from "../BoardSidebar/users";
import {userDisconnection} from "../../redux/reducers/Meeting/MeetingUserConnected";
import logo from "../Header/image/iteamLogo.jpg";
import navTheme from "./NavDrawer.scss";
import Dropdown from "react-toolbox/lib/dropdown";
import {MenuItem, MenuDivider} from "react-toolbox/lib/menu";
import Chat from '../Chat/Chat';
import Modal from '../BootstrapModal/BootstrapModal';
import panelTheme from '../SharedBoard/panel.scss'


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
      user: state.loginUser.user.username,
      meetingConfiguration: state.meetingConfigurationReducer.meeting.config,
      meetingOwner: state.meetingConfigurationReducer.meeting.owner
    }
  }
};

const mapDispatchToProps = (dispatch) => ({

  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS)),
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  personalBoard: () => dispatch(push('/' + PATHS.MENULOGGEDIN.PERSONALBOARD)),
  userDisconnected: () => dispatch(userDisconnection())

});


class SharedBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      active: false,
      teamName: '',
      modalMessage: '',
      participants: [],
      usersConnected: [],
      users: [{value: 0, label: 'All'}],
      mapTag: [{value: 0, label: 'All'}],
      tagValue: '',
      tagName: 'All',
      userValue: '',
      userName: 'All',
      usersNames: []
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

    this.setValuesOptionsTags(this.props.meetingConfiguration.tags);

    //Getting notes already shared in the board before rendering
    axios.get(MEETING.MEETING_INFO, {
      params: {
        meetingId: this.props.meetingId
      }
    }).then((response) => {

      this.setState({notes: response.data});
    }).catch((response) => {
      console.log('error ' + response)
    });

    //Get team participants for sidebar
    this.getTeam(this.props.meetingId);

  }

  componentWillUnmount() {
    //End socket connection
    disconnect();
  }
  renderTechnic(technic) {
    console.log(technic);
    switch (technic) {
      case 0:
        console.log('brainstorming');
        return(
          <div name="Notes container" className={classes.notes}>
            {this.renderNotes(this.state.notes, this.state.tagName, this.state.userName)}
          </div>
        );
        break;
      case 1:
        console.log('scamper');
        return this.renderScamper();
      case 2:
        console.log('Perspective');
        return this.renderPerspective();

    }
  }
  filterNoteByScamper(tag, noteMap){
   let notes= Object.values(noteMap).filter((note) => tag === note.tag);
 console.log(notes);
    return notes;
  }

renderNoteByTag(tag,noteMap){

  switch(tag){
    case'Sustitute':
      return this.renderNotes(noteMap,tag,'All');
          break;
    case'Combine':
      return this.renderNotes(noteMap,tag,'All');
      break;
    case'Adapt':
      return this.renderNotes(noteMap,tag,'All');
      break;
    case'Modify':
      return this.renderNotes(noteMap,tag,'All');
      break;
    case'Put to others use':
      return this.renderNotes(noteMap,tag,'All');
      break;
    case'Eliminate':
      return this.renderNotes(noteMap,tag,'All');
      break;
    case'Rearrange':
      return this.renderNotes(noteMap,tag,'All');
      break;

  }
}

  renderPerspective(){
    return(
    <div >
      <div className="row">
        <div className={classes.square}>
          <div className={classes.content}>
            <label className={classes.letter}> </label>

          </div>
        </div>
        <div className={classes.square}>
          <div className={classes.content}>
            <label className={classes.letter}></label>

          </div>
        </div>
      </div>
      <div className="row">
        <div className={classes.square}>
          <div className={classes.content}>
            <label className={classes.letter}></label>

          </div>
        </div>
        <div className={classes.square}>
          <div className={classes.content}>
            <label className={classes.letter}> </label>

          </div>
        </div>
      </div>
      </div>
    )
  }
  renderScamper() {
    return (
      <div >
        <div className="row">
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>S </label>
              <label>(subtitute)</label>
              {this.renderNoteByTag('Sustitute', this.state.notes)}
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>C</label>
              <label>(combine)</label>
              {this.renderNoteByTag('Combine', this.state.notes)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>A </label>
              <label>(adapt)</label>
              {this.renderNoteByTag('Adapt', this.state.notes)}
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>M </label>
              <label>(modify)</label>
              {this.renderNoteByTag('Modify', this.state.notes)}
            </div>
          </div>
          <div className={classes.squareMiddle}>
            <div className={classes.content}>
              <label className={classes.letter}>P </label>
              <label>(put to other use)</label>
              {this.renderNoteByTag('Put to others use', this.state.notes)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>E </label>
              <label>(eliminate)</label>
              {this.renderNoteByTag('Eliminate', this.state.notes)}
            </div>
          </div>
          <div className={classes.square}>
            <div className={classes.content}>
              <label className={classes.letter}>R </label>
              <label>(rearrange)</label>
              {this.renderNoteByTag('Rearrange', this.state.notes)}
            </div>
          </div>
        </div>
      </div>)
  }

  notes(note) {
    return (
      <Note key={note.id}
            id={note.id}
            onRemove={this.remove.bind(this)}
            onAddComment={this.onChangeComment.bind(this)}
            onVote={this.onUpdateRanking.bind(this)}
            left={note.left}
            top={note.top}
            boardType="shared"
            comments={note.comments}
            title={note.title}
            tag={note.tag}
            ranking={note.ranking}
      />
    )
  }

  renderNotes(noteMap, valueForTagFilter, valueForUserFilter) {
    console.log('Filters:' + ' ' + valueForTagFilter + ' ' + valueForUserFilter);
    //First get notes that have the selected tag
    let filteredNotes = Object.values(noteMap).filter((note) => {
        if (valueForTagFilter === this.state.mapTag[0].label) {

          return note;
        } else {
          if (note.tag === valueForTagFilter) {

            return note;
          }
        }
      }
    ).filter((note) => {
      if (valueForUserFilter === this.state.users[0].label) {

        return note;
      }
      else {
        if (note.username === valueForUserFilter) {

          return note;
        }
      }
    });
    console.log(filteredNotes)

    //Finally get the notes that have the combination of both filters selected
    return filteredNotes.map((note)=> {
      return this.notes(note);
    })


  }

  receiveConnectionStatus() {
    setInterval(this.getConnectedUsers(this.props.meetingId), 12000);
  }

  getConnectedUsers = (meetingId) => {
    axios.get(MEETING.MEETING_USERS, {
      params: {
        meetingId: meetingId
      }
    }).then(function (response) {
      if (response.data !== "") {
        this.setState({usersConnected: response.data["users"]});
        this.updateUsersConnected();
      }
    }.bind(this));
  };

  getTeam = (meetingId) => {
    axios.get(TEAM.TEAM_USER_BY_MEETING, {
      params: {
        meetingId: meetingId
      }
    }).then(function (response) {
      this.setState({
        teamName: response.data["teamId"],
        usersNames: response.data["teamUsers"]
      });
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

    let usersForCombo = teamParticipants.map(function (user, index) {
      let rObj = {};
      rObj["value"] = index + 1;
      rObj["label"] = user["username"];
      return rObj;
    });

    this.setState(
      {
        participants: participantInfo,
        users: this.state.users.concat(usersForCombo)
      });

  };

  saveNotes() {
    let ideas = Object.values(this.state.notes).map((value) => {
      return (
      {
        username: value.username,
        title: value.title,
        comments: value.comments,
        ranking: value.ranking,
        meetingId: value.meetingId,
        tag: value.tag.toLowerCase()
      }
      );
    });
    var userList = this.state.usersNames;
    var newList = [];
    Object.keys(userList).map((key) => {
        newList[key] = userList[key].username;
      }
    );
    if (ideas.length !== 0) {
      //TODO: remove axios from here
      axios({
        url: MEETING.MEETING_IDEAS_SAVE,
        method: 'post',
        params: {team: newList.toString()},
        data: {ideas}
      }).then(function (response) {
      }.bind(this)).catch(function (response) {

      });
    }
  }

  handleEndMeeting() {
    this.saveNotes();
    this.props.userDisconnected();
    //Send socket message to end meeting
    sendMessage('endMeeting', this.props.meetingId, JSON.stringify({}));
    this.props.onClick();
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
        left: map[id].left,
        top: map[id].top,
        comments: map[id].comments,
        ranking: map[id].ranking,
        meetingId: this.props.meetingId,
        boardType: "shared",
        tag: map[id].tag
      }));
  }

  receiveMessage(payload) {

    let map = this.state.notes;

    let jsonPayload = JSON.parse(payload);

    let jsonPayloadMessage = JSON.parse(jsonPayload.payload);

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
            comments: '',
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
            left: map[jsonPayloadMessage.id].left,
            top: map[jsonPayloadMessage.id].top,

            title: jsonPayloadMessage.title,
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
        this.updateUsersConnected();
        break;
      case "endMeeting":
        this.informMeetingEnding();

      case "default":
        //ver que hacer aca, si vale la pena ponerlo o no
        break;
    }
  }

  informMeetingEnding() {
    this.setState({modalMessage: 'This meeting has been ended by the owner. ¡Thank you for participating!'});
    this.refs.mymodal.openModal();
  }

  handleToggle = () => {
    this.setState({active: !this.state.active});
    this.getConnectedUsers(this.props.meetingId);
  };

  filterTags(value) {
    let filteredLabelObject = this.state.mapTag.filter(filter => filter["value"] == value);
    this.setState({tagValue: value, tagName: filteredLabelObject[0]["label"]})
  }

  filterByUser(value) {
    let filteredLabelObject = this.state.users.filter(filter => filter["value"] == value);
    this.setState({userValue: value, userName: filteredLabelObject[0]["label"]});
  }

  setValuesOptionsTags(data) {
    let opt = data.map(function (option, index) {
      let rObj = {};
      rObj["value"] = index + 1;
      rObj["label"] = option;
      return rObj;
    });

    this.setState({mapTag: this.state.mapTag.concat(opt)});
  }

  updateUsersConnected() {

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

  renderEndMeetingButton() {
    if (this.props.user == this.props.meetingOwner) {
      return (<MenuItem value='endmeeting' icon='touch_app' style={{color: 'white', background: '#900C3F'}}
                        caption='End Meeting' onClick={this.handleEndMeeting.bind(this)}/>);
    }
    else {
      return (<MenuItem value='leavemeeting' icon='touch_app' style={{color: 'white', background: '#900C3F'}}
                        caption='Leave Meeting' onClick={this.handleLeaveMeeting.bind(this)}/>);
    }
  }

  render() {
    return this.props.connectDropTarget(
      <div className={classes.board} name="Shared Board Component">
        <Layout>
          <NavDrawer active={true}
                     pinned={true} permanentAt='sm' theme={navTheme}>
            <div style={{background: 'white', width: '100%'}}><img src={logo} style={{
              height: '10%',
              width: '50%',
              marginLeft: '20%'
            }} onClick={this.props.home}/>
            </div>
            <label className={classes.label1}>SHARED BOARD</label>
            <MenuItem value='personalBoard' icon='people' style={{color: '#900C3F'}}
                      caption='Personal Board' onClick={this.props.personalBoard}/>
            <MenuDivider/>
            <Dropdown label="Tag filter" auto style={{color: '#900C3F'}}
                      onChange={this.filterTags.bind(this)} required
                      source={this.state.mapTag} value={this.state.tagValue}/>
            <Dropdown label="User filter" auto style={{color: '#900C3F'}}
                      onChange={this.filterByUser.bind(this)} required
                      source={this.state.users} value={this.state.userValue}/>
            <MenuItem value='teamMembers' icon='people_outline' style={{color: 'white', background: '#900C3F'}}
                      caption='Team members' onClick={this.handleToggle}/>
            <div>
              {this.renderEndMeetingButton(this.props.user)}
            </div>
          </NavDrawer>
          <Panel scrollY theme={panelTheme}>
            {this.renderTechnic(this.props.meetingConfiguration.technic)}


          </Panel>
          <Drawer active={this.state.active} theme={classes}
                  type="right"
                  onOverlayClick={this.handleToggle}>
            <Clients clients={this.state.participants} teamName={this.state.teamName}/>
          </Drawer>
          <Modal ref="mymodal" onOk={this.props.home} message={this.state.modalMessage}/>
        </Layout>
        <Chat/>
      </div>
    );
  }
}

SharedBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  meetingId: PropTypes.string,
  home: PropTypes.func,
  personalBoard: PropTypes.func,
  onClick: PropTypes.func,
  connect: PropTypes.bool,
  user: PropTypes.string,
  userDisconnected: PropTypes.func,
  meetingConfiguration: PropTypes.any,
  meetingEndingDate: PropTypes.any,
  meetingOwner: PropTypes.string
};

export default flow(
  DropTarget(ItemTypes.NOTE, NoteTarget,
    connect =>
      ( {
        connectDropTarget: connect.dropTarget()
      }
      )), connect(mapStateToProps, mapDispatchToProps))(SharedBoard);

