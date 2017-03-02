import React, {Component, PropTypes} from 'react'
import {submitUser, userExistence} from '../../utils/actions/userActions'
import {getProfessions, getNationalities} from '../../utils/actions/utilsActions'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import AutocompleteComponent from '../AutocompleteComponent/AutocompleteComponent'
import BootstrapModal from '../BootstrapModal'
import user from './user.png'
import classes from './RegistrationForm.scss'
import cssClasses from '../ComponentCSSForms/componentCSS.scss'
import {RadioGroup, RadioButton} from 'react-toolbox/lib/radio'
import DatePicker from 'react-toolbox/lib/date_picker'
import Input from 'react-toolbox/lib/input'
import themeLabel from './label.scss'
import Tooltip from 'react-toolbox/lib/tooltip'
import {PATHS} from '../../constants/routes'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Spinner from '../Spinner/Spinner'
import Checkbox from 'react-toolbox/lib/checkbox'
import {canSaveString} from '../../utils/validationUtils'


const TooltipInput = Tooltip(Input);
const TooltipCheckbox = Tooltip(Checkbox);
const MIN_LENGTH = 6;

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
      userExists: '',
      score: 0,
      useSlack: false
    };
  }

  componentDidMount() {
    getProfessions()
      .then((response) => {
        getNationalities()
          .then((response) => {
            this.setState({showSpinner: false, dropDownSourceNationalities: response.data["nationalities"]});
          });
        this.setState({dropDownSourceProfession: response.data});
      });
  }

  validateFields(field1, field2) {
    return (field1 === field2)
  }

  validatePassword() {
    if (this.validateFields(this.state.password, this.state.repeatPassword)) {
      return '';
    }
    else {
      return 'Passwords must match'
    }
  }

  validateMinLength(key, value) {
    if (value.length == 0 || value.length >= MIN_LENGTH) {
      return '';
    }
    else {
      return 'Your ' + key + ' is too short. It should have ' + MIN_LENGTH + ' characters.'
    }
  }


  saveUser() {
    if (canSaveString(this.state.firstName, this.state.lastName, this.state.profession, this.state.username,
        this.state.mail, this.state.hobbies, this.state.nationality)
      && this.validateFields(this.state.password, this.state.repeatPassword)) {

      this.setState({showSpinner: true});

      submitUser(this.state, this.state.nationality, this.state.profession)
        .then(() => {
        
          this.props.goToHome()

        })
        .catch(() => {
          this.setState({messageModal: 'User cannot be created at this moment, try again later, thanks'});
          this.refs.registrationModal.openModal();
        });
    }
    else {
      this.setState({messageModal: 'You must complete the required fields'});
      this.refs.registrationModal.openModal();
    }
  }

  handleChange = (key, value) => {
    this.setState({[key]: value})
  };

  dateChange = (datetime) => {
    this.state.date.setFullYear(datetime.getFullYear());
    this.state.date.setMonth(datetime.getMonth());
    this.state.date.setDate(datetime.getDate());
  };

  checkUsername() {
    userExistence(this.state.username)
      .then(() => {
        this.setState({userExists: 'This username already exists, please try another'})
      })
      .catch(() => {
        this.setState({userExists: ''})
      })
  }

  render() {
    if (!this.state.showSpinner) {
      return (
        <div className={"container " + cssClasses.containerForm}>
          <BootstrapModal ref="registrationModal" message={this.state.messageModal}/>
          <div className={cssClasses.labelMainTitle}>
            <label>CREATE YOUR ACCOUNT</label>
          </div>
          <div className={cssClasses.form}>
            <div className={"row col-md-12 "  + cssClasses.paddingInnerElements}>
              <img className={cssClasses.imageAvatar} src={user}/>
              <label>
                <span className={cssClasses.labelInfo}> Add a photo </span>
                <p className={cssClasses.paragraphImageFooter}>to help your teammates identify you</p>
              </label>
            </div>
            <div className={"row " + cssClasses.labelInfo}>
              <label>
                <span >Personal Information</span>
              </label>
            </div>
            <div className={"row col-md-12 " + cssClasses.paddingInnerElements}>
              <InputComponent className="col-md-6" type='text' label='First Name' name='firstName'
                              value={this.state.firstName} required
                              onValueChange={this.handleChange.bind(this, 'firstName')}/>
              <InputComponent className="col-md-6" type='text' label='Last Name'
                              name='lastName'
                              value={this.state.lastName} required
                              onValueChange={this.handleChange.bind(this, 'lastName')}/>
            </div>
            <div className={"row col-md-12 " + cssClasses.paddingInnerElements}>
              <div className="col-md-6">
                <DatePicker label='Date of birth' sundayFirstDayOfWeek
                            required onChange={this.dateChange} theme={themeLabel} value={this.state.date}
                            maxDate={new Date()}/>
              </div>
              <div className="col-md-6">
                <RadioGroup name='gender' value={this.state.genderValue}
                            onChange={this.handleChange.bind(this, 'genderValue')} className={classes.radioButton}>
                  <RadioButton label='Female' value='female' theme={themeLabel}/>
                  <RadioButton label='Male' value='male' theme={themeLabel}/>
                </RadioGroup>
              </div>
            </div>
            <div className="row col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <AutocompleteComponent onValueChange={this.handleChange.bind(this, 'profession')}
                                         initialValue={this.state.profession}
                                         label="Select Profession" source={this.state.dropDownSourceProfession}/>
                </div>
                <div className="col-md-6">
                  <AutocompleteComponent onValueChange={this.handleChange.bind(this, 'nationality')}
                                         initialValue={this.state.nationality}
                                         label="Select Nationality" source={this.state.dropDownSourceNationalities}/>
                </div>
              </div>
            </div>
            <div className={"col-md-12 " + cssClasses.paddingInnerElements}>
              <TooltipInput type='text' label='Hobbies' theme={themeLabel} name='hobbies'
                            value={this.state.hobbies}
                            required onChange={this.handleChange.bind(this, 'hobbies')} maxLength={200}
                            tooltip='Write hobbies separate by commas'/>
            </div>
            <div className={"col-md-12 " + cssClasses.labelInfo}>
              <label>
                <span>Slack account</span>
              </label>
              <TooltipCheckbox label='Slack'
                               checked={this.state.useSlack}
                               onChange={this.handleChange.bind(this, 'useSlack')}
                               tooltip='Join our Slack team - Iteam App'/>
            </div>
            <div className={"row " + cssClasses.labelLeftAlign}>
              <label>
                <span className={cssClasses.labelInfo}>User Information</span>
              </label>
            </div>
            <div className={"row col-md-12 " + cssClasses.paddingInnerElements}>
              <InputComponent className="col-md-6" type='email' label='Email address' icon='email'
                              value={this.state.mail} onValueChange={this.handleChange.bind(this, 'mail')}
                              required/>
              <InputComponent className="col-md-6" label='Username'
                              value={this.state.username}
                              onValueChange={this.handleChange.bind(this, 'username')} required
                              onBlur={this.checkUsername.bind(this)}
                              onValueError={this.state.userExists}
                              maxLength={25}
                              onValueError={this.validateMinLength('username',this.state.username)}/>
            </div>
            <div className="row col-md-12">
              <div className="row">
                <InputComponent className="col-md-6" type='password' label='Password'
                                value={this.state.password}
                                onValueChange={this.handleChange.bind(this, 'password')}
                                onValueError={this.validateMinLength('password',this.state.password)}
                                maxLength={20}/>
              </div>
              <div className="row">
                <InputComponent className="col-md-6" type='password' label='Repeat Password'
                                value={this.state.repeatPassword}
                                onValueChange={this.handleChange.bind(this, 'repeatPassword')}
                                onValueError={this.validatePassword()}/>
              </div>
            </div>
            <div className="row">
              <ButtonComponent className={"col-md-12 " + classes.buttonCreate} raisedValue iconButton="save"
                               value="Create"
                               onClick={this.saveUser.bind(this)}/>
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
