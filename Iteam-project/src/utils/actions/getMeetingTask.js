import TaskSchedulerCreator from '../TaskSchedulerCreator'
import {meetingsNotViewed} from './meetingActions'

export const meetingsNotViewedByUser = (done) => {
  console.debug('task scheduler entra');

  meetingsNotViewed().then((response)=> {
    //TODO: esto es un reducer
  console.debug('BELU GENIA');
    done()
    //this.setState({
      //meetingsNotViewed: response.data,
      //count: response.data.length
    //})
  })
}

export default new TaskSchedulerCreator(6000, meetingsNotViewedByUser);
