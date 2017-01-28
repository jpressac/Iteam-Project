import React, {Component, PropTypes} from 'react';
import {updateUser, validatePasswordUser, getUserInformation} from '../../utils/actions/userActions.js';
import {getProfessions} from '../../utils/actions/utilsActions'
import classes from './ProfileForm.scss';
import {PATHS} from './../../constants/routes';
import user from './user.png';
import {connect} from 'react-redux';
import Tooltip from 'react-toolbox/lib/tooltip';
import {push} from 'react-router-redux';
import Spinner from '../Spinner/Spinner';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import Input from 'react-toolbox/lib/input';
import tooltopLabel from './tooltipLabel.css';
import BootstrapModal from "../BootstrapModal";

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
      bornDate: new Date(),
      mail: '',
      genderValue: 'male',
      hobbies: '',
      username: '',
      oldPassword: '',
      password: '',
      errorOldPassword: '',
      repeatPassword: '',
      showSpinner: true,
      canSave: true,
      messageModal: '',
      dropDownSource: {},
      profession: ''
    }
  }

  componentDidMount() {
    getProfessions()
      .then((response) => {
        this.setState({showSpinner: false, dropDownSource: response.data})
      });
  }

  componentWillMount() {
    getUserInformation()
      .then((response) => {
        this.setState({
          firstName: response.data.name,
          lastName: response.data.lastName,
          bornDate: new Date(response.data.bornDate),
          mail: response.data.mail,
          genderValue: response.data.gender,
          hobbies: response.data.hobbies.toString(),
          username: response.data.username,
          nationality: response.data.nationality,
          profession: response.data.profession
        })
      })
  }


  saveUser() {
    if (this.state.canSave) {
      updateUser(this.state, this.state.profession)
        .then(() => {
          this.setState({messageModal: 'Profile information successfully updated'});
          this.refs.profileModal.openModal();
        })
        .catch(() => {
          this.setState({messageModal: 'Profile information cannot be updated, please try again later'});
          this.refs.profileModal.openModal();
        });
    } else {
      this.setState({messageModal: '¡Please verify modified fields!'});
      this.refs.profileModal.openModal();
    }
  }

  validatePassword() {
    if (this.state.password === this.state.repeatPassword) {
      return '';
    } else {
      return 'Passwords must match'
    }
  }

  handleChangeState = (key, value) => {
    this.setState({[key]: value});
  };

  validateOldPassword() {
    if (this.state.oldPassword !== '') {
      validatePasswordUser(this.state.oldPassword)
        .then(() => {
          this.setState({errorOldPassword: '', canSave: true})
        })
        .catch(() => {
          this.setState({errorOldPassword: 'Invalid Password', canSave: false})
        })
    } else {
      this.setState({errorOldPassword: '', canSave: true})
    }
  }

  render() {
    if (!this.state.showSpinner) {
      return (
        <div className={"container"} style={{marginTop: 80, width: 800}}>
          <BootstrapModal ref="profileModal" message={this.state.messageModal}/>
          <div className={classes.label2}>
            <label>MY PROFILE</label>
          </div>
          <div className={classes.form}>
            <div className={"form-horizontal"}>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <img src={user} style={{width: 100}}/>
                    <span className={classes.labelInfo}><label>Welcome {this.state.username}!</label></span >
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className={classes.labelInfo}>
                    <label style={{margin: 15}}>Personal information</label>
                  </div>
                  <div className="row">
                    <InputComponent className="col-md-6" type='text' label='First Name' name='firstName' disable
                                    value={this.state.firstName}/>

                    <InputComponent className="col-md-6" type='text' label='Last Name'
                                    name='lastName' value={this.state.lastName} disable/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <InputComponent className="col-md-6" type='text' label="Born Date" name='bornDate'
                                    value={this.state.bornDate.toLocaleDateString()} disable/>
                    <div className="row">
                      <InputComponent className="col-md-6" type='text' label='Nationality' disable
                                      name='nationality'
                                      value={this.state.nationality}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <DropdownComponent source={this.state.dropDownSource} label="Select profession"
                                         initialValue={this.state.profession}
                                         onValueChange={this.handleChangeState.bind(this, 'profession')}/>
                    </div>
                    <div className="col-md-6 ">
                      <TooltipInput type='text' label='Hobbies' theme={tooltopLabel} name='hobbies'
                                    value={this.state.hobbies}
                                    required onChange={this.handleChangeState.bind(this, 'hobbies')} maxLength={200}
                                    tooltip='Write hobbies separate by commas'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className={classes.labelInfo}>
                  <label>Account information</label>
                </div>
                <div className="row">
                  <InputComponent className="col-md-8" type='email' label='Email address' icon='email'
                                  value={this.state.mail} disable/>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <InputComponent className="col-md-6" type='password' label='Old Password' required
                                  value={this.state.oldPassword}
                                  onValueChange={this.handleChangeState.bind(this, 'oldPassword')}
                                  onBlur={this.validateOldPassword.bind(this)}
                                  onValueError={this.state.errorOldPassword}/>
                </div>
                <div className="row">
                  <InputComponent className="col-md-6" type='password' label='New Password' value={this.state.password}
                                  onValueChange={this.handleChangeState.bind(this, 'password')}
                                  onValueError={this.validatePassword()}/>
                </div>
                <div className="row">
                  <InputComponent className="col-md-6" type='password' label='Repeat Password'
                                  value={this.state.repeatPassword}
                                  onValueChange={this.handleChangeState.bind(this, 'repeatPassword')}
                                  onValueError={this.validatePassword()}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <ButtonComponent className="col-md-6" value='SAVE CHANGES'
                                     onClick={this.saveUser.bind(this)} iconButton='save'/>
                    <ButtonComponent className="col-md-6" iconButton='backspace' onClick={this.props.home}
                                     value='BACK'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Spinner/>
      )
    }
  };
}
ProfileForm.propTypes = {
  home: PropTypes.func
};

export default connect(null, mapDispatchToProps)(ProfileForm)
