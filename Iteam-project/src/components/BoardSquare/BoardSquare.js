import React, { Component, PropTypes } from 'react';
import Square from '../Square/Square';
import{ moveNote } from '../Board/Game';
import { ItemTypes } from '../Constants/Constants';
import { DropTarget } from 'react-dnd';


const squareTarget = {
  drop(props, monitor) {
    moveNote.bind(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
  }

class BoardSquare extends React.Component {
  debugger
  render() {
    const { x, y, connectDropTarget, children } = this.props;
    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
          <Square>
            {children}
          </Square>
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default DropTarget(ItemTypes.NOTE, squareTarget, collect)(BoardSquare);
