import React from 'react';
import classes from './Note.scss'

class Note extends React.Component{

  render(){
    if(this.state.editing){
      return this.renderForm()
    }
    else{
      return this.renderDisplay()
    }
  }

    renderDisplay(){
      return (
        <div className={classes.note}>
        <p>{this.props.children}</p>
            <span>
                 <button onClick={this.edit.bind(this)} className="btn btn-primary glyphicon glyphicon-pencil"/>
                 <button onClick={this.remove.bind(this)} className="btn btn-danger glyphicon glyphicon-trash"/>
             </span>
        </div>
      )
    }

    renderForm(){
      return (
            <div className={classes.note}>
                <textarea defaultValue={this.props.children} className="form-control"></textarea>
                <button onClick={this.save.bind(this)} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    }

    edit(){
      this.setState({editing:true})
    }
    save(){
      this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index)
      this.setState({editing:false})
    }
    remove(){
      this.props.onRemove(this.props.index)
      this.setState({editing:false})
    }
    constructor(props){
      super(props);
      this.state = {editing:false}
    }
}


export default Note
