import React, {Component, PropTypes} from 'react';
import classes from './Note.scss';
import {ItemTypes} from '../Constants/Constants';
import {DragSource} from 'react-dnd';
import {Button} from 'react-toolbox/lib/button';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
import FontIcon from 'react-toolbox/lib/font_icon'
import Chip from 'react-toolbox/lib/chip'


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
                <textarea ref="tagText" defaultValue={this.props.tag} className="form-control"/>
                <CardActions>
                  <Button onClick={this.save.bind(this)}>
                    <FontIcon value="save" />
                  </Button>
                  <Button onClick={this.cancelComment.bind(this)}>
                  <FontIcon value="clear" />
                </Button>
                </CardActions>
              </Card>
            </div>
          );
        case 'normal':
          return connectDragSource(
            <div className={classes.card}
                 style={{ ...style, left, top }}>
              <Card >
                <Chip deletable>{this.props.tag}</Chip>
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <CardActions>
                  <Button onClick={this.edit.bind(this)}>
                    <FontIcon value="create"/>
                  </Button>
                  <Button onClick={this.remove.bind(this)}>
                    <FontIcon value="delete_sweep" />
                    </Button>
                  <Button onClick={this.send.bind(this)}>
                    <FontIcon value="send" />
                  </Button>
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
                <Chip deletable>{this.props.tag}</Chip>
                <CardTitle
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                />
                <CardText>{this.props.comments}</CardText>
                <CardActions>
                  <Button onClick={this.comment.bind(this)}>
                    <FontIcon value="add"/>
                  </Button>
                  <Button onClick={this.remove.bind(this)}>
                    <FontIcon value="delete_sweep" />
                  </Button>
                  <Button onClick={this.updateRanking.bind(this, 1)}>
                    <FontIcon value="thumb_up"/>
                  </Button>
                  <Button onClick={this.updateRanking.bind(this, -1)}>
                    <FontIcon value="thumb_down"/>
                  </Button>
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
                  <Button onClick={this.saveComment.bind(this)}>
                  <FontIcon value="save" />
                </Button>
                <Button onClick={this.cancelComment.bind(this)}>
                  <FontIcon value="clear" />
                </Button>
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

  remove() {
    this.props.onRemove("delete", this.props.id);
    this.setState({view: 'normal'})
  }

  comment() {
    this.setState({view: 'comment'})
  }

  updateRanking(vote) {
    console.log('vote note ' + vote);
    this.props.onVote(this.props.id, vote);
    this.setState({view: 'normal'})
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
