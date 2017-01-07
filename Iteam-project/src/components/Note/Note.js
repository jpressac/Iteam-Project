import React, {Component, PropTypes} from 'react';
import {ItemTypes} from '../Constants/Constants';
import {DragSource} from 'react-dnd';
import {IconButton} from 'react-toolbox/lib/button';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import Chip from 'react-toolbox/lib/chip'
import CardYellow from './Card.scss'
import cardTitlescss from'./CardTitle.scss'
import cardActionsscss from './CardActions.scss'
import cardTextscss from './CardText.scss'
import classes from './Note.scss'
import inputSize from './InputSize.scss'
import Chipscss from './Chip.scss'
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import themeLabel from './label.scss'
import themedrop from './dropdown.scss'



const NoteSource = {
  beginDrag(props) {
    const {id, left, top} = props;
    return {id, left, top};
  }
};

const style = {
  cursor: 'move'
};


class Note extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'normal',
      board: props.boardType,
      title: "",
      comments: "",
      mapTag: [],
      tagValue: '',
      tagName: 'Miscellaneous'
    }
  }

  componentWillMount() {
    if(this.props.boardType === 'personal'){
      this.setValuesOptionsTags(this.props.tagMap);
    }
  }


  render() {
    const {connectDragSource, isDragging, left, top} = this.props;
    if (isDragging) {
      return null;
    }
    if (this.props.boardType === 'personal')
      switch (this.state.view) {
        case 'editing':
          return (
            <div className={classes.card} style={{...style, left, top}}>
              <Card theme={CardYellow}>
                <Dropdown label="Select Tag" auto theme={themedrop} style={{color: '#900C3F'}}
                          onChange={this.comboTags.bind(this)} required
                          source={this.state.mapTag} value={this.state.tagValue}/>
                <Input theme={inputSize} type='text' label='Title' value={this.state.title} required
                       onChange={this.handleChange.bind(this, 'title')} maxLength={140} multiline={'True'}/>
                <CardActions theme={cardActionsscss}>
                  <IconButton icon="save" onClick={this.save.bind(this)}/>
                  <IconButton icon="clear" onClick={this.cancelComment.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );
        case 'normal':
          return connectDragSource(
            <div className={classes.card} style={{...style, left, top}}>
              <Card theme={CardYellow}>
                <Chip theme={Chipscss}>{this.props.tag}</Chip>
                <CardText theme={cardTitlescss}>{this.props.title}</CardText>
                <CardActions theme={cardActionsscss}>
                  <IconButton icon="create" onClick={this.edit.bind(this)}/>
                  <IconButton icon="delete_sweep" onClick={this.removeFromPersonal.bind(this)}/>
                  <IconButton icon="send" onClick={this.send.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );

        case 'tag':
          return (
            <div className={classes.card} style={{...style, left, top}}>
              <Card theme={CardYellow}>
                <CardText theme={cardTitlescss}>{this.props.title}</CardText>
                <CardActions theme={cardActionsscss}>
                  <IconButton icon="save" onClick={this.saveTag.bind(this)}/>
                  <IconButton icon="clear" onClick={this.cancelComment.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );
      }
    else
      switch (this.state.view) {
        case 'normal':
          return connectDragSource(
            <div className={classes.card} style={{...style, left, top}}>
              <Card theme={CardYellow}>
                <Chip deletable theme={Chipscss}>{this.props.tag}</Chip>
                <CardText theme={cardTitlescss}>{this.props.title}</CardText>
                <CardText theme={cardTextscss}>{this.props.comments}</CardText>
                <CardActions theme={cardActionsscss}>
                  <IconButton icon="add" onClick={this.comment.bind(this)}/>
                  <IconButton icon="delete_sweep" onClick={this.removeFromShared.bind(this)}/>
                  <IconButton icon="thumb_up" onClick={this.updateRanking.bind(this, 1)}/>
                  <label>{this.props.ranking}</label>
                  <IconButton icon="thumb_down" onClick={this.updateRanking.bind(this, -1)}/>
                </CardActions>
              </Card>
            </div>
          );
        case 'comment':
          return (
            <div className={classes.card} style={{...style, left, top}}>
              <Card theme={CardYellow}>
                <CardTitle
                  theme={cardTitlescss}
                  title={this.props.title}
                />
                <Input theme={inputSize} type='text' label='Comments' value={this.state.comments}
                       onChange={this.handleChange.bind(this, 'comments')} maxLength={60} multiline={'True'}/>
                <CardActions theme={cardActionsscss}>
                  <IconButton icon="save" onClick={this.saveComment.bind(this)}/>
                  <IconButton icon="clear" onClick={this.cancelComment.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );
      }
  }

  comboTags(value) {
    let filteredLabelObject = this.state.mapTag.filter(filter => filter["value"] == value);
    this.setState({tagValue: value, tagName: filteredLabelObject[0]["label"]})
  }

  setValuesOptionsTags(data) {
    let opt = data.map(function (option, index) {
      let rObj = {};
      rObj["value"] = index;
      rObj["label"] = option;
      return rObj;
    });

    this.setState({mapTag: opt, tagValue: opt[0].value});
  }


  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  send() {
    this.props.onSend(this.props.id);
    this.setState({view: 'normal'})
  }

  edit() {
    this.setState({view: 'editing'})
  }

  save() {
    //TODO: remove tag from here
    this.props.onChange(this.state.title, this.props.id, this.state.tagName);
    this.setState({view: 'normal'})
  }

  saveComment() {
    this.props.onAddComment(this.state.comments, this.props.id);
    this.setState({
      view: 'normal'
    })
  }

  cancelComment() {
    this.setState({view: 'normal'})
  }

  removeFromShared() {
    this.props.onRemove("updateCacheDelete", this.props.id);
    this.setState({view: 'normal'})
  }

  removeFromPersonal() {
    this.props.onRemove(this.props.id);
    this.setState({view: 'normal'})
  }

  comment() {
    this.setState({view: 'comment'})
  }

  updateRanking(vote) {
    this.props.onVote(this.props.id, vote);
    this.setState({view: 'normal'})
  }

  //addTag(){
  // this.setState({view: 'tag'});
  //}

  /* saveTag(){
   tag.push(
   <Chip deletable>{this.state.tag}</Chip>
   );
   this.setState({tag: tag});
   this.setState({view: 'normal'})
   }
   */
  // renderTag(){
  //   let tagArray = this.state.tag;
  //
  //   if(tagArray.length === 1){
  //     return createFragment(this.state.tag)
  //   }else{
  //     tagArray.map(t => {
  //       return createFragment(t)
  //     })
  //   }
  // }

  removeTag() {
    //ver como borrar un tag
  }
}

Note.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.any.isRequired,
  top: PropTypes.any.isRequired,
  username: PropTypes.string,
  boardType: PropTypes.string,
  comments: PropTypes.string,
  title: PropTypes.string,
  tag: PropTypes.string,
  ranking:PropTypes.string,
  tagMap: PropTypes.any
};

export default DragSource(ItemTypes.NOTE,
  NoteSource, (connect, monitor) => ( {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
  ))
(Note);
