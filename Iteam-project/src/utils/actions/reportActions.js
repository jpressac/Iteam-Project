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

export function getSharedReport(token) {
  return axios.get(REPORT.SHARED_REPORT, {
    params: {
      token: token
    }
  })
}

export function getMeetingsToGenerateReport(tokenTopic) {
  return axios.get(MEETING.MEETING_SEARCH_HISTORY, {
    params: {
      token: tokenTopic,
      offset: 0,
      limit: 9989
    }
  })
}

export function getReportByTag(meetingId, tags){
  return axios.get(REPORT.MEETING_REPORT_BY_TAG, {
    params: {
      meetingId: meetingId,
      tags: tags
    }
  })
}

export function getReportByRanking(meetingId, tags){
  return axios.get(REPORT.MEETING_REPORT, {
    params: {
      meetingId: meetingId,
      tags: tags
    }
  })
}

export function getReportByUser(meetingId, tags){
  return axios.get(REPORT.MEETING_REPORT_BY_USER, {
    params: {
      meetingId: meetingId,
      tags: tags
    }
  })
}

export function getReportByMixMeetings(meetingIds, reportName){
  return axios.get(REPORT.REPORT_BY_MEETING, {
    params:{
      meetingIds: meetingIds,
      reportName: reportName
    }
  })
}

export function postReportIntoSlack(meetingIds, meetingTopic, reportName){
  return axios.post(REPORT.POST_SHARED_REPORT_SLACK, {
    params:{
      meetingIds: meetingIds,
      meetingTopic: meetingTopic,
      reportName: reportName
    }
  })
}
