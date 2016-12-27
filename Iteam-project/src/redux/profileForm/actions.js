import {FORM_SUBMIT , FORM_RESET, FORM_UPDATE_VALUE} from '../../constants/RegistrationFormActions/actions.js';
import axios from 'axios'
import {USER} from '../../constants/HostConfiguration'

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

  axios.post(USER.POST_USER, {
        username: data.user.username,
        hobbies: data.hobbies,
        profession: data.user.professionName
  } ).then(function(response){
      console.log(response.status);
    }).catch(function(response){
    console.log(response.status);
  })
}


