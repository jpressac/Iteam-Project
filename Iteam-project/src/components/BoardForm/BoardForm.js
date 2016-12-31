import React, {Component, PropTypes} from 'react';
import PersonalBoard from '../PersonalBoard/PersonalBoard';
import SharedBoard from '../SharedBoard/SharedBoard'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';


class BoardForm extends Component {

  render() {
    return (
      <div id='board container' className="col-md-12">
        <div id="row" className="row">
          <div id='personal board' className="col-md-6">
            <PersonalBoard/>
          </div>
          <div id='shared board' className="col-md-6">
            <SharedBoard/>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(BoardForm);
