import {createAction} from 'redux-actions';
import {PATHS} from '../../../constants/routes'
import {push} from 'react-router-redux';

export const UPDATE_MEETING_ID = 'UPDATE_MEETING_ID';
export const SAVE_MEETING = 'SAVE_MEETING';

export const meetingToMeetingConfig = (meeting) => {
  return function (dispatch) {
    dispatch(saveMeetingInfo(meeting));
    dispatch(push('/' + PATHS.MENULOGGEDIN.MEETCONFIG));
  }
};

export function saveMeeting(meeting) {
  return function (dispatch) {
    dispatch(saveMeetingInfo(meeting));
  }
}

export default function meetingReducer(state = null, action) {
  switch (action.type) {
    case SAVE_MEETING:
      return action.payload;
    case UPDATE_MEETING_ID:
      return action.payload;
    default:
      return state;
  }
}

export const saveMeetingInfo = createAction('SAVE_MEETING', (meeting) => ({meeting}));
export const updateMeeting = createAction('UPDATE_MEETING_ID', (meetingId) => ({meetingId}));

