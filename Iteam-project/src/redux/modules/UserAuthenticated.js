import axios from 'axios'


/*Return if a user is authenticated or not*/

export function fetchUser(){
  return new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/user')
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  }) 
}

export function userExists(){
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8080/user/authenticated')
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  })
}
