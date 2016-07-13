import React, { Component, PropTypes } from 'react';
import classes from './Note.scss';
import { ItemTypes } from '../Constants/Constants';
import { DragSource } from 'react-dnd';


const NoteSource ={
  beginDrag(props){
    return{};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Note extends Component{

  render(){
    const { connectDragSource, isDragging } = this.props;
    if(this.state.editing){
      return(
            <div className={classes.note}>
                <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
                <button onClick={this.save.bind(this)} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    }
    else{
      return connectDragSource(
        <div className={classes.note}>
            <p>{this.props.children}</p>
            <span>
                 <button onClick={this.edit.bind(this)} className="btn btn-primary glyphicon glyphicon-pencil"/>
                 <button onClick={this.remove.bind(this)} className="btn btn-danger glyphicon glyphicon-trash"/>
             </span>
        </div>
      );
    };
  }

    edit(){
      this.setState({editing:true})
    }
    save(){
      {this.props.onChange(this.refs.newText.value, this.props.index)}
      this.setState({editing:false})
    }
    remove(){
      {this.props.onRemove(this.props.index)}
      this.setState({editing:false})
    }

    constructor(props){
      super(props);
      this.state = {editing:false}
    }
}

Note.propTypes={
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.NOTE, NoteSource, collect)(Note);
