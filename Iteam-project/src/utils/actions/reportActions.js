import axios from 'axios'
import {REPORT} from '../../constants/HostConfiguration'
import {MEETING} from '../../constants/HostConfiguration'

export function generateSharedReport(meetingList) {

  return axios.get(REPORT.GENERATE_SHARED_REPORT, {
    params: {
      meetingIds: meetingList.toString()
    }
  })
}

export function getSharedReport(token){
  return axios.get(REPORT.SHARED_REPORT, {
    params: {
      token: token
    }
  })
}

export function getMeetingsToGenerateReport(tokenTopic) {
  return axios.get(MEETING.REPORT_BY_MEETING, {
  params: {
    tokenTopic: tokenTopic
  }
})
}

