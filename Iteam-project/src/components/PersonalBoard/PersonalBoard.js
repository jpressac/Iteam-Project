import React, {Component, PropTypes} from "react";
import {DropTarget} from "react-dnd";
import classes from "./PersonalBoard.scss";
import Note from "../Note/Note";
import {ItemTypes} from "../Constants/Constants";
import Button from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import flow from 'lodash/flow'
import {connect as con, initWebSocket, sendMessage, disconnect} from '../../websocket/websocket'
import {connect} from 'react-redux'
import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'
import generateUUID from '../../constants/utils/GetUUID'
import {userConnection} from '../../redux/reducers/Meeting/MeetingUserConnected'
import {Layout, NavDrawer, Panel, Sidebar} from 'react-toolbox';
import logo from '../Header/image/iteamLogo.jpg';
import themeButton from './button.scss';
import {PATHS} from '../../constants/routes';
import {push} from 'react-router-redux'
import navTheme from './NavDrawer.scss'
import Dropdown from 'react-toolbox/lib/dropdown';

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
      tagName: ''
    }

  };

  componentWillMount() {
    console.debug('puto entre: ' + this.props.meetingConfiguration.tags);
    this.setValuesOptionsTags(this.props.meetingConfiguration.tags);
  }

  componentDidMount() {
    initWebSocket();
    con();

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

  comboTags(value) {
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
              boardType={noteMap[key].boardType}
              title={noteMap[key].title}
              tag={noteMap[key].tag}
              tagMap={this.props.meetingConfiguration.tags}
        />
      );
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
        comments: "No comments",
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

// Method for sending notes to shared board
  send(id) {
    let map = {};
    map[id] = this.state.notes[id];
    sendMessage("insertSharedBoard", this.props.meetingId, JSON.stringify(map));
    this.remove(id)
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
            <img src={logo} style={{height: 50, width: 100, marginRight: 300}} onClick={this.props.home}/>
            <label className={classes.label1}>PERSONAL BOARD</label>
            <Button icon='people' theme={themeButton} style={{color: '#900C3F'}}
                    onClick={this.props.sharedBoard}/>
            <TooltipButton icon='note add' tooltip='Add Note'
                           style={{background: '#900C3F', color: 'white', marginTop: 10}} raised primary
                           onClick={this.add.bind(this, "New note")} tooltipDelay={1000}/>
            <Dropdown label="Tag filter" auto style={{color: '#900C3F'}}
                      onChange={this.comboTags.bind(this)} required
                      source={this.state.mapTag} value={this.state.tagValue}/>
            <label>Available votes: {this.props.meetingConfiguration.votes}</label>
            <label>Time: {this.props.meetingConfiguration.pbtime}</label>
          </NavDrawer>
          <Panel>
            <div name="Notes container" className={classes.noteContainer}>
              {this.createNotes(this.state.notes)}
            </div>
          </Panel>
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
