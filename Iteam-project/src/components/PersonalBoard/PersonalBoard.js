import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "./PersonalBoard.scss";
import Note from "../Note/Note";
import {ItemTypes} from "../Constants/Constants";
import Button from "react-toolbox/lib/button";
import Tooltip from "react-toolbox/lib/tooltip";
import flow from "lodash/flow";
import {connectAndSubscribe, initWebSocket, sendMessage, disconnect} from "../../websocket/websocket";
import {connect} from "react-redux";
import axios from "axios";
import {MEETING} from "../../constants/HostConfiguration";
import generateUUID from "../../constants/utils/GetUUID";
import {userConnection} from "../../redux/reducers/Meeting/MeetingUserConnected";
import {Layout, NavDrawer, Panel, Sidebar} from "react-toolbox";
import logo from "../Header/image/iteamLogo.jpg";
import {PATHS} from "../../constants/routes";
import {push} from "react-router-redux";
import navTheme from "./NavDrawer.scss";
import Dropdown from "react-toolbox/lib/dropdown";
import {MenuItem, MenuDivider} from "react-toolbox/lib/menu";
import Modal from '../BootstrapModal/BootstrapModal';

const TooltipButton = Tooltip(Button);

const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.updatePosition(item.id, left, top);
  }
};

const mapDispatchToProps = (dispatch) => ({

  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME)),
  userConnected: () => dispatch(userConnection()),
  sharedBoard: () => dispatch(push('/' + PATHS.MENULOGGEDIN.SHAREDBOARD))

});

const mapStateToProps = (state) => {
  return {
    user: state.loginUser.user.username,
    meetingId: state.meetingReducer.meetingId,
    connected: state.meetingUser,
    meetingConfiguration: state.meetingConfigurationReducer.meeting.config
  }
};


const generateRandomNumber = () => {
  return Math.floor(Math.random() * 500) + 1;
};

class PersonalBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      mapTag: [],
      tagValue: '',
      tagName: 'Miscellaneous'
    }

  };

  componentWillMount() {
    this.setValuesOptionsTags(this.props.meetingConfiguration.tags);
  }

  componentDidMount() {
    initWebSocket();
    connectAndSubscribe(this.props.meetingId, this.receiveMessage.bind(this));

    if (this.props.connected == null || !this.props.connected) {
      this.props.userConnected();
      axios.head(MEETING.MEETING_USER_CONNECTION, {
        headers: {
          username: this.props.user,
          meetingId: this.props.meetingId
        }
      }).then(function (response) {

      });
    }
    axios.get(MEETING.MEETING_INFO_PERSONAL_BOARD, {
      params: {
        meetingId: this.props.meetingId,
        username: this.props.user
      }
    }).then(function (response) {

      if (response.data != "") {
        this.setState({notes: response.data});
      }
    }.bind(this)).catch(function (response) {
      console.log('error ' + response)
    });
  }

  componentWillUnmount() {
    disconnect();
  }

  receiveMessage(payload){
    let jsonPayload = JSON.parse(payload);

    switch (jsonPayload.action) {
      case "endMeeting":
        this.informMeetingEnding();
    }
  }

  informMeetingEnding(){
    this.setState({modalMessage: 'This meeting has been ended by the owner. ¡Thank you for participating!'});
    this.refs.mymodal.openModal();
  }

  filterTags(value) {
    let filteredLabelObject = this.state.mapTag
      .filter(filter => filter["value"] == value);

    this.setState({tagValue: value, tagName: filteredLabelObject[0]["label"]})
  }


  setValuesOptionsTags(data) {
    let opt = data.map(function (option, index) {
      let rObj = {};
      rObj["value"] = index;
      rObj["label"] = option;
      return rObj;
    });

    this.setState({mapTag: opt});
  }

  notes(noteMap,key) {
      return (
        <Note key={key}
              id={key}
              onChange={this.update.bind(this)}
              onRemove={this.remove.bind(this)}
              onSend={this.send.bind(this)}
              left={noteMap[key].left}
              top={noteMap[key].top}
              boardType={noteMap[key].boardType}
              title={noteMap[key].title}
              tag={noteMap[key].tag}
              tagMap={this.props.meetingConfiguration.tags}
        />
    );
  }

  renderNotes(noteMap, valueForFilter) {
    return Object.keys(noteMap).map((key) => {
      if (valueForFilter === this.state.mapTag[0].label) {
        return this.notes(noteMap, key);
      } else {
        if (noteMap[key].tag === valueForFilter) {
          return this.notes(noteMap, key);
        }
      }
    });
  }

  add(text) {
    let map = this.state.notes;
    let id = generateUUID();
    map[id] =
      {
        id: id,
        left: generateRandomNumber(),
        top: generateRandomNumber(),
        username: this.props.user,
        title: text,
        comments: "",
        tag: this.state.mapTag[0].label,
        ranking: 0,
        meetingId: this.props.meetingId,
        boardType: "personal"
      };
    this.updateNotesCacheByUser(map);

    this.setState({notes: map});
  }

  update(titleText, id, tag) {
    let map = this.state.notes;
    let note = map[id];
    note.title = titleText;
    note.tag = tag;

    this.updateNotesCacheByUser(map);

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

    this.updateNotesCacheByUser(map);

    this.setState({notes: map});
  }

  //Function for sending notes to shared board
  send(id) {
    let map = {};
    map[id] = this.state.notes[id];
    sendMessage("insertSharedBoard", this.props.meetingId, JSON.stringify(map));
    this.remove(id)
  }

  //Function that sends all notes together
  sendAll() {
    let map = {};
    map = this.state.notes;
    sendMessage("insertSharedBoard", this.props.meetingId, JSON.stringify(map));
    this.deleteAll();
    //Clean the personal board
    this.setState({notes:{}});

  }
  deleteAll(){
    sendMessage("insertCache", this.props.meetingId, JSON.stringify(
      {
        "username": this.props.user,
        "info": {}
      }));
  }

  updateNotesCacheByUser(map) {
    //Here we need to send the message to the backend through the web-socket
    sendMessage("insertCache", this.props.meetingId, JSON.stringify(
      {
        "username": this.props.user,
        "info": map
      }));
  }

  render() {
    return this.props.connectDropTarget(
      <div name="Personal Board Component" className={classes.board}>
        <Layout>
          <NavDrawer active={true}
                     pinned={true} permanentAt='sm' theme={navTheme}>
            <div style={{background: 'white', width: '100%'}}><img src={logo} style={{
              height: '10%',
              width: '50%',
              marginLeft: '20%'
            }} onClick={this.props.home}/>
            </div>
            <label className={classes.label1}>PERSONAL BOARD</label>
            <MenuItem value='sharedBoard' icon='people' style={{color: '#900C3F'}}
                      caption='Shared Board' onClick={this.props.sharedBoard}/>
            <MenuDivider/>
            <MenuItem value='addnote' icon='note' style={{color: '#900C3F'}}
                      caption='Add note' onClick={this.add.bind(this, "New note")}/>
            <MenuItem value='sharenotes' icon='share' style={{color: '#900C3F'}}
                      caption='Share all' onClick={this.sendAll.bind(this)}/>
            <MenuDivider/>
            <MenuItem value='votes' icon='star_half' style={{color: '#900C3F'}}
                      caption='Available votes:'>{this.props.meetingConfiguration.votes}</MenuItem>
            <MenuItem value='votes' icon='access_time' style={{color: '#900C3F'}}
                      caption='Time:'>{this.props.meetingConfiguration.votes}</MenuItem>
            <Dropdown label="Tag filter" auto style={{color: '#900C3F'}}
                      onChange={this.filterTags.bind(this)} required
                      source={this.state.mapTag} value={this.state.tagValue}/>
            <MenuDivider/>
          </NavDrawer>
          <Panel>
            <div name="Notes container" className={classes.noteContainer}>
              {this.renderNotes(this.state.notes, this.state.tagName)}
            </div>
          </Panel>
          <Modal ref="mymodal"  onOk={this.props.home} message={this.state.modalMessage}/>
        </Layout>
      </div>
    );
  }
}


PersonalBoard.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  userConnected: PropTypes.func,
  home: PropTypes.func,
  sharedBoard: PropTypes.func,
  user: PropTypes.any,
  meetingId: PropTypes.string,
  connected: PropTypes.bool,
  meetingConfiguration: PropTypes.any
};

export default flow(
  DropTarget(ItemTypes.NOTE, NoteTarget,
    connection =>
      ( {
          connectDropTarget: connection.dropTarget()
        }
      )), connect(mapStateToProps, mapDispatchToProps))(PersonalBoard);
