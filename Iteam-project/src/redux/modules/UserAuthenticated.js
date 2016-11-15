import axios from 'axios'
import {USER} from '../../constants/HostConfiguration'


/*Return if a user is authenticated or not*/

export function fetchUser(){
  return new Promise((resolve, reject) => {
      axios.get(USER.GET_USER)
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  })
}

export function userExists(){
  return new Promise((resolve, reject) => {
    axios.get(USER.LOGIN_USER)
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  })
}
