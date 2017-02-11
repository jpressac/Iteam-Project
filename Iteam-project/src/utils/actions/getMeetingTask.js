import {meetingsNotViewed} from './meetingActions'

function meetingsNotViewedByUser() {
  console.debug('task scheduler entra');
  meetingsNotViewed('hola').then((response)=> {
    this.setState({
      meetingsNotViewed: response.data,
      count: response.data.length
    })
  })
}

export default new TaskSchedulerCreator(6000, meetingsNotViewedByUser());
