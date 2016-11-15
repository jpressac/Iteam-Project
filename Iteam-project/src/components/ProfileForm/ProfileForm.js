import React, {Component, PropTypes} from 'react'
import {submitUser} from '../../redux/profileForm/actions.js'
import classes from './ProfileForm.scss'
import {PATHS} from './../../constants/routes'
import axios from 'axios'
import user from './user.png'
import {connect} from 'react-redux'
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import themeLabel from './label.scss'
import {Button, IconButton} from 'react-toolbox/lib/'
import Tooltip from 'react-toolbox/lib/tooltip';
import {push} from 'react-router-redux'
import {UTILITIES} from '../../constants/HostConfiguration'


const mapStateToProps = (state) => {
  if (state.loginUser !== null) {
    return {
      user: state.loginUser.user
    }
  }
};
const mapDispatchToProps = dispatch => ({
  home: () => dispatch(push('/' + PATHS.MENULOGGEDIN.HOME))

});

const TooltipInput = Tooltip(Input);

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      nationality: '',
      nationalityValue: [],
      bornDate: new Date(this.props.user.bornDate),
      mail: '',
      genderValue: 'male',
      professionName: '',
      professionValue: [],
      hobbies: '',
      username: '',
      oldPassword: '',
      password: '',
      repeatPassword: ''
    }
  }

//CONTROLAR CAMPOS NULOS!!!
  saveUser() {
    // validate change password, and we need to re-render
    submitUser(this.state);
  }

  validatePassword() {
    if (this.state.password === this.state.repeatPassword) {
      return '';
    } else {
      return 'Passwords must match'
    }
  }

  componentDidMount() {
    axios.get(UTILITIES.PROFESSIONS).then(function (response) {
      this.setValuesOptionsProfessions(response.data);
    }.bind(this));
    this.initialComboProfession();

  }

  initialComboProfession(opt) {
    let filteredLabelObject = opt.filter(filter => filter["label"] == this.props.user.profession.toLowerCase());
    this.setState({Value: filteredLabelObject[0]["value"], professionName: name})
  }

  comboProfession(value) {
    let filteredLabelObject = this.state.professionValue.filter(filter => filter["value"] == value);
    this.setState({Value: value, professionName: filteredLabelObject[0]["label"]})
  }


  setValuesOptionsProfessions(data) {
    let opt = data.map(function (option, index) {
      var rObj = {};
      rObj["value"] = index;
      rObj["label"] = option;
      return rObj;
    });

    this.initialComboProfession(opt);

    this.setState({professionValue: opt});
  }

  handleChangeHobbies = (hobbies, value) => {
    this.setState({...this.state, [hobbies]: value});
  };

  handleChangeMail = (mail, value) => {
    this.setState({...this.state, [mail]: value});
  };

  handleChangeOldPassword = (oldPassword, value) => {
    this.setState({...this.state, [OldPassword]: value});
  };

  handleChangePassword = (password, value) => {
    this.setState({...this.state, [password]: value});
  };

  handleChangeRepeatPassword = (repeatPassword, value) => {
    this.setState({...this.state, [repeatPassword]: value});
  };

  dropdownProfession() {
    return (
      <Dropdown label="Select profession" auto theme={themeLabel} style={{color: '#900C3F'}}
                onChange={this.comboProfession.bind(this)} required
                source={this.state.professionValue} value={this.state.Value}/>
    );
  };


  render() {
    return (
      <div className={"container"} style={{marginTop: 80, width: 800}}>
        <div className={classes.label2}>
          <label>MY PROFILE</label>
        </div>

        <div className={classes.form}>
          <div className={"form-horizontal"}>
            <div className="form-group">
              <div className="col-md-12">
                <div className="row">
                  <img src={user} style={{width: 100}}/>
                  <span className="glyphicon glyphicon-user"
                        className={classes.labelInfo}><label>Welcome {this.props.user.username}!</label></span >

                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className={classes.labelInfo}>
                  <label style={{margin: 15}}>Personal information</label>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Input type='text' label='First Name' theme={themeLabel} name='firstName'
                           value={this.props.user.name} disabled/>
                  </div>
                  <div className="col-md-6">
                    <Input type='text' label='Last Name' disabled theme={themeLabel} name='lastName'
                           value={this.props.user.lastName}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <Input label="Born Date" name='bornDate' disabled value={this.state.bornDate.toLocaleDateString()}/>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Input type='text' label='Nationality' disabled theme={themeLabel} name='nationality'
                             value={this.props.user.nationality}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    {this.dropdownProfession()}
                  </div>
                  <div className="col-md-6 ">
                    <TooltipInput type='text' label='Hobbies' theme={themeLabel} name='hobbies'
                                  value={this.props.user.hobbies}
                                  required onChange={this.handleChangeHobbies.bind(this, 'hobbies')} maxLength={200}
                                  tooltip='Write hobbies separate by commas'/>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className={classes.labelInfo}>
                <label>Account information</label>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <Input type='email' label='Email address' icon='email' theme={themeLabel}
                         value={this.props.user.mail} disabled/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <Input type='password' label='Old Password' required theme={themeLabel}
                         value={this.state.oldPassword}
                         onChange={this.handleChangeOldPassword.bind(this, 'oldPassword')}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Input type='password' label='New Password' required theme={themeLabel}
                         value={this.state.password} onChange={this.handleChangePassword.bind(this, 'password')}
                         error={this.validatePassword()}/>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Input type='password' label='Repeat Password' required theme={themeLabel}
                         value={this.state.repeatPassword}
                         onChange={this.handleChangeRepeatPassword.bind(this, 'repeatPassword')}
                         error={this.validatePassword()}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <Button style={{color: 'white', background: '#900C3F'}} raised
                            onClick={this.saveUser.bind(this)} icon='save'>
                      SAVE CHANGE
                    </Button>
                  </div>
                  <div className="col-md-6">
                    <Button style={{color: 'white', background: '#900C3F'}} raised
                            onClick={this.props.home} icon='backspace'>
                      BACK
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  };
}
ProfileForm.propTypes = {
  user: PropTypes.any,
  home: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
