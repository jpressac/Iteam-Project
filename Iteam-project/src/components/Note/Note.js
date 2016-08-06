import React, {Component, PropTypes} from 'react';
import classes from './Note.scss';
import {ItemTypes} from '../Constants/Constants';
import {DragSource} from 'react-dnd';


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
    const {connectDragSource, isDragging, id, left, top, children} = this.props;
    var noteState = this.state.editing
    if (isDragging) {
      return null;
    }
    switch (noteState) {
      case "editing":
        return (
          <div className={classes.note}
               style={{ ...style, left, top }}>
            <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
            <button onClick={this.save.bind(this)} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"/>
          </div>
        );
      case "no":
        return connectDragSource(
          <div className={classes.note}
               style={{ ...style, left, top }}>
            <p>{this.props.children}</p>
                              <span>
                                   <button onClick={this.edit.bind(this)}
                                           className="btn btn-primary glyphicon glyphicon-pencil"/>
                                   <button onClick={this.remove.bind(this)}
                                           className="btn btn-danger glyphicon glyphicon-trash"/>
                                   <button onClick={this.comment.bind(this)}
                                           className="btn btn-default glyphicon glyphicon-comment"/>
                                   <button className="btn btn-default glyphicon glyphicon-thumbs-up"/>
                                   <button className="btn btn-default glyphicon glyphicon-tag"/>
                               </span>
          </div>
        );
      case "commenting":
        return (
          <div className={classes.note}
               style={{ ...style, left, top }}>
            <p>{this.props.children}</p>
            <textarea ref="commentText" defaultValue="comment" className="form-control">hola</textarea>
            <button onClick={this.saveComment.bind(this)}
                    className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"/>
          </div>
        );
    }
  }

  edit() {
    this.setState({editing: 'editing'})
  }

  save() {
    {
      this.props.onChange(this.refs.newText.value, this.props.id)
    }
    this.setState({editing: 'no'})
  }

  saveComment() {
    {
      this.props.onChangeComment(this.refs.commentText.value, this.props.id)
    }
    this.setState({editing: 'no'})
  }

  remove() {
    {
      this.props.onRemove(this.props.id)
    }
    this.setState({editing: 'no'})
  }

  comment() {
    this.setState({editing: 'commenting'})
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
    this.state = {editing: 'no'}
  }
}

Note.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.any.isRequired,
  top: PropTypes.any.isRequired,
  username: PropTypes.string,
  children: PropTypes.node
};

export default DragSource(ItemTypes.NOTE, NoteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Note);
