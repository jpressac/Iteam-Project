import React, {Component, PropTypes} from 'react'
import classes from './MeetingConfigView.scss'
import {connect} from 'react-redux'
import chipTheme from './chips.scss'
import {Button} from 'react-toolbox/lib/button'
import Tooltip from 'react-toolbox/lib/tooltip'
import {push} from 'react-router-redux'
import {PATHS} from '../../constants/routes'
import {MEETING} from '../../constants/HostConfiguration'
import axios from 'axios'
import Chip from 'react-toolbox/lib/chip'
import Spinner from '../Spinner/Spinner'
import Avatar from 'react-toolbox/lib/avatar'
import avatarTheme from '../MeetingForm/avatarTheme.scss'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import DropdownComponent from '../DropdownComponent/DropdownComponent'

const mapDispatchToProps = dispatch => ({
  goToMyMeetings: () => dispatch(push('/' + PATHS.MENULOGGEDIN.MYMEETINGS))
});

const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user.username,
      meetingInfo: state.meetingReducer.meeting
    }
  }
};

const TooltipButton = Tooltip(Button);
const technics = ['Brainstorming', 'SCAMPER', 'morphological analysis']

class MeetingConfigForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      tag: '',
      tags: [],
      technic: 'Brainstorming',
      technicValue: 0,
      pbtime: 0,
      sbtime: 0,
      template: 0,
      templateValue: 0,
      notesFunctions: [],
      showSpinner: false
    };
  }

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  handleAddTag() {
    if (this.state.tag !== '') {

      let newTags = this.state.tags;
      newTags.push((this.state.tag));

      this.setState({tags: newTags, tag: ''});
    }
  }

  deleteTag(pos) {
    let newTags = this.state.tags;

    newTags.map(function (filter, index) {
      if (pos === index) {
        newTags.splice(index, 1);
      }
    });

    this.setState({tags: newTags});
  }

  tagLabels() {
    return this.state.tags.map(function (tag, index) {
      return (
        <Chip key={index} deletable onDeleteClick={this.deleteTag.bind(this, index)} theme={chipTheme}>
          {tag}
        </Chip>
      );
    }.bind(this));
  }


  saveMeeting() {
    this.setState({showSpinner: true});

    let tags = this.state.tags;
    tags.push("Miscellaneous");
    tags.reverse();

    axios.post(MEETING.MEETING_CREATE, {
      topic: this.props.meetingInfo.topic,
      ownerName: this.props.user,
      programmedDate: this.props.meetingInfo.programmedDate,
      endDate: this.props.meetingInfo.endDate,
      description: this.props.meetingInfo.description,
      teamName: this.props.meetingInfo.teamId,
      meetingConfig: {
        votes: this.state.votes,
        tags: tags,
        pbtime: this.state.pbtime,
        sbtime: this.state.sbtime,
        technic: this.state.technicValue,
        template: this.state.template
      }
    }).then(function () {

      this.props.goToMyMeetings()

    }.bind(this)).catch(function (response) {
    });
  }

  render() {
    if (!this.state.showSpinner) {
      return (
        <div className={"container " + classes.configMeetingForm}>
          <div className={classes.label}>
            <label>MEETING SETTINGS</label>
            <Avatar theme={avatarTheme} icon="settings"/>
          </div>
          <div className={"row " + classes.form}>
            <div className="col-md-9">
              <DropdownComponent label="Select technic" onValueChange={this.handleChange.bind(this, "technic")}
                                 source={technics} initialValue={this.state.technic}/>
            </div>
            <InputComponent className={"col-md-4"}
                            onValueChange={this.handleChange.bind(this, "votes")} value={this.state.votes}
                            label="Select amount of votes" type="number" minValue={"0"}/>

            <InputComponent className={"col-md-4"}
                            label="Select amount minutes in personal board"
                            onValueChange={this.handleChange.bind(this, 'pbtime')} type="number" minValue={"0"}
                            value={this.state.pbtime}/>
            <InputComponent className={"col-md-4"}
                            label="Select amount minutes in shared board"
                            onValueChange={this.handleChange.bind(this, 'sbtime')} value={this.state.sbtime}
                            type="number" minValue={"0"}/>

            <div className="row">
              <InputComponent className={"col-md-6"} label="Tag" value={this.state.tag}
                              maxLength={30} onValueChange={this.handleChange.bind(this, "tag")}/>
              <div className={"col-md-4 " + classes.paddingZero}>
                <TooltipButton icon='add' tooltip='Add tag' floating mini
                               onClick={this.handleAddTag.bind(this)}/>
              </div>
            </div>
            <div className="col-md-12">
              {this.tagLabels()}
            </div>
            <ButtonComponent className="row col-md-6" raisedValue onClick={this.saveMeeting.bind(this)}
                             value="Create Meeting"/>
          </div>
        </div>
      );
    }
    else {
      return (
        <Spinner/>
      )
    }
  }
}


MeetingConfigForm.propTypes = {
  user: PropTypes.any,
  meetingInfo: PropTypes.any,
  goToMyMeetings: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingConfigForm)
