import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'


export function getMeetingsToGenerateReport(tokenTopic) {
  return axios.get(MEETING.REPORT_BY_MEETING, {
  params: {
    tokenTopic: tokenTopic
  }
})
}
