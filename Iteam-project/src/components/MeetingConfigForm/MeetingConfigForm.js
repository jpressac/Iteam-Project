import React, {Component, PropTypes} from 'react'
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import chipTheme from './chips.scss'
import {Button} from 'react-toolbox/lib/button'
import Tooltip from 'react-toolbox/lib/tooltip'
import Chip from 'react-toolbox/lib/chip'
import InputComponent from '../InputComponent/InputComponent'
import DropdownComponent from '../DropdownComponent/DropdownComponent'


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
      message: ''
    };
  }


  handleChangeTechnic = (technic)=> {
    if (technic === 'SCAMPER') {
      this.setState({tags: scamperTags, deletable: false, disabled: true}, () => {
        this.handleChangeTags(this.state.tags)
      });
    }
    else if (technic === 'Starfish Retrospective') {
      this.setState({tags: retroTags, deletable: false, disabled: true}, () => {
        this.handleChangeTags(this.state.tags);
      });
    }
    else {
      this.setState({tags: [], deletable: true, disabled: false}, () => {
        this.handleChangeTags(this.state.tags);
      });
    }
  };


  handleChange = (key, value) => {
    this.setState({[key]: value}, () => {
      if (value == 'Brainstorming' || value == 'SCAMPER' || value == 'Starfish Retrospective') {
        this.handleChangeTechnic(this.state.technic);
        this.props.onSetConfig('technic', this.state.technic);
      }
      if (key == 'votes') {
        this.props.onSetConfig('votes', this.state.votes)
      }
    });
  };

  handleChangeTags(tags) {
    this.props.onSetConfig('tags', this.state.tags);
  };

  handleAddTag() {
    if (this.state.tag !== '') {
      let newTags = this.state.tags;
      newTags.push((this.state.tag));
      this.setState({tags: newTags, tag: ''});
      this.props.onSetConfig('tags', newTags);
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
    this.props.onSetConfig('tags', newTags);
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


  render() {
    return (
      <div className="col-md-12">
        <div className={cssClasses.labelInfo}>
          <label>Meeting Configuration</label>
        </div>
        <div className={"row col-md-12 " + cssClasses.form}>
          <div className="col-md-8">
            <DropdownComponent label="Select technic" onValueChange={this.handleChange.bind(this, "technic")}
                               source={technics} initialValue={this.state.technic}/>
          </div>
          <InputComponent className={"col-md-4"}
                          onValueChange={this.handleChange.bind(this, "votes")} value={this.state.votes.toString()}
                          label="Select amount of votes" type="number" minValue={"0"}/>
          <div className="row col-md-12">
            <InputComponent className={"col-md-6"} label="Tag" value={this.state.tag} disable={this.state.disabled}
                            maxLength={30} onValueChange={this.handleChange.bind(this, "tag")}/>
            <div className={"col-md-6 " + cssClasses.paddingInnerElements}>
              <TooltipButton icon='add' tooltip='Add tag' floating mini disabled={this.state.disabled}
                             onClick={this.handleAddTag.bind(this)}/>
            </div>
          </div>
          <div className="col-md-12">
            {this.tagLabels()}
          </div>
        </div>
      </div>
    );
  }
}


MeetingConfigForm.propTypes = {
  onSetConfig: PropTypes.func
};

export default MeetingConfigForm
