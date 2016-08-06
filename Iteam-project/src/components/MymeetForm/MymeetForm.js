import React, {Component} from 'react'
import TextBox from '../Form/TextBox/TextBox.js'
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap'
import classes from './MymeetForm.scss'
import {getUserData} from '../../redux/modules/ProfileData'
import axios from 'axios'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list'
import {Button, IconButton} from 'react-toolbox/lib/button';

class MymeetForm extends React.Component {

  render(){
    return(
  <div className={"container"}>

              <div className={classes.label}  >
                    <label>MY MEETINGS</label>
            </div>


   <Button icon='+' label='Add this' flat primary />
              <List selectable ripple>
       <ListSubHeader caption='Explore characters' />
       <ListItem
         avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
         caption='Dr. Manhattan'
         legend="Jonathan 'Jon' Osterman"
         rightIcon='star'
       />
       <ListItem
         avatar='https://dl.dropboxusercontent.com/u/2247264/assets/o.jpg'
         caption='Ozymandias'
         legend='Adrian Veidt'
         rightIcon='star'
       />
       <ListItem
         avatar='https://dl.dropboxusercontent.com/u/2247264/assets/r.jpg'
         caption='Rorschach'
         legend='Walter Joseph Kovacs'
         rightIcon='star'
       />

     </List>
</div>

)};
}
export default MymeetForm
