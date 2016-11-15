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
import imputSize from './InputSize.scss'
import Input from 'react-toolbox/lib/input';
// import createFragment from 'react-addons-create-fragment'


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
      tag:[],
      title:props.title,
      subtitle:props.subtitle,
      comment:props.comments,
      noteTags:props.tag
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
            <div className={classes.card} style={{...style, left, top}}>
              <Card theme={CardYellow}>
                <Input theme={imputSize} type='text' label='Title' value={this.state.title} onChange={this.handleChange.bind(this, 'title')}/>
                <Input theme={imputSize} type='text' label='Tag'  value={this.state.tag} onChange={this.handleChange.bind(this, 'tag')}/>
                <Input theme={imputSize} type='text' label='Subtitle' value={this.state.subtitle} onChange={this.handleChange.bind(this, 'subtitle')}/>
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
                <Chip deletable>{this.state.tag}</Chip>
                <CardTitle
                  theme={cardTitlescss}
                  title={this.state.title}
                />
                <CardText theme={cardTextscss}>{this.state.subtitle}</CardText>
                <CardActions  theme={cardActionsscss}>
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
                <CardTitle
                  theme={cardTitlescss}
                  title={this.state.title}
                />
                <CardText theme={cardTextscss}>{this.state.subtitle}</CardText>
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
                <Chip deletable>{this.state.tag}</Chip>
                <CardTitle
                  theme={cardTitlescss}
                  title={this.state.title}
                />
                <CardText theme={cardTextscss}>{this.state.subtitle}</CardText>
                <CardText theme={cardTextscss}>{this.state.comments}</CardText>
                <CardActions theme={cardActionsscss}>
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
            <div className={classes.card} style={{...style, left, top}}>
              <Card theme={CardYellow}>
                <CardTitle
                  theme={cardTitlescss}
                  title={this.state.title}
                />
                <CardText theme={cardTextscss}>{this.state.subtitle}</CardText>
                <Input theme={imputSize} type='text' label='Comments' value={this.state.comments} onChange={this.handleChange.bind(this, 'comments')}/>
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
    this.props.onChange(this.state.title, this.state.subtitle, this.props.id, this.state.noteTags);
    this.setState({view: 'normal'})
  }

  saveComment() {
    this.props.onAddComment(this.state.comment, this.props.id);
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
    // this.setState({view: 'tag'});
  }

  saveTag(){
    let tag = [];
    tag.push(
      <Chip deletable>{this.state.noteTags}</Chip>
    );
    this.setState({tag: tag});
    this.setState({view: 'normal'})
  }

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
