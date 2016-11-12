import React, {Component} from 'react';
import {submitUser} from '../../redux/RegistrationForm/actions.js'
import axios from 'axios'
import user from './user.png'
import classes from './RegistrationForm.scss'
import {RadioGroup, RadioButton} from 'react-toolbox/lib/radio';
import DatePicker from 'react-toolbox/lib/date_picker';
import Dropdown from 'react-toolbox/lib/dropdown';
import Input from 'react-toolbox/lib/input';
import themeLabel from './label.scss'
import Tooltip from 'react-toolbox/lib/tooltip';
import {Button, IconButton} from 'react-toolbox/lib/'

const TooltipInput = Tooltip(Input);

class RegistrationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      nationality: '',
      nationalityValue: [],
      date: new Date(),
      mail: '',
      genderValue: 'male',
      professionName: '',
      professionValue: [],
      hobbies: '',
      username: '',
      password: '',
      repeatPassword: '',
      errors: {}
    };

  }

  componentDidMount() {

    axios.get('http://localhost:8080/utilities/professions').then(function (response) {
      this.setValuesOptionsProfessions(response.data);
    }.bind(this));

    axios.get('http://localhost:8080/utilities/nationality/get').then(function (response) {
      this.setValuesOptionsNationalities(response.data);
    }.bind(this));

  }

  saveUser() {
    submitUser(this.state);
  }


  maleCheckboxChanged(event) {
    let checked = event.target.checked;
    if (checked) {
      this.setState({gender: 'male'});
    } else {
      this.setState({gender: 'female'});
    }
  }

  femaleCheckboxChanged(event) {
    let checked = event.target.checked;
    if (checked) {
      this.setState({gender: 'female'});
    } else {
      this.setState({gender: 'male'});
    }
  }

  handleChangeFirstName = (firstName, value) => {
    this.setState({...this.state, [firstName]: value});
  };
  handleChangeLastName = (lastName, value) => {
    this.setState({...this.state, [lastName]: value});
  };
  dateChange = (datetime) => {
    this.state.date.setFullYear(datetime.getFullYear());
    this.state.date.setMonth(datetime.getMonth());
    this.state.date.setDate(datetime.getDate());

  };
  handleChange = (field, value) => {
    this.setState({[field]: value});
  };

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
    this.setState({professionValue: opt});
  }

  dropdownProfession() {
    return (
      <Dropdown label="Select profession" auto theme={themeLabel} style={{color: '#900C3F'}}
                onChange={this.comboProfession.bind(this)} required
                source={this.state.professionValue} value={this.state.Value}/>
    );
  };

  comboNationality(value) {
    let filteredLabelObject = this.state.nationalityValue.filter(filter => filter["value"] == value);
    this.setState({nValue: value, nationality: filteredLabelObject[0]["label"]})
  }

  setValuesOptionsNationalities(data) {
    let opt = data["nationalities"].map(function (option, index) {
      var rObj = {};
      rObj["value"] = index;
      rObj["label"] = option;
      return rObj;
    });
    this.setState({nationalityValue: opt});
  }

  dropdownNationalities() {
    return (
      <Dropdown label="Select Nationality" auto theme={themeLabel} style={{color: '#900C3F'}} required
                onChange={this.comboNationality.bind(this)}
                source={this.state.nationalityValue} value={this.state.nValue}/>
    );
  };

  handleChangeHobbies = (hobbies, value) => {
    this.setState({...this.state, [hobbies]: value});
  };

  handleChangeMail = (mail, value) => {
    this.setState({...this.state, [mail]: value});
  };

  handleChangeUsername = (username, value) => {
    this.setState({...this.state, [username]: value});
  };

  handleChangePassword = (password, value) => {
    this.setState({...this.state, [password]: value});
  };

  handleChangeRepeatPassword = (repeatPassword, value) => {
    this.setState({...this.state, [repeatPassword]: value});
  };

  handleChangeGender = (genderValue) => {
    this.setState({genderValue});
  };

  render() {
    return (
      <div className={"container"} style={{marginTop: 80, width: 800}}>
        <div className={classes.label2}>
          <label>CREATE YOUR ACCOUNT</label>
        </div>

        <div className={classes.form}>
          <form className={"form-horizontal"}>
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
                  <div className="col-md-6">
                    <Input type='text' label='First Name' theme={themeLabel} name='firstName'
                           value={this.state.firstName} required
                           onChange={this.handleChangeFirstName.bind(this, 'firstName')} maxLength={150}/>
                  </div>
                  <div className="col-md-6">
                    <Input type='text' label='Last Name' required theme={themeLabel} name='lastName'
                           value={this.state.lastName}
                           onChange={this.handleChangeLastName.bind(this, 'lastName')} maxLength={150}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <DatePicker label='Date of birth' sundayFirstDayOfWeek
                                required onChange={this.dateChange} theme={themeLabel} value={this.state.date}/>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <RadioGroup name='gender' value={this.state.genderValue} onChange={this.handleChangeGender}>
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
                    {this.dropdownProfession()}
                  </div>
                  <div className="col-md-6 ">
                    {this.dropdownNationalities()}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-8">
                <div className="row">
                  <TooltipInput type='text' label='Hobbies' theme={themeLabel} name='hobbies' value={this.state.hobbies}
                                required onChange={this.handleChangeHobbies.bind(this, 'hobbies')} maxLength={200}
                                tooltip='Write hobbies separate by commas'/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <Input type='email' label='Email address' icon='email' theme={themeLabel}
                         value={this.state.mail} required onChange={this.handleChangeMail.bind(this, 'mail')}/>
                </div>
                <div className="col-md-6">
                  <Input label='Username' theme={themeLabel}
                         value={this.state.username} required onChange={this.handleChangeUsername.bind(this, 'username')}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="row">
                    <Input type='password' label='Password' required theme={themeLabel}
                           value={this.state.password} onChange={this.handleChangePassword.bind(this, 'password')}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <Input type='password' label='Repeat Password' required theme={themeLabel}
                           value={this.state.repeatPassword}
                           onChange={this.handleChangeRepeatPassword.bind(this, 'repeatPassword')}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-6">
                <div className="row">
                  <Button style={{margin: 15, color: '#900C3F'}} target='_blank' raised
                          onClick={this.saveUser.bind(this)}>
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
}
export default RegistrationForm
