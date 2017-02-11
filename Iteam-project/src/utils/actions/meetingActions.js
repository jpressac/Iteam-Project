import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'

export function updateMeetingsViewed(meetingsViewed) {
  return 'hello world'
}


export function meetingsNotViewed(){
  return axios.get(MEETING.MEETING_NOT_VIEWED)
}
