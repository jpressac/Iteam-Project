import axios from 'axios'
import {REPORT} from '../../constants/HostConfiguration'

export function generateSharedReport(meetingList) {

  return axios.get(REPORT.GENERATE_SHARED_REPORT, {
    params: {
      meetingIds: meetingList.toString()
    }
  })
}


export function getSharedReport(token){
  axios.get(REPORT.SHARED_REPORT, {
    params: {
      token: token
    }
  })
}
