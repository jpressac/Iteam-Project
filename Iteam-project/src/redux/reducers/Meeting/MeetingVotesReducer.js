import {createAction} from 'redux-actions';

export const SAVE_MEETING_VOTES = 'SAVE_MEETING_VOTES';

export default function meetingsVotesReducer(state = null, action) {
  switch (action.type) {
    case SAVE_MEETING_VOTES:
      return action.payload;
    default:
      return state;
  }
}

export const meetingsVotes = createAction(SAVE_MEETING_VOTES, (votes) => (votes));
