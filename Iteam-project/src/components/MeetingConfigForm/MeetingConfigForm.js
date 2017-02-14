import React, {Component, PropTypes} from 'react'
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
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
const technics = ['Brainstorming', 'SCAMPER', 'Starfish Retrospective'];
const retroTags = ['Start', 'Stop', 'Keep', 'More', 'Less'];
const scamperTags = ['Sustitute', 'Combine', 'Adapt', 'Modify', 'Put to others use', 'Eliminate', 'Rearrange'];


class MeetingConfigForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      tag: '',
      tags: [],
      technic: 'Brainstorming',
      deletable: true,
      disabled: false,
      technicValue: 0,
      template: 0,
      templateValue: 0,
      notesFunctions: [],
      showSpinner: false,
      message: ''
    };
  }


  handleChangeTechnic = (technic)=> {
    if (technic === 'SCAMPER') {
      this.setState({tags: scamperTags, deletable: false, disabled: true});
    }
    else if (technic === 'Starfish Retrospective') {
      this.setState({tags: retroTags, deletable: false, disabled: true});
    }
    else {
      this.setState({tags: [], deletable: true, disabled: false});
    }
  };


  handleChange = (key, value) => {
    this.setState({[key]: value}, () => {
      if (value == 'Brainstorming' | value == 'SCAMPER' | value == 'Starfish Retrospective') {
        this.handleChangeTechnic(this.state.technic)
      }
    });
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
        <Chip key={index} deletable={this.state.deletable} onDeleteClick={this.deleteTag.bind(this, index)}
              theme={chipTheme}>
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
        technic: this.state.technic,
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
        <div className={"container " + cssClasses.containerForm}>
          <div className={cssClasses.labelMainTitle}>
            <label>MEETING SETTINGS</label>
            <Avatar theme={avatarTheme} icon="settings"/>
          </div>
          <div className={"row " + cssClasses.form}>
            <div className="col-md-9">
              <DropdownComponent label="Select technic" onValueChange={this.handleChange.bind(this, "technic")}
                                 source={technics} initialValue={this.state.technic}/>
            </div>
            <InputComponent className={"col-md-4"}
                            onValueChange={this.handleChange.bind(this, "votes")} value={this.state.votes}
                            label="Select amount of votes" type="number" minValue={"0"}/>

            <div className="row">
              <InputComponent className={"col-md-6"} label="Tag" value={this.state.tag} disable={this.state.disabled}
                              maxLength={30} onValueChange={this.handleChange.bind(this, "tag")}/>
              <div className={"col-md-4 " + cssClasses.paddingInnerElements}>
                <TooltipButton icon='add' tooltip='Add tag' floating mini disabled={this.state.disabled}
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
