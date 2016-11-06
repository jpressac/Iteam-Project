import React from 'react'
import BoardForm from '../../components/BoardForm'
import classes from './BoardView.scss'

export class BoardView extends React.Component {
  render(){
    return(
      <div className={classes.container} >
      <BoardForm></BoardForm>
      </div>
);
};
}
export default BoardView
