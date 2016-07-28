import React, {Component,PropTypes} from 'react';
import { DropTarget } from 'react-dnd';
import classes from './Board.scss';
import Note from '../Note/Note';
import axios from 'axios'
import BootstrapModal from '../BootstrapModal'
import { ItemTypes } from '../Constants/Constants';




const NoteTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    console.log("BELU ESTUVO AQUI ")
    component.updatePosition(item.id, left, top);
  }
};


class Board extends Component{

  render(){
    var notemap = this.state.notes
    const { connectDropTarget } = this.props;
    const { notes } = this.state;
    return connectDropTarget(
      <div className={classes.board}>
      <label className={classes.label1}>My personal board</label>

        <div className="col-md-8">
              <div className="row">
                    <div className="col-md-4">
                          <button type= "button" className={" btn btn-primary",classes.button}  onClick={this.add.bind(this, "New note")}>
                           <span className="glyphicon glyphicon-plus"></span> ADD NOTE </button>
                           </div>
                             <div className="col-md-4">
                           <button type="button" className={" btn btn-success", classes.button} onClick={this.saveNotes.bind(this)}> SAVE </button>
                           <BootstrapModal ref="mymodal" message={this.state.message}></BootstrapModal>
                      </div>
                </div>
          </div>
            <div className={classes.Notecontainer}>
              {Object.keys(notemap).map((key) =>{
                console.log(notemap[key].left + ' key:' + key)
                console.log(notemap[key].top + ' key:' + key)
                return(
                      <Note key={key}
                        id={key}
                        onChange= {this.update.bind(this)}
                        onRemove={this.remove.bind(this)}
                        left= {notemap[key].left}
                        top= {notemap[key].top}
                      >{notemap[key].content}</Note>
                    );
              }
              )}
          </div>
        </div>
    );
  }

  nextId() {
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
  }

saveNotes(){
  var notemap = this.state.notes;
  var ideasList = Object.keys(notemap).map((key) =>{
    return ({
      "content": notemap[key].text,
      "username": notemap[key].username,
      "content": notemap[key].content,
      "comments": notemap[key].comments,
      "ranking": notemap[key].ranking,
      "reunionId": notemap[key].reunionId
    });
})
axios.post('http://localhost:8080/meeting/ideas/save',{
  ideasList}).then(function (response) {
    console.log(response.status);
    this.setState({message: '¡Your notes were successfully saved!'});
    this.refs.mymodal.openModal();
  }.bind(this)).catch(function (response) {
    console.log(response.status);
  })
console.log(ideasList);
}

generateRandomNumber(){
  return Math.floor(Math.random() * 200) + 1 ;
}
  add(text){
    var map = this.state.notes;
    var id =this.nextId()
    map[id] =
      {
        id:id,
        content: text,
        left:this.generateRandomNumber(),
        top:this.generateRandomNumber(),
        username: "belen",
        content: 'No comments',
        comments: 'My first note :)',
        ranking: 10,
        reunionId: 'SomeHash'
        };
    this.setState({notes:map})
    //this.forceUpdate();
  }

  update(newText, id){
    var map = this.state.notes
    map[id].content = newText;
    this.setState({notes:map})
    //this.forceUpdate();
  }

  updatePosition(id, left, top){
    var map = this.state.notes
    map[id].left = left;
    map[id].top = top;
    this.setState({notes:map})
    //this.forceUpdate();
  }

  remove(id){
    var map = this.state.notes
    delete map[id]
    this.setState({notes:map})
    //this.forceUpdate();
  }

  constructor(props){
    super(props);
    this.state= {notes:{}}
  };
}

Board.propTypes = {
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(ItemTypes.NOTE, NoteTarget,  connect =>
        ({ connectDropTarget: connect.dropTarget()}))(Board);
