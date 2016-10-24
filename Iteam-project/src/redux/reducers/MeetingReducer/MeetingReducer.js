/**
 * Created by Randanne on 22/10/2016.
 */
import {createAction} from 'redux-actions';
import {PATHS} from '../../../constants/routes'
import {push} from 'react-router-redux';

export const UPDATE_MEETING_ID = 'UPDATE_MEETING_ID';

export const updateMeetingId = (meetingId) => {
  return function(dispatch) {
    dispatch(updateMeeting(meetingId));
    dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))
  }
};

export default function meetingReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_MEETING_ID:
      return action.payload
    default:
      return state;
  }
}

export const updateMeeting = createAction('UPDATE_MEETING_ID', (meetingId) => ({meetingId}));
