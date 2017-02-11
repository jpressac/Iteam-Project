import {createAction} from 'redux-actions';

export const SAVE_MEETING_NOT_VIEWED = 'SAVE_MEETING_NOT_VIEWED';

export default function meetingsNotViewed(state = null, action) {
  switch (action.type) {
    case SAVE_MEETING_NOT_VIEWED:
      return action.payload;
    default:
      return state;
  }
}

export const meetingsNotViewedReducer = createAction(SAVE_MEETING_NOT_VIEWED, (meetings) => (meetings));
