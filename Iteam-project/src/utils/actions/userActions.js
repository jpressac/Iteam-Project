import axios from 'axios'
import {USER} from '../../constants/HostConfiguration'

export function submitUser(data) {

  let hobbiesList = data.hobbies.split(',');

  return axios.post(USER.UPDATE_USER, {
    username: data.username,
    password: data.password,
    nationality: data.nationality,
    bornDate: data.date.getTime(),
    mail: data.mail,
    gender: data.genderValue,
    hobbies: hobbiesList,
    profession: data.profession,
    name: data.firstName,
    lastName: data.lastName
  })
}

export function updateUser(data) {

  let hobbiesList = data.hobbies.split(',');

  let objToUpdate = {
    hobbies: hobbiesList,
    profession: data.professionName,
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


