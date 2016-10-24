/**
 * Created by Randanne on 22/10/2016.
 */
import {createAction} from 'redux-actions';

export const UPDATE_MEETING_ID = 'UPDATE_MEETING_ID';

export default function meetingReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_MEETING_ID:
      return {
        ...state,
      meetingId:action.payload;
    }
    default:
      return state;
  }
}

export const updateMeetingId = createAction('UPDATE_MEETING_ID', (meetingId) => ({meetingId}));
