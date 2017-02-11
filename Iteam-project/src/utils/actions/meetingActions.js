import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'

export function updateMeetingsViewed(meetingsViewed) {
  return axios({
    url: MEETING.MEETING_VIEWED,
    method: 'post',
    data: {meetingsViewed}
  })
}

export function meetingsNotViewed(){
  return axios.get(MEETING.MEETING_NOT_VIEWED)
}
