import {RegistrationForm} from '../../components/RegistrationForm/RegistrationForm.js'
import {connect} from 'react-redux';
import {submitUser} from './actions.js'
import {reduxForm} from 'redux-form'
import React from 'react'
import classes from '../../components/RegistrationForm/RegistrationForm.scss'

export class RegistrationFormContainer extends React.Component {
  constructor(props){
    super(props);
  }
  handleSubmit(){
  const { dispatch } = this.props;
  dispatch(submitUser());
  }
  handleChange(){

  }
  render(){
    return(
      <div className={classes.form} >
      <RegistrationForm onSubmit={this.handleSubmit.bind(this)} />
      </div>
)};
}
export default RegistrationFormContainer
