import React, { Component } from 'react';
import classes from './HomeForm.scss'

import img1 from '../LoginForm/image/table.png'
import button from './button.scss';
import button2 from './button2.scss';
import {Button, IconButton} from 'react-toolbox/lib/button';



class HomeForm extends React.Component {


  render (){




    return (

      <div  className={classes.container} >
        <div  className={classes.background}>
        <div>
          <label className={classes.label} > MAKE REMOTE MEETINGS</label>
           <p className={classes.p}> Online brainstorming, synthesis and collaboration</p>
          <Button icon='bookmark' label='GET STARTED' style={{background:'white',color:'#900C3F'}} theme={button}/>
          <Button icon='person' label='LOGIN' style={{color:'white',background:'#900C3F'}} onClick={this.props.login} />
          </div>


      </div>
        </div>


    );
  };}



export default HomeForm
