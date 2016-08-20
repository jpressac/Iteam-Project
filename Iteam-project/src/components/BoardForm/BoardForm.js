import React, {Component, PropTypes} from 'react';
import PersonalBoard from '../PersonalBoard/PersonalBoard';
import SharedBoard from '../SharedBoard/SharedBoard'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';


class BoardForm extends Component {

  render() {
    return (
      <div className="col-md-12">
        <div className="col-md-6">
          <PersonalBoard></PersonalBoard>
        </div>
        <div className="col-md-6">
          <SharedBoard></SharedBoard>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(BoardForm);
