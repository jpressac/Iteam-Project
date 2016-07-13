import React, {Component,PropTypes} from 'react';
import classes from './BoardForm.scss'
import Board from '../Board/Board'
import{ observe } from '../Board/Game';


  export default class BoardForm extends React.Component {

  render(){
    const {NotePosition} = this.state;
    return(
      <div>
          <Board NotePosition={NotePosition} />
      </div>
    );
    }

    handleChange(NotePosition) {
    const nextState = { NotePosition };
    if (this.state) {
      this.setState(nextState);
    } else {
      this.state = nextState;
    }
  }

  componentWillUnmount() {
  this.unobserve();
}

    constructor(props){
      super(props);
      this.unobserve = observe(this.handleChange.bind(this));
    }
  }
