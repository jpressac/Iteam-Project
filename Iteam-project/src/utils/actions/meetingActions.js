/**
 * Created by Usuario on 05/02/2017.
 */

import axios from 'axios'
import {MEETING} from '../../constants/HostConfiguration'

export function updateMeetingsViewed(user, meetingsViewed) {
  return axios({
    url: MEETING.MEETING_VIEWED,
    method: 'post',
    params: {username: user},
    data: {meetingsViewed}
  })
}


export function meetingsNotViewed(user){
  return axios.get(MEETING.MEETING_NOT_VIEWED,{
    params:{username:user}
  }).then((response)=>{
    
  })
}
