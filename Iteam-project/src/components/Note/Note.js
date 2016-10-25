import React, {Component, PropTypes} from 'react';
import classes from './Note.scss';
import {ItemTypes} from '../Constants/Constants';
import {DragSource} from 'react-dnd';
import {IconButton} from 'react-toolbox/lib/button';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import Chip from 'react-toolbox/lib/chip'
import {createFragment} from 'react'


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
    }
  }

  render() {
    const {connectDragSource, isDragging, left, top} = this.props;
    if (isDragging) {
      return null;
    }
    if (this.state.board === 'personal')
      switch (this.state.view) {
        case 'editing':
          return (
            <div className={classes.card}
                 style={{...style, left, top}}>
              <Card style={{resize: 'both', overflow: 'auto'}}>
                <textarea ref="titleText" defaultValue={this.props.title} className="form-control"/>
                <textarea ref="subtitleText" defaultValue={this.props.subtitle} className="form-control"/>
                <CardActions>
                  <IconButton icon="save" onClick={this.save.bind(this)}/>
                  <IconButton icon="clear" onClick={this.cancelComment.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );
        case 'normal':
          return connectDragSource(
            <div className={classes.card}
                 style={{...style, left, top}}>
              <Card style={{resize: 'both', overflow: 'auto'}}>
                {createFragment(this.state.tag)}
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <CardActions>
                  <IconButton icon="create" onClick={this.edit.bind(this)}/>
                  <IconButton icon="bookmark" onClick={this.addTag.bind(this)}/>
                  <IconButton icon="delete_sweep" onClick={this.removeFromPersonal.bind(this)}/>
                  <IconButton icon="send" onClick={this.send.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );

        case 'tag':
          return (
            <div className={classes.card}
                 style={{...style, left, top}}>
              <Card style={{resize: 'both', overflow: 'auto'}}>
                <textarea ref="tagText" defaultValue={this.props.tag} className="form-control"/>
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <CardActions>
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
            <div className={classes.card}
                 style={{...style, left, top}}>
              <Card style={{resize: 'both', overflow: 'auto'}}>
                <Chip deletable>{this.props.tag}</Chip>
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <CardText>{this.props.comments}</CardText>
                <CardActions>
                  <IconButton icon="add" onClick={this.comment.bind(this)}/>
                  <IconButton icon="delete_sweep" onClick={this.removeFromShared.bind(this)}/>
                  <IconButton icon="thumb_up" onClick={this.updateRanking.bind(this, 1)}/>
                  <IconButton icon="thumb_down" onClick={this.updateRanking.bind(this, -1)}/>
                </CardActions>
              </Card>
            </div>
          );
        case 'comment':
          return (
            <div className={classes.card}
                 style={{...style, left, top}}>
              <Card style={{resize: 'both', overflow: 'auto'}}>
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <textarea ref="commentText" defaultValue={this.props.comments} className="form-control"/>
                <CardActions>
                  <IconButton icon="save" onClick={this.saveComment.bind(this)}/>
                  <IconButton icon="clear" onClick={this.cancelComment.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );
      }
  }

  send() {
    this.props.onSend(this.props.id);
    this.setState({view: 'normal'})
  }

  edit() {
    this.setState({view: 'editing'})
  }

  save() {
    //TODO: remove tag from here
    this.props.onChange(this.refs.titleText.value, this.refs.subtitleText.value, this.props.id, this.refs.tagText.value);
    this.setState({view: 'normal'})
  }

  saveComment() {
    this.props.onAddComment(this.refs.commentText.value, this.props.id);
    this.setState({
      view: 'normal'
    })
  }

  cancelComment() {
    this.setState({view: 'normal'})
  }

  removeFromShared() {
    this.props.onRemove("delete", this.props.id);
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

  addTag(){
    this.setState({view: 'tag'});
  }

  saveTag(){
    let tag = [];
    tag.push(
      <Chip deletable>{this.refs.tagText}</Chip>
    );
    this.setState({tag: tag});
    this.setState({view: 'normal'})
  }

  getTags(){
    let tag = this.state.tag;
    return tag;
  }

  removeTag(){
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
  comments: PropTypes.array,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  tag: PropTypes.string
};

export default DragSource(ItemTypes.NOTE,
  NoteSource, (connect, monitor) => ( {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
  ))
(Note);
