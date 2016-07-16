import React, { Component, PropTypes } from 'react';
import classes from './Note.scss';
import { ItemTypes } from '../Constants/Constants';
import { DragSource } from 'react-dnd';


const NoteSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top };
  }
};

const style = {
  cursor: 'move'
};


class Note extends Component{

  render(){
    const { connectDragSource,isDragging , id,left, top, children } = this.props;
    if (isDragging) {
      return null;
    }
    else{
            if(this.state.editing){
              return(
                    <div className={classes.note}
                    style={{ ...style, left, top }}>
                        <textarea ref="newText" defaultValue={this.props.children} className="form-control"></textarea>
                        <button onClick={this.save.bind(this)} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
                    </div>
                    )
            }
            else{
              return connectDragSource(
                    <div className={classes.note}
                      style={{ ...style, left, top }}>
                        <p>{this.props.children}</p>
                        <span>
                             <button onClick={this.edit.bind(this)} className="btn btn-primary glyphicon glyphicon-pencil"/>
                             <button onClick={this.remove.bind(this)} className="btn btn-danger glyphicon glyphicon-trash"/>
                         </span>
                    </div>
              );
            }
          }
    }

    edit(){
      this.setState({editing:true})
    }
    save(){
      {this.props.onChange(this.refs.newText.value, this.props.id)}
      this.setState({editing:false})
    }
    remove(){
      {this.props.onRemove(this.props.id)}
      this.setState({editing:false})
    }

    constructor(props){
      super(props);
      this.state = {editing:false}
    }
}

Note.propTypes={
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.any.isRequired,
    top: PropTypes.any.isRequired,
    user: PropTypes.string,
    children: PropTypes.node
};

export default DragSource(ItemTypes.NOTE, NoteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Note);
