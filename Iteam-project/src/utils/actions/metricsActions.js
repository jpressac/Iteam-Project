import axios from 'axios'
import {METRICS} from '../../constants/HostConfiguration'

export function getPieInformationMeetingByOwner (timeframe){
  return axios.get(METRICS.PIE_CHART_MEETING_BY_OWNER, {
    params: {
      timeframe: timeframe
    }
  })
}
