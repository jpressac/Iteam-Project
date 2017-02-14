import TaskSchedulerCreator from '../TaskSchedulerCreator'
import {meetingsNotViewed} from './meetingActions'
import {meetingsNotViewedReducer} from '../../redux/reducers/Meeting/MeetingNotViewedReducer'
import {store} from '../../main'

export const meetingsNotViewedByUser = (done) => {
  meetingsNotViewed().then((response)=> {
    store.dispatch(meetingsNotViewedReducer(response.data));
    done()
  })
};

export default new TaskSchedulerCreator(6000, meetingsNotViewedByUser);
