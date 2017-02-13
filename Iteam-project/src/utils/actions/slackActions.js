import axios from 'axios'
import {SLACK} from '../../constants/HostConfiguration'

export function createChannel(meetingChannelName){
  return axios.get(SLACK.SLACK_CREATE_CHANNEL, {
    params: {
    meetingId: meetingChannelName
  }})
}
