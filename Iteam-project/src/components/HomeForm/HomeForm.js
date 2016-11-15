import React,{Component,PropTypes}from 'react';
import classes from './HomeForm.scss'
import { PATHS } from '../../constants/routes'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import img1 from '../LoginForm/image/table.png'
import button from './button.scss';
import button2 from './button2.scss';
import {Button, IconButton} from 'react-toolbox/lib/button';


const mapDispatchToProps = dispatch => ({

  login:()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.LOGIN)),
  register:()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.REGISTER))

});

class HomeForm extends React.Component {


  render (){


    return (

      <div  className={classes.container} >
        <div  className={classes.background}>
        <div>
          <label className={classes.label} > MAKE REMOTE MEETINGS</label>
           <p className={classes.p}> Online brainstorming, synthesis and collaboration</p>
          <Button icon='bookmark' label='GET STARTED' style={{background:'white',color:'#900C3F'}} onClick={this.props.register} theme={button}/>
          <Button icon='person' label='LOGIN' style={{color:'white',background:'#900C3F'}} onClick={this.props.login} />
          </div>


      </div>
        </div>


    );
  };}

HomeForm.propTypes ={

  register:PropTypes.func,

  login:PropTypes.func

};

export default connect(null,mapDispatchToProps) (HomeForm)
