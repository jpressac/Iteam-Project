import {createAction} from 'redux-actions';

export const SAVE_MY_MEETING_INFO = 'SAVE_MY_MEETING_INFO';

export default function myMeetingReducer(state = null, action) {

  switch (action.type) {
    case SAVE_MY_MEETING_INFO:
      return action.payload;
      return null;
    default:
      return state;
  }
}

export const saveMyMeetingInfo = createAction(SAVE_MY_MEETING_INFO, (meeting) => (meeting));
