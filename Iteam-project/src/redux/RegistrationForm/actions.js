import {FORM_SUBMIT , FORM_RESET, FORM_UPDATE_VALUE} from '../../constants/RegistrationFormActions/actions.js';
import axios from 'axios'

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

export function submitUser(data){

  let hobbiesList = data.hobbies.split(',');


  axios.post('http://localhost:8080/user', {
        username: data.username,
        password: data.password,
        nationality: data.nationality,
        bornDate:  data.date.getTime() ,
        mail : data.mail,
        gender:data.genderValue,
        nationality: data.nationality,
        hobbies: hobbiesList,
        profession: data.professionName,
        name: data.firstName,
        lastName: data.lastName
  } ).then(function(response){
      console.log(response.status);
    }).catch(function(response){
    console.log(response.error);
  })
}
export function getNationalities(){
  axios.get('http://localhost:8080/user/nationality').then(function(response){
    console.log(response.status);
    console.log('me ejecute exitosamente');
    return response.status;
  }).catch(function(response){
    console.log(response.error);
    return response.status;
  })
}
