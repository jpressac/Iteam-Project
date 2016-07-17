import React, {Component,PropTypes} from 'react';
import classes from './BoardForm.scss'
import Board from '../Board/Board'
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext } from 'react-dnd';


class BoardForm extends Component {

  render(){
    return(
      <div>
          <Board></Board>
      </div>
    );
    }
  }

  export default DragDropContext(HTML5Backend)(BoardForm);
