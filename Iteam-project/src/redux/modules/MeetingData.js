import axios from 'axios'


/*Return if a user is authenticated or not*/

export function getMeetingData(){
  return new Promise((resolve, reject) => {
    //TODO: usar parametros para la http request
      axios.get('http://localhost:8080/meeting/meetingbyuser')
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  })
}
