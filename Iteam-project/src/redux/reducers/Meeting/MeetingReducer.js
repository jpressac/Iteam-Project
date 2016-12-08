import {createAction} from 'redux-actions';
import {PATHS} from '../../../constants/routes'
import {push} from 'react-router-redux';

export const UPDATE_MEETING_ID = 'UPDATE_MEETING_ID';
export const SAVE_MEETING = 'SAVE_MEETING';
export const IS_USER_CONNECTED = 'IS_USER_CONNECTED';

export const updateMeetingId = (meetingId) => {
  return function(dispatch) {
    dispatch(updateMeeting(meetingId));
    dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTS))
  }
};

export function saveMeeting (meeting){
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
    case IS_USER_CONNECTED:
          return action.payload;
    default:
      return state;
  }
}

export const saveMeetingInfo = createAction('SAVE_MEETING', (meeting) => ({meeting}));
export const updateMeeting = createAction('UPDATE_MEETING_ID', (meetingId) => ({meetingId}));
export const isUserConnected = createAction('IS_USER_CONNECTED', (connected) => ({connected}));
