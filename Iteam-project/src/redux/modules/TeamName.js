import axios from 'axios'


/*Return all the names of the teams*/

export function getTeamData(){
  return new Promise((resolve, reject) => {
    //TODO: usar parametros para la http request
      axios.get('http://localhost:8080/team/byowner')
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  })
}
