import axios from 'axios'
import {USER} from '../../constants/HostConfiguration'

export function submitUser(data, nationality, profession) {

  let hobbiesList = data.hobbies.split(',');

  return axios.post(USER.POST_USER, {
    username: data.username,
    password: data.password,
    nationality: nationality,
    bornDate: data.date.getTime(),
    mail: data.mail,
    gender: data.genderValue,
    hobbies: hobbiesList,
    profession: profession,
    name: data.firstName,
    lastName: data.lastName,
    score: data.score,
    useSlack : data.useSlack
  })
  
  
}

export function updateUser(data, profession) {

  let hobbiesList = data.hobbies.split(',');

  let objToUpdate = {
    hobbies: hobbiesList,
    profession: profession,
  };

  if (data.oldPassword !== '' && data.password !== '') {
    Object.assign(objToUpdate, {password: data.oldPassword, newPassword: data.password});
  }

  return axios.post(USER.UPDATE_USER, objToUpdate)
}

export function validatePasswordUser(oldPassword) {

  return axios.get(USER.PASSWORD_VALIDATION, {
    params: {
      password: oldPassword
    }
  })
}

export function getUserInformation() {
  return axios.get(USER.GET_USER)
}

export function userExistence(username) {
  return axios.get(USER.USER_EXISTS, {
    params: {
      username: username
    }
  })
}


