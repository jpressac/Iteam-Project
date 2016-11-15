import React,{Component,PropTypes}from 'react';
import classes from './HomeForm.scss'
import { PATHS } from '../../constants/routes'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import img1 from '../LoginForm/image/table.png'
import button from './button.scss';
import button2 from './button2.scss';
import Dialog from 'react-toolbox/lib/dialog';
import Input from 'react-toolbox/lib/input';
import {Button, IconButton} from 'react-toolbox/lib/button';
import themeLabel from './label.scss'


const mapDispatchToProps = dispatch => ({

  login:()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.LOGIN)),
  register:()=> dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.REGISTER))

});

class HomeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active:false,
      userName:'',
      password:''

    }
  };

  handleChangeUserName = (userName, value) => {
    this.setState({...this.state, [userName]: value});
  };
  handleChangePassword = (password, value) => {
    this.setState({...this.state, [password]: value});
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };


  render (){


    return (

      <div className={classes.container}>
        <div className={classes.background}>
          <div>
            <label className={classes.label}> MAKE REMOTE MEETINGS</label>
            <p className={classes.p}> Online brainstorming, synthesis and collaboration</p>
            <Button icon='bookmark' label='GET STARTED' style={{background:'white',color:'#900C3F'}}
                    onClick={this.props.register} theme={button}/>
            <Button icon='person' label='LOGIN' style={{color:'white',background:'#900C3F'}}
                    onClick={this.handleToggle}/>
            <Dialog
              active={this.state.active}
              className={classes.form}
              onEscKeyDown={this.handleToggle}
              onOverlayClick={this.handleToggle}
              title='SING IN'>
              <form method="POST" className={classes.content}>
                <Input type='text' label='USERNAME' name='username' value={this.state.userName}  style={{color:'#900C3F'}}
                 theme={themeLabel}  onChange={this.handleChangeUserName.bind(this, 'userName')} maxLength={150}/>

                <Input type='password' label='PASSWORD' name='password' value={this.state.password}style={{color:'#900C3F'}}
                       theme={themeLabel}   onChange={this.handleChangePassword.bind(this, 'password')} maxLength={150}/>


                <Button type="submit" icon="done" label="SING IN" style={{background:'#900C3F',color:'white',marginTop:5}}/>
              </form>

            </Dialog>
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
