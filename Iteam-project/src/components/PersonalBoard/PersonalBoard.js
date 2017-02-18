import React, {Component, PropTypes} from 'react'
import {DropTarget} from 'react-dnd'
import classes from './PersonalBoard.scss'
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import Note from '../Note/Note'
import Autocomplete from '../AutocompleteComponent/AutocompleteComponent'
import {ItemTypes} from '../Constants/Constants'
import flow from 'lodash/flow'
import {connectAndSubscribe, initWebSocket, sendMessage, disconnect} from '../../websocket/websocket'
import {connect} from 'react-redux'
import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'
import generateUUID from '../../constants/utils/GetUUID'
import {userConnection} from '../../redux/reducers/Meeting/MeetingUserConnected'
import {Layout, NavDrawer, Panel, Sidebar} from 'react-toolbox'
import logo from '../Header/image/iteamLogo.jpg'
import {PATHS} from '../../constants/routes'
import {push} from 'react-router-redux'
import navTheme from './NavDrawer.scss'
import {MenuItem, MenuDivider} from 'react-toolbox/lib/menu'
import Chat from '../Chat/Chat'
import Modal from '../BootstrapModal/BootstrapModal'

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
    meetingConfiguration: state.meetingConfigurationReducer.config
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
      tagName: 'All'
    }
  };

  componentWillMount() {
    this.setState({mapTag: this.props.meetingConfiguration.tags})
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

  receiveMessage(payload) {
    let jsonPayload = JSON.parse(payload);

    switch (jsonPayload.action) {
      case "endMeeting":
        this.informMeetingEnding();
    }
  }

  informMeetingEnding() {
    this.setState({modalMessage: 'This meeting has been ended by the owner. ¡Thank you for participating!'});
    this.refs.mymodal.openModal();
  }

  handleChange(key, value) {
    this.setState({[key]: value})
  }

  notes(noteMap, key) {
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
      console.log(this.state.mapTag)
      console.log(valueForFilter)

      //TODO: find a better way to do this, we know that the tag 'all' it's always the last one but this could change
      if (valueForFilter === this.state.mapTag[this.state.mapTag.length - 1]) {
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
        tag: this.state.mapTag[0],
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
    let map = this.state.notes;
    sendMessage("insertSharedBoard", this.props.meetingId, JSON.stringify(map));
    this.deleteAll();
    //Clean the personal board
    this.setState({notes: {}});

  }

  renderStarfishGuide(technic) {
    if (technic == 'Starfish Retrospective') {
      return (
        <div>
          <label className={classes.guide}>
            <p>GUIDE</p>
            <p> What should we START doing?</p>
            <p> What should we STOP doing?</p>
            <p>What should we KEEP doing?</p>
            <p>What should we do MORE of?</p>
            <p>What should we do LESS of?</p>
          </label>
        </div>
      )
    }
  }

  deleteAll() {
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
      <div name="Personal Board Component" className={cssClasses.containerBoard}>
        <Layout >
          <NavDrawer active={true}
                     pinned={true} permanentAt='lg' theme={navTheme}>
            <div>
              <img className={cssClasses.imageAvatar} src={logo} onClick={this.props.home}/>
            </div>

            <label className={cssClasses.labelBoards}>
              PERSONAL BOARD
            </label>
            <MenuItem value='sharedBoard' icon='people'
                      caption='Shared Board' onClick={this.props.sharedBoard}/>
            <MenuDivider/>
            <MenuItem value='addnote' icon='note'
                      caption='Add note' onClick={this.add.bind(this, "New note")}/>
            <MenuItem value='sharenotes' icon='share'
                      caption='Share all' onClick={this.sendAll.bind(this)}/>
            <MenuDivider/>
            <MenuItem value='votes' icon='star_half'
                      caption='Available votes:'>{this.props.meetingConfiguration.votes}
            </MenuItem>
            <Autocomplete label="Tag filter" onValueChange={this.handleChange.bind(this, 'tagName')}
                          source={this.state.mapTag} initialValue='All'/>
            <MenuDivider/>
          </NavDrawer>
          <Panel>
            <div name="Notes container" className={classes.noteContainer}>
              {this.renderNotes(this.state.notes, this.state.tagName)}
            </div>
          </Panel>
          <Modal ref="mymodal" onOk={this.props.home} message={this.state.modalMessage}/>
        </Layout>
        <Chat/>
      </div>
    );
  }
}

//{this.renderStarfishGuide(this.props.meetingConfiguration.technic)}

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
