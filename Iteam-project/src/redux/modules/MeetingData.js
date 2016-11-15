import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration';

/*Return if a user is authenticated or not*/

export function getMeetingData(){
  return new Promise((resolve, reject) => {
    //TODO: usar parametros para la http request
      axios.get(MEETING.MEETING_BY_USER)
      .then(() => {
        resolve()
      }, () => {
        reject()
      })
  })
}
