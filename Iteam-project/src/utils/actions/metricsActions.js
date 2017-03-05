import axios from 'axios'
import {METRICS} from '../../constants/HostConfiguration'

export function getPieInformationMeetingByOwner (timeframe){
  return axios.get(METRICS.PIE_CHART_MEETING_BY_OWNER, {
    params: {
      timeframe: timeframe
    }
  })
}

export function getHistogramInformationIdeasByMeeting(timeframe) {
  return axios.get(METRICS.HISTOGRAM_IDEAS_BY_MEETING, {
    params: {
      timeframe: timeframe
    }
  })
}

export function getPieInformationIdeasByTeam(timeframe){
  return axios.get(METRICS.PIE_CHART_IDEAS_BY_TEAM, {
    params: {
      timeframe: timeframe
    }
  })
}

export function getBestUsers() {
  return axios.get(METRICS.SCORE_BY_USER)
}
