/**
 * Created by Usuario on 06/08/2016.
 */
import React, {Component, PropTypes} from 'react';
import {List, ListItem, ListSubHeader, ListDivider, ListCheckbox} from 'react-toolbox/lib/list';


export default class NoteComment extends Component {

  render() {
    this.Comments(this.props.comments)
        }


  Comments(comments){
   comments.map({renderComments})
  }

  renderComments(comment){
    return(
      <ListItem
        caption={comment}
      />
    );
  }
}


NoteComment.propTypes = {
  comments: PropTypes.array
};
