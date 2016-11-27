import React, {Component, PropTypes} from "react";
import classes from './MeetingConfigView.scss'
import {connect} from 'react-redux'
import BootstrapModal from '../../components/BootstrapModal/BootstrapModal'
import Input from 'react-toolbox/lib/input';
import themeLabel from './label.scss'
import {Button, IconButton} from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import {push} from 'react-router-redux';
import {PATHS} from '../../constants/routes';
import {MEETING} from '../../constants/HostConfiguration';
import axios from 'axios'


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

class MeetingConfigForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      votes: 0,
      tag: '',
      tags: [],
      technic: 'Brainstorming',
      technicValue: '',
      pbtime: 0,
      sbtime: 0,
      template: 'Default',
      templateValue: '',
      notesFunctions: []
    };
  }

  comboTechnic() {
  }

  comboTemplate() {
  }

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handleAddTag() {
    if (this.state.tag !== '') {
      console.debug('llega hasta aca');
      var newtags = this.state.tags;
      newtags.push((this.state.tag));
      this.setState({tags: newtags, tag: ''});
      console.debug('tags: ' + this.state.tags);
    }
  }

  deletetag(pos) {
    let newtags = this.state.tags;
    newtags.map(function (filter, index) {
      if (pos === index) {
        newtags.splice(index, 1);
      }
    });
    this.setState({tags: newtags});
  }

  tagLabels() {
    console.debug('tag Labels');
    return this.state.tags.map(function (tag, index) {
      return (
        <div style={{display: 'inline-block', margin: '2%'}}>
            <span className="tag label label-info"
                  style={{fontSize:14, margin:10, marginTop:50, background:'#900C3F', color:'white'}}>
              <span key={index}> {tag}</span>
              <a href='javascript:;' onClick={this.deletetag.bind(this, index)}>
                <i className="remove glyphicon glyphicon-remove-sign glyphicon-white"/>
              </a>
            </span>
        </div>
      );
    }.bind(this));
  }


  handleAddVotes() {
    this.setState({votes: this.state.votes + 1})
  }

  handleSubstractVotes() {
    this.setState({votes: this.state.votes - 1})
  }

  handleAddMinPB() {
    this.setState({pbtime: this.state.pbtime + 1})
  }

  handleSubstractMinPB() {
    this.setState({pbtime: this.state.pbtime - 1})
  }

  handleAddMinSB() {
    this.setState({sbtime: this.state.sbtime + 1})
  }

  handleSubstractMinSB() {
    this.setState({sbtime: this.state.sbtime - 1})
  }

  saveMeeting() {
    console.log('team id: ' + this.props.meetingInfo.teamId);
    console.log('description: ' + this.props.meetingInfo.description);

    axios.post(MEETING.MEETING_CREATE, {
      topic: this.props.meetingInfo.topic,
      ownerName: this.props.user,
      programmedDate: this.props.meetingInfo.programmedDate,
      description: this.props.meetingInfo.description,
      teamName: this.props.meetingInfo.teamId,
      meetingConfig: {
        votes: this.state.votes,
        tags: this.state.tags,
        pbtime: this.state.pbtime,
        sbtime: this.state.sbtime,
        technic: this.state.technic,
        template: this.state.template
      }
    }).then(function (response) {
      //TODO: use the spinner instead of modal
      this.setState({message: '¡Your meeting was successfully created!'});
      this.refs.meetingModal.openModal();
      this.props.goToMyMeetings()
    }.bind(this)).catch(function (response) {

    });
  }


  /*  comboTeam(value) {
   let filteredLabelObject = this.state.teamsObj.filter(filter => filter["value"] == value);
   this.setState({teamValue: value, teamSelectedName: filteredLabelObject[0]["label"]})
   }


   dropdownTeam() {
   return (
   <Dropdown label="Select team" auto theme={themeLabel} style={{color: '#900C3F'}}
   onChange={this.comboTeam.bind(this)}
   source={this.state.teamsObj} value={this.state.teamValue}/>
   );
   };*/

  render() {
    return (
      <div className={"container"} style={{marginTop: 70, width: 700}}>
        <div className={classes.label2}>
          <label>CONFIGURE MEETING</label>
        </div>
        <BootstrapModal ref="meetingModal" message={this.state.message}/>
        <div className={classes.form}>
          <div className={"form-horizontal"}>
            <div className="form-group">
              <div className="col-md-8">
                <div className="row" style={{color: '#900C3F'}}>
                  <Input type="text" theme={themeLabel} label="Select amount of votes" value={this.state.votes}
                         disabled/>
                  <Button icon='add' style={{margin:'1%',color:'white',background:'#900C3F'}} target='_blank' raised
                          onClick={this.handleAddVotes.bind(this)}/>
                  <Button icon='remove' style={{margin:'1%',color:'white',background:'#900C3F'}} target='_blank' raised
                          onClick={this.handleSubstractVotes.bind(this)}/>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row" style={{color: '#900C3F'}}>
                  <Input type="text" theme={themeLabel} label="Select amount minutes in personal board"
                         value={this.state.pbtime}/>
                  <Button icon='add' style={{margin:'1%',color:'white',background:'#900C3F'}} target='_blank' raised
                          onClick={this.handleAddMinPB.bind(this)}/>
                  <Button icon='remove' style={{margin:'1%',color:'white',background:'#900C3F'}} target='_blank' raised
                          onClick={this.handleSubstractMinPB.bind(this)}/>
                  <div className="col-md-8">
                    <div className="row" style={{color: '#900C3F'}}>
                      <Input type="text" theme={themeLabel} label="Select amount minutes in shared board"
                             value={this.state.sbtime}/>
                      <Button icon='add' style={{margin:'1%',color:'white',background:'#900C3F'}} target='_blank' raised
                              onClick={this.handleAddMinSB.bind(this)}/>
                      <Button icon='remove' style={{margin:'1%',color:'white',background:'#900C3F'}} target='_blank'
                              raised
                              onClick={this.handleSubstractMinSB.bind(this)}/>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{display: 'inline-block', margin: '2%'}}>
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
              </div>
              <div className="row">
                <div className="col-md-12" style={{marginTop:20}}>
                  {this.tagLabels()}
                </div>
              </div>
              <div className="row">
                <Button style={{margin:15,color:'white',background:'#900C3F'}} target='_blank' raised
                        onClick={this.saveMeeting.bind(this)}> Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

}


MeetingConfigForm.propTypes = {
  user: PropTypes.any,
  meetingInfo: PropTypes.any,
  goToMyMeetings:PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingConfigForm)
