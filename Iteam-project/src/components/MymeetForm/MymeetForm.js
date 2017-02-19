import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem, ListDivider, ListSubHeader} from 'react-toolbox/lib/list';
import InputComponent from '../InputComponent/InputComponent'
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import DatePicker from 'react-toolbox/lib/date_picker';
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal';
import listFormat from './List.scss';
import chipTheme from './chips.scss';
import {updateMeetingId} from '../../redux/reducers/Meeting/MeetingReducer';
import {MEETING} from '../../constants/HostConfiguration';
import themeLabel from './label.scss';
import datesInput from './dateInput.scss'
import listItemGrey from './ListItemGrey.scss'
import Tooltip from 'react-toolbox/lib/tooltip';
import {Button} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import {saveMeetingInfo} from '../../redux/reducers/Meeting/MeetingReducer';
import Spinner from '../Spinner/Spinner';
import {validateDate, validateStart, validateHour, changeEndDate, checkDate} from '../../utils/DateUtils'
import {calculateTotalPages, calculateOffset} from '../../utils/mathUtils'
import ButtonComponent from '../ButtonComponent/'
import ReactPagination from 'react-paginate'
import pagination from './pagination.scss'
import dialogTheme from './dialog.scss'
import {getProgrammedMeetings, getSearchProgrammed} from '../../utils/actions/meetingActions'
import {cleanMeetingChats} from '../../redux/reducers/Meeting/MeetingChatMessagesReducer'
import AutocompleteComponent from '../AutocompleteComponent/AutocompleteComponent'
import generateUUID from '../../constants/utils/GetUUID'


var programDate = new Date();
var endDate = new Date();

const TooltipButton = Tooltip(Button);

const ITEMS_PER_PAGE = 10;

//Technics
const technics = ['Brainstorming', 'SCAMPER', 'Starfish Retrospective'];
//Startfish retrospective tags
const retroTags = new Set(['Start', 'Stop', 'Keep', 'More', 'Less']);
//Scamper tags
const scamperTags = new Set(['Sustitute', 'Combine', 'Adapt', 'Modify', 'Put to others use', 'Eliminate', 'Rearrange']);


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username
    }
  }
};

const mapDispatchToProps = (dispatch) => ({

  onClick: () => dispatch(push('/' + PATHS.MENULOGGEDIN.PERSONALBOARD)),
  updateMyMeetingId: (meetingId) => dispatch(updateMeetingId(meetingId)),
  saveMeeting: (meeting) => dispatch(saveMeetingInfo(meeting)),
  finishChat: () => dispatch(cleanMeetingChats())
});


class MymeetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      owner: '',
      meetings: {},
      date: new Date(),
      active: false,
      config: {},
      meetEdit: {},
      editable: true,
      technic: '',
      teamName: {},
      tag: '',
      tags: new Set(),
      showSpinner: true,
      endTime: new Date(),
      searchField: '',
      offset: 0,
      totalMeetings: 0,
      totalPages: 0,
      disabled: true,
      deletable: false
    }
  }

  componentDidMount() {
    this.getAllProgrammedMeetings();
  }

  adminActionsEdit = [
    {label: "Cancel", onClick: this.handleToggle.bind(this)},
    {label: "Edit", onClick: this.edit.bind(this)},
    {label: "Save", onClick: this.save.bind(this)}
  ];

  userActionsJoin = [
    {label: "Cancel", onClick: this.handleToggle.bind(this)},
    {label: "Join", onClick: this.startMeeting.bind(this)}
  ];

  userActionsView = [
    {label: "OK", onClick: this.handleToggle.bind(this)}
  ];

  handleToggle() {
    this.setState({active: !this.state.active});
  };


  startMeeting() {
    //Reducer containing toolbar info
    this.props.saveMeeting(this.state.meetEdit);
    //Reducer for meeting ID
    //this.props.updateMyMeetingId(this.state.meetEdit.meetingId);
    this.props.finishChat();

    //Dispatch to personal board
    this.props.onClick();
  }

  handleToggleDialog = (meeting) => {
    this.setState({
      topic: meeting.topic,
      description: meeting.description,
      active: !this.state.active,
      datetime: meeting.programmedDate,
      time: meeting.programmedDate,
      endTime: meeting.endDate,
      config: meeting.meetingConfig,
      meetEdit: meeting,
      editable: true,
      votes: meeting.meetingConfig.votes,
      technic: meeting.meetingConfig.technic,
      tags: meeting.meetingConfig.tags

    });
    this.props.saveMeeting(meeting);

    let datetime = new Date(meeting.programmedDate);
    programDate.setFullYear(datetime.getFullYear());
    programDate.setMonth(datetime.getMonth());
    programDate.setDate(datetime.getDate());
    programDate.setHours(datetime.getHours());
    programDate.setMinutes(datetime.getMinutes());

    let enddatetime = new Date(meeting.endDate);
    endDate.setFullYear(enddatetime.getFullYear());
    endDate.setMonth(enddatetime.getMonth());
    endDate.setDate(enddatetime.getDate());
    endDate.setHours(enddatetime.getHours());
    endDate.setMinutes(enddatetime.getMinutes());
  };

  isAdmin(owner) {
    return this.props.user === owner;
  }

  showActions(meetingOwner, meetingDate) {
    if (this.isAdmin(meetingOwner)) {
      //fecha ya paso, puede ver reportes
      if (!validateDate(meetingDate)) {
        if (validateStart(meetingDate)) {
          return this.userActionsJoin;
        }
        return this.adminActionsEdit; //TODO borra cuando ande el history
      }
      //fecha mayor, puede editar
      return this.userActionsView;
    }
    else {
      //fecha ya paso
      if (!validateDate(meetingDate)) {
        //rango de tiempo aceptable para unirse reunion
        if (validateStart(meetingDate)) {
          return this.userActionsJoin;
        }
      }
      // fecha mayor, puede poner ver
      return this.userActionsView;
    }
  }

  renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
  }

  fillFields(data) {
    this.setState({
      meetings: data.model,
      totalMeetings: data.total,
      showSpinner: false
    }, () => {
      let total = calculateTotalPages(this.state.totalMeetings, ITEMS_PER_PAGE);
      this.setState({totalPages: total});
    });
  }

  calculateTotalPages() {
    let total = calculateTotalPages(this.state.totalMeetings, ITEMS_PER_PAGE);
    this.setState({totalPages: total});
  }

  setMeetingEnding(meetingId) {
    axios.post(MEETING.MEETING_MARK_ENDED, {})
  }

  edit() {
    this.setState({editable: false}, ()=> {
      this.handleChangeTechnic(this.state.technic);
    });
  }

  save() {
    let editedMeeting = {
      owner: this.state.meetEdit.owner,
      meetingId: this.state.meetEdit.meetingId,
      topic: this.state.topic,
      description: this.state.description,
      programmedDate: new Date(programDate).getTime(),
      endDate: new Date(endDate).getTime(),
      meetingConfig: {
        votes: this.state.votes,
        technic: this.state.technic,
        tags: this.state.tags
      }
    };

    axios.post(MEETING.MEETING_UPDATE, editedMeeting).then(
      function (response) {
      }
    ).catch(function (response) {
      //TODO: implement something here
    });

    this.setState({
      active: !this.state.active,
      meetEdit: editedMeeting
    });
  }

  onChangeProgrammedDate = (date) => {
    let newDate = new Date(changeEndDate(programDate, endDate, date));

    programDate.setFullYear(date.getFullYear());
    programDate.setMonth(date.getMonth());
    programDate.setDate(date.getDate());

    endDate.setFullYear(newDate.getFullYear());
    endDate.setMonth(newDate.getMonth());
    endDate.setDate(newDate.getDate());

    this.setState({
      datetime: date
    });
  };

  onChangeProgrammedTime = (time) => {
    if (validateHour(time)) {
      programDate.setHours(time.getHours());
      programDate.setMinutes(time.getMinutes());

      this.setState({
        time: time
      });
    }
    else {
      this.setState({message: '¡You have to complete with valid time!'});
      this.refs.mymeetingModal.openModal();
    }
  };

  onChangeEndTime = (time) => {
    //TODO:check what happen here.
    endDate = new Date(checkDate(programDate, endDate, programDate.getHours(), time.getHours()));
    endDate.setHours(time.getHours());
    endDate.setMinutes(time.getMinutes());

    this.setState({
      endTime: time
    });
  };

  handleChangeTechnic = (technic) => {
    if (technic === 'SCAMPER') {
      this.setState({tags: scamperTags, deletable: false, disabled: true});
    }
    else if (technic === 'Starfish Retrospective') {
      this.setState({tags: retroTags, deletable: false, disabled: true});
    }
    else {
      this.setState({tags: this.state.tags.clear, deletable: true, disabled: false});
    }
  };

  handleChange = (key, value) => {
    this.setState({[key]: value}, () => {
      if (value == 'Brainstorming' || value == 'SCAMPER' || value == 'Starfish Retrospective') {
        this.handleChangeTechnic(this.state.technic);
      }
    });
  };

  deleteTag(pos) {
    let newTags = this.state.tags;
    newTags.delete(tag)
    this.setState({tags: newTags});
  }

  handleAddTag() {
    if (this.state.tag !== '') {
      let newTags = this.state.tags;
      newTags.add((this.state.tag));

      newConfig.tags = newTags;
      this.setState({tag: '', tags: newTags});
    }
  }

  tagLabels() {
    let tagArray = [];
    this.state.tags.forEach((tag) => {
      tagArray.push(
        <Chip key={generateUUID()} deletable={this.state.deletable} onDeleteClick={this.deleteTag.bind(this, tag)}
              theme={chipTheme}>
          {tag}
        </Chip>
      )
    });
    return tagArray
  }

  showDialog() {
    return this.isAdmin(this.state.meetEdit.ownerName) ? this.showDialogForAdmin() : this.showDialogForUser()
  }

  showDialogForUser() {
    return (
      <Dialog
        theme={dialogTheme}
        actions={this.showActions(this.state.meetEdit.ownerName, this.state.meetEdit.programmedDate)}
        active={this.state.active}
        onEscKeyDown={this.handleToggleDialog}
        onOverlayClick={this.handleToggleDialog}>
        <InputComponent className="col-md-8" label="Topic" value={this.state.topic} disable={false}/>
        <InputComponent className="col-md-8" label="Description" value={this.state.description}
                        disable={false}/>
        <DatePicker label='Date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedDate.bind(this)}
                    minDate={new Date()} theme={datesInput}/>
        <TimePicker label='Time'
                    value={isNaN(new Date(this.state.time)) ? 0 : new Date(this.state.time)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedTime.bind(this)}
                    theme={datesInput}/>
        <TimePicker label='End Time'
                    value={isNaN(new Date(this.state.endTime)) ? 0 : new Date(this.state.endTime)}
                    readonly={this.state.editable} onChange={this.onChangeEndTime.bind(this)}
                    theme={themeLabel}/>
      </Dialog>
    )
  }

  showDialogForAdmin() {
    return (
      <Dialog theme={dialogTheme}
              actions={this.showActions(this.state.meetEdit.ownerName, this.state.meetEdit.programmedDate)}
              active={this.state.active}
              onEscKeyDown={this.handleToggleDialog}
              onOverlayClick={this.handleToggleDialog}>

        <InputComponent label="Topic" value={this.state.topic} maxLength={30}
                        onValueChange={this.handleChange.bind(this, 'topic')}
                        disable={this.state.editable}/>

        <InputComponent label="Description" value={this.state.description} maxLength={144}
                        onValueChange={this.handleChange.bind(this, 'description')} disable={this.state.editable}/>

        <div className="row col-md-12">
          <div className="col-md-4">
            <DatePicker label='Date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                        readonly={this.state.editable} onChange={this.onChangeProgrammedDate.bind(this)}
                        minDate={new Date()}
                        theme={datesInput}/>
          </div>
          <div className="col-md-3">
            <TimePicker label='Start Time'
                        value={isNaN(new Date(this.state.time)) ? 0 : new Date(this.state.time)}
                        readonly={this.state.editable} onChange={this.onChangeProgrammedTime.bind(this)}
                        theme={datesInput}/>
          </div>
          <div className="col-md-3">
            <TimePicker label='End Time'
                        value={isNaN(new Date(this.state.endTime)) ? 0 : new Date(this.state.endTime)}
                        readonly={this.state.editable} onChange={this.onChangeEndTime.bind(this)}
                        theme={datesInput}/>
          </div>
        </div>
        <div className="row col-md-12">
          <InputComponent className="col-md-3" value={this.state.votes.toString()} disable={this.state.editable}
                          type="number" onValueChange={this.handleChange.bind(this, 'votes')} minValue={'0'}
                          label="Votes"/>
        </div>
        <div className="row col-md-12">
          <AutocompleteComponent label="Technic" onValueChange={this.handleChange.bind(this, 'technic')}
                                 source={technics} initialValue={this.state.technic}
                                 disabled={this.state.editable}/>
        </div>
        <div className="row col-md-12">
          <InputComponent className="col-md-8" label="Tag" value={this.state.tag} disable={this.state.disabled}
                          onValueChange={this.handleChange.bind(this, 'tags')} maxLength={30}/>
          <div className="col-md-4">
            <TooltipButton icon='add' tooltip='Add tag' floating mini
                           disabled={this.state.disabled} onClick={this.handleAddTag.bind(this)}/>
          </div>
        </div>
        {this.tagLabels()}
      </Dialog>
    )
  }

  handleSubmit(e) {
    if (e.which == 13) {
      e.preventDefault();
      this.searchByToken();
    }
  }

  searchByToken() {
    if (this.state.searchField.length != 0) {
      getSearchProgrammed(this.state.searchField, this.state.offset, ITEMS_PER_PAGE).then(function (response) {
        this.fillFields(response.data)
      }.bind(this))
    }
    else {
      this.getAllProgrammedMeetings();
    }
  }

  getAllProgrammedMeetings() {
    getProgrammedMeetings(this.state.offset, ITEMS_PER_PAGE).then(function (response) {
      this.fillFields(response.data)
    }.bind(this));
  }

  handlePageClick = (data) => {
    let actualPageNumber = data.selected;
    let offset = calculateOffset(actualPageNumber, ITEMS_PER_PAGE);

    this.setState({offset: offset}, () => {
      this.getAllProgrammedMeetings();
    });
  };

  render() {
    if (!this.state.showSpinner) {
      let meets = this.state.meetings;
      let meetingTime = new Date;

      let meetMap = [].slice.call(meets).sort(function (a, b) {
        return a.programmedDate - b.programmedDate
      });

      return (
        <div className={"container " + cssClasses.containerForm}>
          <div className={cssClasses.labelMainTitle}>
            <label>MY MEETINGS</label>
          </div>
          <div>
            <InputComponent label="Meeting topic" name="searchField" value={this.state.searchField}
                            onKeyPress={this.handleSubmit.bind(this)}
                            onValueChange={this.handleChange.bind(this,'searchField')}/>
            <ButtonComponent onClick={this.searchByToken.bind(this)} value="Search"/>
          </div>
          <BootstrapModal ref="mymeetingModal" message={this.state.message}/>
          <List theme={listFormat} selectable ripple>
            <ListSubHeader />
            {Object.keys(meetMap).map((key) => {
                meetingTime = meetMap[key].programmedDate;
                let renderDateTime = this.renderDate(meetingTime).toString();
                return (
                  <div key={key}>
                    <ListItem
                      theme={listItemGrey}
                      caption={meetMap[key].topic}
                      legend={renderDateTime}
                      leftIcon='send'
                      rightIcon='visibility'
                      onClick={this.handleToggleDialog.bind(this, meetMap[key])}/>
                    <ListDivider />
                    <BootstrapModal ref="meetingModal" message={this.state.message}/>
                  </div>
                );
              }
            )}
            {this.showDialog()}
          </List>
          <ReactPagination previousLabel={"Previous"}
                           nextLabel={"Next"}
                           pageCount={this.state.totalPages}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={this.handlePageClick}
                           initialPage={0}
                           disableInitialCallback={false}
                           pageClassName={pagination.ul}
          />
        </div>
      )
    } else {
      return (
        <Spinner/>
      )
    }
  }
}

MymeetForm.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.any,
  saveMeeting: PropTypes.func,
  finishChat: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(MymeetForm);
