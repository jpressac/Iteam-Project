import React from 'react'
import SharedBoard from '../../components/SharedBoard/SharedBoard'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class PersonalBoardView extends React.Component {

  render() {
    return (
        <SharedBoard/>
    );
  }
}

export default DragDropContext(HTML5Backend)(PersonalBoardView);
