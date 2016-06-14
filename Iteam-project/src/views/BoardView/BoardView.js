import React from 'react'
import BoardForm from '../../components/BoardForm/BoardForm.js'
import classes from './BoardView.scss'

export class BoardView extends React.Component {
  render(){
    return(
      <div className={classes.formContainer} >
      <BoardForm></BoardForm>
      </div>
);
};
}
export default BoardView
