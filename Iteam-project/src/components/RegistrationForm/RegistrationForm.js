import React, {Component, PropTypes} from "react";
import {submitUser} from "../../utils/actions/userActions";
import {getProfessions, getNationalities} from '../../utils/actions/utilsActions';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import DropdownComponent from '../DropdownComponent/DropdownComponent';
import BootstrapModal from "../BootstrapModal";
import user from "./user.png";
import classes from "./RegistrationForm.scss";
import {RadioGroup, RadioButton} from "react-toolbox/lib/radio";
import DatePicker from "react-toolbox/lib/date_picker";
import Input from "react-toolbox/lib/input";
import themeLabel from "./label.scss";
import Tooltip from "react-toolbox/lib/tooltip";
import {PATHS} from "../../constants/routes";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import Spinner from "../Spinner/Spinner";

const TooltipInput = Tooltip(Input);

const mapDispatchToProps = (dispatch) => ({

  goToHome: () => dispatch(push('/' + PATHS.MENUNOTLOGGEDIN.HOME))
});

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      nationality: '',
      dropDownSourceNationalities: [],
      date: new Date(),
      mail: '',
      genderValue: 'male',
      profession: '',
      dropDownSourceProfession: [],
      hobbies: '',
      username: '',
      password: '',
      repeatPassword: '',
      errors: {},
      showSpinner: true,
      messageModal: '',
    };
  }

  componentDidMount() {
    getProfessions()
      .then((response) => {
        getNationalities()
          .then((response) => {
            console.log(response.data["nationalities"]);
            this.setState({showSpinner: false, dropDownSourceNationalities: response.data["nationalities"]});
          });
        this.setState({dropDownSourceProfession: response.data});
      });
  }

  validatePassword() {
    if (this.state.password === this.state.repeatPassword) {
      return '';
    } else {
      return 'Passwords must match'
    }
  }

  saveUser() {
    this.setState({showSpinner: true});
    submitUser(this.state)
      .then(() => {
        this.props.goToHome()
      })
      .catch(() => {
        this.setState({messageModal: 'New user cannot be created at this moment, try again later, thanks'});
        this.refs.registrationModal.openModal();
      });
  }

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  dateChange = (datetime) => {
    this.state.date.setFullYear(datetime.getFullYear());
    this.state.date.setMonth(datetime.getMonth());
    this.state.date.setDate(datetime.getDate());
  };

  render() {
    if (!this.state.showSpinner) {
      return (
        <div className="container" style={{marginTop: 80, width: 800}}>
          <BootstrapModal ref="registrationModal" message={this.state.messageModal}/>
          <div className={classes.label2}>
            <label>CREATE YOUR ACCOUNT</label>
          </div>
          <div className={classes.form}>
            <div className={"form-horizontal"}>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <img src={user} style={{width: 100}}/>
                    <label>
                      <span style={{fontWeight: 'bold'}}> Add a photo </span>
                      <p>to help your teammates identify you</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <InputComponent className="col-md-6" type='text' label='First Name' name='firstName'
                                    value={this.state.firstName}
                                    onValueChange={this.handleChange.bind(this, 'firstName')}/>
                    <InputComponent className="col-md-6" type='text' label='Last Name'
                                    name='lastName'
                                    value={this.state.lastName}
                                    onValueChange={this.handleChange.bind(this, 'lastName')}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <DatePicker label='Date of birth' sundayFirstDayOfWeek
                                  required onChange={this.dateChange} theme={themeLabel} value={this.state.date}
                                  maxDate={Date.now()}/>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <RadioGroup name='gender' value={this.state.genderValue}
                                    onChange={this.handleChange.bind(this, 'genderValue')}>
                          <RadioButton label='Female' value='female' theme={themeLabel}/>
                          <RadioButton label='Male' value='male' theme={themeLabel}/>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6">
                      <DropdownComponent source={this.state.dropDownSourceProfession} label="Select profession"
                                         initialValue={this.state.profession}/>
                    </div>
                    <div className="col-md-6 ">
                      <DropdownComponent source={this.state.dropDownSourceNationalities} label="Select nationality"
                                         initialValue={this.state.nationality}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-8">
                  <div className="row">
                    <TooltipInput type='text' label='Hobbies' theme={themeLabel} name='hobbies'
                                  value={this.state.hobbies}
                                  required onChange={this.handleChange.bind(this, 'hobbies')} maxLength={200}
                                  tooltip='Write hobbies separate by commas'/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <InputComponent className="col-md-6" type='email' label='Email address' icon='email'
                                  value={this.state.mail} onValueChange={this.handleChange.bind(this, 'mail')}/>
                  <InputComponent className="col-md-6" label='Username'
                                  value={this.state.username}
                                  onValueChange={this.handleChange.bind(this, 'username')}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="row">
                    <InputComponent className="col-md-6" type='password' label='Password'
                                    value={this.state.password}
                                    onValueChange={this.handleChange.bind(this, 'password')}
                                    onValueError={this.validatePassword()}/>
                  </div>
                  <div className="row">
                    <InputComponent className="col-md-6" type='password' label='Repeat Password'
                                    value={this.state.repeatPassword}
                                    onValueChange={this.handleChange.bind(this, 'repeatPassword')}
                                    onValueError={this.validatePassword()}/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <ButtonComponent className="col-md-6" iconButton="save" value="Create"
                                   onClick={this.saveUser.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Spinner/>
      )
    }
  }
}

RegistrationForm.propTypes = {
  goToHome: PropTypes.func
};

export default connect(null, mapDispatchToProps)(RegistrationForm)
