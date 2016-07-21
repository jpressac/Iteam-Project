import axios from 'axios'


/*Return if a user is authenticated or not*/

export function getUserData(){
  return new Promise((resolve, reject) => {
    //TODO: usar parametros para la http request
      axios.get('http://localhost:8080/meeting/ideas/save')
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  })
}
