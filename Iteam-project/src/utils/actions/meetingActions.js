import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'

export function updateMeetingsViewed(meetingsViewed) {
  return axios.post(MEETING.MEETING_VIEWED,
    meetingsViewed
  )
}

export function meetingsNotViewed() {
  return axios.get(MEETING.MEETING_NOT_VIEWED)
}

export function createMeeting(meeting) {
  return axios.post(MEETING.MEETING_CREATE,
    meeting)
}

export function getProgrammedMeetings(offset, itemsPerPage) {
  return axios.get(MEETING.MEETING_PROGRAMMED, {
    params: {
      offset: offset,
      limit: itemsPerPage
    }
  })
}

export function getSearchProgrammed(searchField, offset, itemsPerPage) {
  return axios.get(MEETING.MEETING_SEARCH_PROGRAMMED, {
    params: {
      token: searchField,
      offset: offset,
      limit: itemsPerPage
    }
  })
}
