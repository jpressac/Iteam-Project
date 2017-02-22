import React, {Component, PropTypes} from 'react';
import {ItemTypes} from '../Constants/Constants';
import {DragSource} from 'react-dnd';
import {IconButton} from 'react-toolbox/lib/button';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import AutocompleteComponent from '../AutocompleteComponent/AutocompleteComponent'
import Chip from 'react-toolbox/lib/chip'
import CardYellow from './Card.scss'
import cardTitlescss from'./CardTitle.scss'
import cardActionsscss from './CardActions.scss'
import cardTextscss from './CardText.scss'
import classes from './Note.scss'
import inputSize from './InputSize.scss'
import Chipscss from './Chip.scss'
import Input from 'react-toolbox/lib/input';

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
      mapTag: props.tagMap.splice(props.tagMap.length - 1, 1),
      tagName: 'Miscellaneous'
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
                <AutocompleteComponent label="Select Tag" onValueChange={this.handleChange.bind(this, 'tagName')}
                                       source={this.state.tagMap} initialValue={this.state.tagName}/>
                <Input theme={inputSize} type='text' label='Title' value={this.state.title} required
                       onChange={this.handleChange.bind(this, 'title')} maxLength={200} multiline={'True'}/>
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

  handleChange = (name, value) => {
    this.setState({[name]: value});
  };

  send() {
    this.props.onSend(this.props.id);
    this.setState({view: 'normal'})
  }

  edit() {
    this.setState({view: 'editing'})
  }

  save() {
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
}

Note.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.any.isRequired,
  top: PropTypes.any.isRequired,
  size:PropTypes.any,
  username: PropTypes.string,
  boardType: PropTypes.string,
  comments: PropTypes.string,
  title: PropTypes.string,
  tag: PropTypes.string,
  ranking: PropTypes.string,
  tagMap: PropTypes.any,
  onAddComment: PropTypes.func,
  onRemove: PropTypes.func,
  onVote: PropTypes.func
};

export default DragSource(ItemTypes.NOTE,
  NoteSource, (connect, monitor) => ( {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  ))
(Note);
