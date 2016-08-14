import React, {Component, PropTypes} from 'react';
import classes from './Note.scss';
import {ItemTypes} from '../Constants/Constants';
import {DragSource} from 'react-dnd';
import NoteComment from '../NoteComment/NoteComment';
import {Button, IconButton} from 'react-toolbox/lib/button';


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

  render() {
    const {connectDragSource, isDragging, id, left, top, boardType, children} = this.props;
    var commentsString = this.state.AmountComments.toString();
    if (isDragging) {
      return null;
    }
    if (this.state.board === 'personal')
      switch (this.state.view) {
        case 'editing':
          return (
            <div className={classes.note}
                 style={{ ...style, left, top }}>
              <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
              <Button icon='save' onClick={this.save.bind(this)}/>
            </div>
          );
        case 'normal':
          return connectDragSource(
            <div className={classes.note}
                 style={{ ...style, left, top }}>
              <p>{this.props.children}</p>
                              <span>
                                <Button icon='e' floating accent mini onClick={this.edit.bind(this)}/>
                                <Button icon='-' floating accent mini onClick={this.remove.bind(this)}/>
                               </span>
            </div>
          );
      }
    else
      switch (this.state.view) {
        case 'normal':
          return connectDragSource(
            <div className={classes.note}
                 style={{ ...style, left, top }}>
              <p>{this.props.children}</p>
                              <span>
                                <Button icon='-' floating accent mini onClick={this.remove.bind(this)}/>
                                <IconButton icon='c' onClick={this.comment.bind(this)}/>
                                <Button label={commentsString} onClick={this.viewComments.bind(this)}/>
                                <IconButton icon='t'/>
                                <IconButton icon='f'/>
                               </span>
            </div>
          );
        case 'comment':
          return (
            <div className={classes.note}
                 style={{ ...style, left, top }}>
              <p>{this.props.children}</p>
              <Button icon='save' onClick={this.saveComment.bind(this)}/>
              <Button icon='cancel' onClick={this.cancelComment.bind(this)}/>
            </div>
          );

        case 'editcomment':
          return (
            <div className={classes.note}
                 style={{ ...style, left, top }}>
              <p>{this.props.children}</p>
              <Button icon='save' onClick={this.saveComment.bind(this)}/>
            </div>
          );

        case 'viewComments':
          return (
            <div className={classes.note}
                 style={{ ...style, left, top }}>
              <NoteComment comments={this.props.comments}/>
            </div>
          );
      }
  }


  edit() {
    this.setState({view: 'editing'})
  }

  save() {
    this.props.onChange(this.refs.newText.value, this.props.id);
    this.setState({view: 'normal'})
  }

  saveComment() {
    this.props.onAddComment(this.refs.commentText.value, this.props.id);
    this.setState({
      view: 'normal',
      AmountComments: this.state.AmountComments + 1
    })
    console.log('amount comments: ' + this.state.AmountComments)
  }

  cancelComment() {
    this.setState({
      view: 'normal'
    })
  }

  remove() {
    this.props.onRemove(this.props.id);
    this.setState({view: 'normal'})
  }

  comment() {
    this.setState({view: 'comment'})
  }

  viewComments() {
    let allComments = this.props.onViewComments(this.props.id);
    this.setState({
      view: 'viewComments',
      comments: allComments
    })
  }

  editComment() {

  }

  removeComment() {

  }


  // ranking(){
  //   {this.props.ranking(this.refs.like.value)}
  //   this.setState({editing:false})
  // }
  // categorize(){
  //   this.props.categorize(this.refs.categText.value)}
  //   this.setState({editing:false})
  // }

  constructor(props) {
    super(props);
    this.state = {
      view: 'normal',
      board: props.boardType,
      AmountComments: 0,
      comments: props.comments

    }
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
  children: PropTypes.node
};

export default DragSource(ItemTypes.NOTE,
  NoteSource, (connect, monitor) => ( {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
  ))
(Note);
