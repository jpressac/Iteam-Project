import React, {Component, PropTypes} from 'react';
import classes from './Note.scss';
import {ItemTypes} from '../Constants/Constants';
import {DragSource} from 'react-dnd';
import {Button} from 'react-toolbox/lib/button';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';


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
    const {connectDragSource, isDragging, id, left, top, subtitle, boardType, children} = this.props;
    if (isDragging) {
      return null;
    }
    if (this.state.board === 'personal')
      switch (this.state.view) {
        case 'editing':
          return (
            <div className={classes.card}
                 style={{ ...style, left, top }}>
              <Card>
                <textarea ref="titleText" defaultValue={this.props.title} className="form-control"/>
                <textarea ref="subtitleText" defaultValue={this.props.subtitle} className="form-control"/>
                <CardActions>
                  <Button label="SAVE" onClick={this.save.bind(this)}/>
                  <Button label="CANCEL" onClick={this.cancelComment.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );
        case 'normal':
          return connectDragSource(
            <div className={classes.card}
                 style={{ ...style, left, top }}>
              <Card >
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <CardActions>
                  <Button label="EDIT" onClick={this.edit.bind(this)}/>
                  <Button label="DELETE" onClick={this.remove.bind(this)}/>
                  <Button label="SHARE" onClick={this.send.bind(this)}/>
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
                 style={{ ...style, left, top }}>
              <Card >
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <CardText>{this.props.comments}</CardText>
                <CardActions>
                  <Button label="COMMENT" onClick={this.comment.bind(this)}/>
                  <Button label="DELETE" onClick={this.remove.bind(this)}/>
                </CardActions>
              </Card>
            </div>
          );
        case 'comment':
          return (
            <div className={classes.card}
                 style={{ ...style, left, top }}>
              <Card >
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <textarea ref="commentText" defaultValue={this.props.comments} className="form-control"/>
                <CardActions>
                  <Button label="SAVE" onClick={this.saveComment.bind(this)}/>
                  <Button label="CANCEL" onClick={this.cancelComment.bind(this)}/>
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
    this.props.onChange(this.refs.titleText.value, this.refs.subtitleText.value, this.props.id);
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

  remove() {
    this.props.onRemove(this.props.id);
    this.setState({view: 'normal'})
  }

  comment() {
    this.setState({view: 'comment'})
  }


  constructor(props) {
    super(props);
    this.state = {
      view: 'normal',
      board: props.boardType
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
  subtitle: PropTypes.string,
  title: PropTypes.string
};

export default DragSource(ItemTypes.NOTE,
  NoteSource, (connect, monitor) => ( {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
  ))
(Note);
