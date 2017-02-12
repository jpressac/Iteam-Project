import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'

export function updateMeetingsViewed(meetingsViewed) {
  console.debug(meetingsViewed);
  return axios.post(MEETING.MEETING_VIEWED,
    meetingsViewed
  )
}

export function meetingsNotViewed() {
  return axios.get(MEETING.MEETING_NOT_VIEWED)
}
