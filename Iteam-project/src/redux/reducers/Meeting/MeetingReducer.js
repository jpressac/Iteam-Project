import {createAction} from 'redux-actions';
import {push} from 'react-router-redux';
import {PATHS} from '../../../constants/routes';

export const MEETING_NEW_TEAM = 'MEETING_NEW_TEAM';
export const SAVE_MEETING = 'SAVE_MEETING';
export const NEW_TEAM = 'NEW_TEAM';

export function saveMeeting (meeting){
  return function (dispatch) {
    dispatch(saveMeetingInfo(meeting));
    dispatch(createTeam());
    dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM));
  }
}


export default function meetingReducer(state = null, action) {
  switch (action.type) {
    case MEETING_NEW_TEAM:
      return true;
    case SAVE_MEETING:
          return action.payload;
    case NEW_TEAM:
      return false;
    default:
      return state;
  }
}

export const createTeam = createAction('MEETING_NEW_TEAM');
export const saveMeetingInfo = createAction('SAVE_MEETING', (meeting) => ({meeting}));
