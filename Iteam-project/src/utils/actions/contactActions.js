import axios from 'axios'
import {SLACK} from '../../constants/HostConfiguration'

export function postContactMessage(title, subject, message, channelName, remark=true){
  return axios.get(SLACK.SLACK_MESSAGE, {
    params:{
      channelName: channelName,
      message: message,
      title: title,
      description: subject,
      remark: remark
    }
  })
}
