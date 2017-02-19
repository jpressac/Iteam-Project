import {createAction} from 'redux-actions'

export const SAVE_MIX_MEETING = 'SAVE_MIX_MEETING';

export default function mixMeetingReducer(state = null, action) {
  switch (action.type) {
    case SAVE_MIX_MEETING:
      return action.payload;
    default:
      return state;
  }
}

export const saveMixMeeting = createAction('SAVE_MIX_MEETING', (meetingIds) => (meetingIds));
