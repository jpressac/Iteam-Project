import React from 'react'
import PersonalBoard from '../../components/PersonalBoard/PersonalBoard'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class PersonalBoardView extends React.Component {

  render() {
    return (

      <div className="container-fluid">
        <PersonalBoard/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(PersonalBoardView);
