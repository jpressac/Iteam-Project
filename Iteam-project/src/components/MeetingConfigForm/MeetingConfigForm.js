import React, {Component, PropTypes} from "react";
import classes from './MeetingConfigView.scss'
import {connect} from 'react-redux'
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal'
import Input from 'react-toolbox/lib/input';
import themeLabel from './label.scss'
import chipTheme from './chips.scss'
import {Button, IconButton} from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
import {MEETING} from '../../constants/HostConfiguration';
import axios from 'axios';
import Dropdown from 'react-toolbox/lib/dropdown';
import Chip from 'react-toolbox/lib/chip';
import Spinner from '../Spinner/Spinner';

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
const technics = [{value: 0, label: 'Brainstorming'}, {value: 1, label: 'SCAMPER'}, {
  value: 2,
  label: 'morphological analysis'
}];

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

  handleChangeCombo = (value) => {
    let filteredLabelObject = technics.filter(filter => filter["value"] == value);
    this.setState({technicValue: value, technic: filteredLabelObject[0]["label"]})
  };


  dropdownTechnic() {
    return (
      <Dropdown label="Select technic" auto theme={themeLabel} style={{color: '#900C3F'}}
                onChange={this.handleChangeCombo.bind(this)}
                source={technics}
                value={this.state.technicValue}/>
    );
  }


  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
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
      endDate:this.props.meetingInfo.endDate,
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
        <div className={"container"} style={{marginTop: 70, width: 700}}>
          <div className={classes.label2}>
            <label>CONFIGURE MEETING</label>
          </div>
          <div className={classes.form}>
            <div className={"form-horizontal"}>
              <div className="form-group">
                <div className="col-md-8">
                  <div className="row" style={{color: '#900C3F'}}>
                    <Input theme={themeLabel} label="Select amount of votes" value={this.state.votes}
                           onChange={this.handleChange.bind(this, 'votes')} type='number' min="0"/>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row" style={{color: '#900C3F'}}>
                    <Input theme={themeLabel} label="Select amount minutes in personal board"
                           value={this.state.pbtime} onChange={this.handleChange.bind(this, 'pbtime')}
                           type='number' min="0"/>
                    <div className="col-md-8">
                      <div className="row" style={{color: '#900C3F'}}>
                        <Input theme={themeLabel} label="Select amount minutes in shared board"
                               value={this.state.sbtime} onChange={this.handleChange.bind(this, 'sbtime')}
                               type='number' min="0"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{display: 'inline-block', margin: '2%'}}>
                  <div className="row" style={{color: '#900C3F'}}>
                    {this.dropdownTechnic()}
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row" style={{color: '#900C3F'}}>
                    <Input type='text' label='Tag' value={this.state.tag}
                           onChange={this.handleChange.bind(this,'tag')} maxLength={30} theme={themeLabel}/>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row" style={{color: '#900C3F'}}>
                    <TooltipButton icon='add' tooltip='Add tag'
                                   style={{background:'#900C3F', color:'white', marginTop:10}} floating mini
                                   onClick={this.handleAddTag.bind(this)}/>
                  </div>
                </div>
                <div className="row">
                  <div className="row" style={{color: '#900C3F'}}>
                    {this.tagLabels()}
                  </div>
                </div>
                <div className="row">
                  <Button style={{margin:15,color:'white',background:'#900C3F'}} target='_blank' raised
                          onClick={this.saveMeeting.bind(this)}> Create Meeting
                  </Button>
                </div>
              </div>
            </div>
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
