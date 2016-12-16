import {FORM_SUBMIT, FORM_RESET, FORM_UPDATE_VALUE} from '../../constants/RegistrationFormActions/actions.js';
import axios from 'axios'
import {USER, UTILITIES} from '../../constants/HostConfiguration'

//----ACTION CREATORS-----
export function update(name, value) {
  return dispatch => dispatch({
    type: FORM_UPDATE_VALUE,
    name, value
  });
}

export function reset() {
  return dispatch => dispatch({
    type: FORM_RESET
  });
}

export function submit() {
  return dispatch({
    type: FORM_SUBMIT
  })
}

export function submitUser(data) {
  let hobbiesList = data.hobbies.split(',');
  return axios.post(USER.GET_USER, {
      username: data.username,
      password: data.password,
      nationality: data.nationality,
      bornDate: data.date.getTime(),
      mail: data.mail,
      gender: data.genderValue,
      hobbies: hobbiesList,
      profession: data.professionName,
      name: data.firstName,
      lastName: data.lastName
    }).then(function (response) {
    return response;
  }).catch(function (response) {
    return response.status;
  })
}

export function getNationalities() {
  axios.get(UTILITIES.NATIONALITIES).then(function (response) {
    console.log(response.status);
    console.log('me ejecute exitosamente');
    return response.status;
  }).catch(function (response) {
    console.log(response.error);
    return response.status;
  })
}
