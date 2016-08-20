import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './MymeetForm.scss'
import {getUserData} from '../../redux/modules/ProfileData'
import axios from 'axios'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list'


class MymeetForm extends React.Component {

    constructor(props){
      super(props);
      this.state= {
        data: []
        }

      }
      fillfields() {
        let data= this.state.data;
        this.refs.meet.value= data.ownerName;


      }
      /*componentDidMount(){
        getUserData().then( (response) => {
                 axios.get('http://localhost:8080/user'
                               ).then(function(response){
                               this.setState({ data: response.data} );
                               this.fillfields();
                         }.bind(this)).catch(function(response){
                         console.log(response.error);
                       });
          })*/

  render(){
    return(
  <div className={"container"}>

              <div className={classes.label}  >
                    <label>MY MEETINGS</label>
            </div>


<input type="text" className="form-control" id="inputname" ref="meet"  style={{marginLeft:10, marginTop:10}}></input>
              /*<List selectable ripple>
       <ListSubHeader caption='Explore characters' />
       <ListItem

         caption='Dr. Manhattan'
         legend="Jonathan 'Jon' Osterman"
         rightIcon='star'
       />
       <ListItem

         caption='Ozymandias'
         legend='Adrian Veidt'
         rightIcon='star'
       />
       <ListItem

         caption='Rorschach'
         legend='Walter Joseph Kovacs'
         rightIcon='star'
       />

     </List>*/
</div>

)};
}
export default MymeetForm
