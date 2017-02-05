import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {List, ListItem, ListDivider, ListSubHeader} from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import TimePicker from 'react-toolbox/lib/time_picker';
import DatePicker from 'react-toolbox/lib/date_picker';
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
import classes from './MymeetForm.scss';
import Input from 'react-toolbox/lib/input';
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal';
import listFormat from './List.scss';
import chipTheme from './chips.scss';
import {updateMeetingId} from '../../redux/reducers/Meeting/MeetingReducer';
import {MEETING} from '../../constants/HostConfiguration';
import themeLabel from './label.scss';
import Dropdown from 'react-toolbox/lib/dropdown';
import Tooltip from 'react-toolbox/lib/tooltip';
import {Button} from 'react-toolbox/lib/button';
import Chip from 'react-toolbox/lib/chip';
import {saveConfig} from '../../redux/reducers/Meeting/MeetingConfigReducer';
import Spinner from '../Spinner/Spinner';
import {validateDate, validateStart, validateHour, changeEndDate} from '../../utils/DateUtils'
import ButtonComponent from '../ButtonComponent/'
import ReactPagination from 'react-paginate'
import pagination from './pagination.scss'

var programDate = new Date();
var endDate = new Date();

const TooltipButton = Tooltip(Button);

const ITEMS_PER_PAGE = 10;

const technics = [{value: 0, label: 'Brainstorming'}, {value: 1, label: 'SCAMPER'}, {
  value: 2,
  label: 'morphological analysis'
}];


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
  saveMeetingConfig: (meeting) => dispatch(saveConfig(meeting))
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
      technicValue: '',
      teamName: {},
      tag: '',
      showSpinner: true,
      endTime: new Date(),
      searchField: '',
      offset: 0,
      totalMeetings: 0,
      totalPages: 0
    }
  }

  componentDidMount() {
    this.getAllProgrammedMeetings();
  }

  adminActionsEdit = [
  {label: "Cancel", onClick: this.handleToggleDialog},
  {label: "Delete MeetingConfig", onClick: this.handleToggleDialog},
  {label: "Edit", onClick: this.edit.bind(this)},
  {label: "Save", onClick: this.save.bind(this)}
];

  userActionsJoin = [
  {label: "Cancel", onClick: this.handleToggleDialog},
  {label: "Join", onClick: this.startMeeting.bind(this)}
];

  userActionsView = [
  {label: "OK", onClick: this.handleToggleDialog}
];


  goToReports() {

let meetingInfo = {};
    meetingInfo.topic = this.state.meetEdit.topic;
    meetingInfo.owner= this.state.owner;
    meetingInfo.config = this.state.config;
    //Reducer containing toolbar info
    this.props.saveMeetingConfig(meetingInfo);

    //Reducer for meeting ID
    this.props.updateMyMeetingId(this.state.meetEdit.meetingId);
  }

  startMeeting() {
    //Object that contains meeting info for reducer for Toolbar
    let meetingInfo = {};
    meetingInfo.topic = this.state.meetEdit.topic;
    meetingInfo.owner= this.state.owner;
    meetingInfo.config = this.state.config;
    console.log(JSON.stringify(meetingInfo));

    //Reducer containing toolbar info
    this.props.saveMeetingConfig(meetingInfo);

    //Reducer for meeting ID
    this.props.updateMyMeetingId(this.state.meetEdit.meetingId);

    //Dispatch to personal board
    this.props.onClick();
  }

  handleToggleDialog = (meeting) => {
    this.setState({
      active: !this.state.active,
      datetime: meeting.programmedDate,
      owner: meeting.ownerName,
      time: meeting.programmedDate,
      endTime: meeting.endDate,
      config: meeting.meetingConfig,
      meetEdit: meeting,
      editable: true
    });

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
        //fecha mayor, puede editar
        return this.adminActionsEdit;
      }
      //update meeting to ended

    }
    else {
      //fecha ya paso
      if (!validateDate(meetingDate)) {
        //rango de tiempo aceptable para unirse reunion
        if (validateStart(meetingDate)) {
          return this.userActionsJoin;
        }
        // fecha mayor, puede poner ver
        return this.userActionsView;
      }
      //update meeting to ended

    }
  }

  renderDate(meetingTime) {
    return new Date(meetingTime).toLocaleDateString([], {hour: '2-digit', minute: '2-digit'});
  }

  fillFields(data) {
    this.setState({
      meetings: data.meetings,
      totalMeetings:data.total,
      showSpinner: false
    }, () => {
      this.calculateTotalPages();
    })
  }

  calculateTotalPages(){
    let total = Math.ceil(this.state.totalMeetings / ITEMS_PER_PAGE);
    this.setState({totalPages: total});
  }

  setMeetingEnding(meetingId){
    axios.post(MEETING.MEETING_MARK_ENDED, {})
  }

  edit() {
    this.setState({editable: false})
  }

  save() {
    let editedMeeting = this.state.meetEdit;

    editedMeeting.meetingId = this.state.meetEdit.meetingId;
    editedMeeting.meetingConfig = this.state.config;

    axios.post(MEETING.MEETING_UPDATE, editedMeeting).then(
      function (response) {
      }
    ).catch(function (response) {
      //TODO: implement something here
      });

    this.setState({active: !this.state.active});
  }

  onChangeTopic = (topic) => {
    let newMeeting = this.state.meetEdit;
    newMeeting.topic = topic;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangeVotes = (votes) => {
    let newMeeting = this.state.meetEdit;
    newMeeting.meetingConfig.votes = votes;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangeSharedBoardTime = (sharedBoardTime) => {
    let newMeeting = this.state.meetEdit;
    newMeeting.meetingConfig.sharedBoardTime = sharedBoardTime;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangePersonalBoardTime = (personalBoardTime) => {
    let newMeeting = this.state.meetEdit;
    newMeeting.meetingConfig.personalBoardTime = personalBoardTime;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangeDescription = (description) => {
    let newMeeting = this.state.meetEdit;
    newMeeting.description = description;
    this.setState({
      meetEdit: newMeeting
    });
  };

  onChangeProgrammedDate = (date) => {
    let newDate = new Date(changeEndDate(programDate, endDate, date));

    programDate.setFullYear(date.getFullYear());
    programDate.setMonth(date.getMonth());
    programDate.setDate(date.getDate());

    endDate.setFullYear(newDate.getFullYear());
    endDate.setMonth(newDate.getMonth());
    endDate.setDate(newDate.getDate());

    let newMeeting = this.state.meetEdit;
    newMeeting.programmedDate = programDate.getTime();
    newMeeting.endDate = endDate.getTime();
    this.setState({
      meetEdit: newMeeting,
      datetime: date
    });
  };

  onChangeProgrammedTime = (time) => {
    if (validateHour(time)) {
      programDate.setHours(time.getHours());
      programDate.setMinutes(time.getMinutes());

      let newMeeting = this.state.meetEdit;
      newMeeting.programmedDate = programDate.getTime();
      this.setState({
        meetEdit: newMeeting,
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

    let newMeeting = this.state.meetEdit;
    newMeeting.endDate = endDate.getTime();
    this.setState({
      meetEdit: newMeeting,
      endTime: time
    });
  };

  handleChangeCombo = (value) => {
    let filteredLabelObject = technics.filter(filter => filter["value"] == value);
    let newConfig = this.state.config;

    newConfig.technic = value;

    this.setState({config: newConfig, technicValue: filteredLabelObject[0]["label"]})
  };


  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  deleteTag(pos) {
    let newTags = this.state.config.tags;

    newTags.map(function (filter, index) {
      if (pos === index) {
        newTags.splice(index, 1);
      }
    });

    let newConfig = this.state.config;
    newConfig.tags = newTags;

    this.setState({config: newConfig, tag: ''});
  }

  handleAddTag() {
    if (this.state.tag !== '') {
      let newTags = this.state.config.tags;

      newTags.push((this.state.tag));

      let newConfig = this.state.config;

      newConfig.tags = newTags;
      this.setState({config: newConfig, tag: ''});
    }
  }

  tagLabels() {
    if (typeof this.state.config.tags !== "undefined") {
      return this.state.config.tags.map(function (tag, index) {
        return (
          <Chip key={index} deletable={!this.state.editable} onDeleteClick={this.deleteTag.bind(this, index)}
                theme={chipTheme}>
            {tag}
          </Chip>
        );
      }.bind(this));
    }
  }

  showDialog() {
    return this.isAdmin(this.state.meetEdit.ownerName) ? this.showDialogForAdmin() : this.showDialogForUser()
  }

  showDialogForUser() {
    return (
      <Dialog
        actions={this.showActions(this.state.meetEdit.ownerName, this.state.meetEdit.programmedDate)}
        active={this.state.active}
        onEscKeyDown={this.handleToggleDialog}
        onOverlayClick={this.handleToggleDialog}>
        <Input type='text' label='Topic' value={this.state.meetEdit.topic} maxLength={30}
               onChange={this.onChangeTopic.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <Input type='text' label='Description' value={this.state.meetEdit.description} maxLength={144}
               onChange={this.onChangeDescription.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <DatePicker label='Date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedDate.bind(this)}
                    minDate={new Date()}/>
        <TimePicker label='Time'
                    value={isNaN(new Date(this.state.time)) ? 0 : new Date(this.state.time)}
                    readonly={this.state.editable} onChange={this.onChangeProgrammedTime.bind(this)}/>
        <TimePicker label='End Time'
                    value={isNaN(new Date(this.state.endTime)) ? 0 : new Date(this.state.endTime)}
                    readonly={this.state.editable} onChange={this.onChangeEndTime.bind(this)}
                    theme={themeLabel}/>
      </Dialog>
    )
  }

  showDialogForAdmin() {
    return (
      <Dialog
        actions={this.showActions(this.state.meetEdit.ownerName, this.state.meetEdit.programmedDate)}
        active={this.state.active}
        onEscKeyDown={this.handleToggleDialog}
        onOverlayClick={this.handleToggleDialog}>
        <Input type='text' label='Topic' value={this.state.meetEdit.topic} maxLength={30}
               onChange={this.onChangeTopic.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <Input type='text' label='Description' value={this.state.meetEdit.description} maxLength={144}
               onChange={this.onChangeDescription.bind(this)} disabled={this.state.editable}
               theme={themeLabel}/>
        <div className="form-group">
          <div className="row" style={{color: '#900C3F'}}>
            <div className="col-md-4">
              <DatePicker label='Date' sundayFirstDayOfWeek value={new Date(this.state.datetime)}
                          readonly={this.state.editable} onChange={this.onChangeProgrammedDate.bind(this)}
                          minDate={new Date()}
                          theme={themeLabel}/>
            </div>
            <div className="col-md-3">
              <TimePicker label='Start Time'
                          value={isNaN(new Date(this.state.time)) ? 0 : new Date(this.state.time)}
                          readonly={this.state.editable} onChange={this.onChangeProgrammedTime.bind(this)}
                          theme={themeLabel}/>
            </div>
            <div className="col-md-3">
              <TimePicker label='End Time'
                          value={isNaN(new Date(this.state.endTime)) ? 0 : new Date(this.state.endTime)}
                          readonly={this.state.editable} onChange={this.onChangeEndTime.bind(this)}
                          theme={themeLabel}/>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row" style={{color: '#900C3F'}}>
            <div className="col-md-3">
              <Input label="Votes" value={this.state.config.votes}
                     onChange={this.onChangeVotes.bind(this)} disabled={this.state.editable} type='number'
                     theme={themeLabel} min="0"/>
            </div>
            <div className="col-md-4">
              <Input label="Minutes in personal board"
                     value={this.state.config.personalBoardTime} onChange={this.onChangePersonalBoardTime.bind(this)}
                     disabled={this.state.editable} type='number'
                     theme={themeLabel} min="0"/>
            </div>
            <div className="col-md-4">
              <Input label="Minutes in shared board"
                     value={this.state.config.sharedBoardTime} onChange={this.onChangeSharedBoardTime.bind(this)}
                     disabled={this.state.editable} type='number'
                     theme={themeLabel} min="0"/>
            </div>
          </div>
        </div>
        <div className="row" style={{color: '#900C3F'}}>
          <div className="col-md-5">
            <Dropdown label="Technic" auto onChange={this.handleChangeCombo.bind(this)} style={{color: '#900C3F'}}
                      source={technics} disabled={this.state.editable} value={this.state.config.technic}
                      theme={themeLabel}/>
          </div>
        </div>
        <div className="form-group">
          <div className="row" style={{color: '#900C3F'}}>
            <div className="col-md-4">
              <Input type='text' label='Tag' value={this.state.tag} disabled={this.state.editable}
                     onChange={this.handleChange.bind(this, 'tag')} maxLength={30}
                     theme={themeLabel}/>
            </div>
            <div className="col-md-4">
              <TooltipButton icon='add' tooltip='Add tag' floating mini
                             style={{background: '#900C3F', color: 'white', marginTop: 10}}
                             disabled={this.state.editable} onClick={this.handleAddTag.bind(this)}/>
            </div>
          </div>
        </div>
        {this.tagLabels()}
      </Dialog>
    )
  }

  searchByToken(){
    if ( this.state.searchField.length != 0 ) {
      axios.get(MEETING.MEETING_SEARCH_PROGRAMMED, {
        params: {
          token: this.state.searchField,
          offset: this.state.offset,
          limit: ITEMS_PER_PAGE
        }
      }).then(function (response) {
        this.fillFields(response.data)
      }.bind(this))
    }
    else {
      this.getAllProgrammedMeetings();
    }
  }

  getAllProgrammedMeetings(){
    axios.get(MEETING.MEETING_PROGRAMMED, {
        params: {
          offset: this.state.offset,
          limit: ITEMS_PER_PAGE
        }}).then(function (response) {
        this.fillFields(response.data)
    }.bind(this))
  }

  handlePageClick =(data) =>{
    let actualPageNumber = data.selected;
    let offset = Math.ceil(actualPageNumber * ITEMS_PER_PAGE);

    this.setState({offset:offset}, () => {
      this.getAllProgrammedMeetings();
    });
  };

  render() {
    if(!this.state.showSpinner) {
      let meets = this.state.meetings;
      let meetingTime = new Date;

      let meetMap = [].slice.call(meets).sort(function (a, b) {
        return a.programmedDate - b.programmedDate
      });

      return (
        <div className={"container"} style={{marginTop: 70}}>
          <div className={classes.content}>
            <div className={classes.label2}>
              <label>MY MEETINGS</label>
            </div>
            <div>
              <Input type='text' label="Meeting topic"  name="searchField" value={this.state.searchField} onChange={this.handleChange.bind(this,'searchField')}/>
              <ButtonComponent  onClick={this.searchByToken.bind(this)} value="Search"/>
            </div>
            <BootstrapModal ref="mymeetingModal" message={this.state.message}/>
            <List theme={listFormat} selectable ripple>
              <ListSubHeader />
              {Object.keys(meetMap).map((key) => {
                  meetingTime = meetMap[key].programmedDate;
                  let renderDateTime = this.renderDate(meetingTime);
                  return (
                    <div key={key}>
                      <ListItem
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
                             initialPage ={1}
                             disableInitialCallback={true}
                             pageClassName={pagination.ul}
                             pageLinkClassName={pagination}
            />
          </div>
        </div>
      )
    }else{
      return (
        <Spinner/>
      )
    }
  }
}


MymeetForm.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.any,
  goToReports: PropTypes.func,
  saveMeetingConfig: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(MymeetForm);
