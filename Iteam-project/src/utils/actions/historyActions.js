import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'



export function getMeetingPaginated(offset, itemsPerPage) {
  return axios.get(MEETING.MEETING_PAGINATED,{
    params: {
      offset: offset,
      limit: itemsPerPage
    }
  })
}

export function getMeetingByToken(searchField, offset, itemsPerPage) {
  return axios.get(MEETING.MEETING_SEARCH_HISTORY, {
    params: {
      token: searchField,
      offset: offset,
      limit: itemsPerPage
    }
  })
}
