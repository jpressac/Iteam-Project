import React, {Component,PropTypes} from 'react';
import classes from './BoardForm.scss'
import Board from '../Board/Board.js'


class BoardForm extends Component {
  render(){
    return(
      <body>
          <Board></Board>
      </body>
    );
    };
  }
  export default BoardForm;
