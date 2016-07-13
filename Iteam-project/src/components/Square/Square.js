import React, { Component, PropTypes } from 'react';
import Note from '../Note/Note';
import classes from './Square.scss';

export default class Square extends React.Component {
  render() {
    return(
      <div style={{
           width: '100%',
           height: '100%'
          }}>
                {this.props.children}
          </div>
  );
}
}

Square.propTypes ={
      children: PropTypes.node
};
