import {createAction} from 'redux-actions';
import {push} from 'react-router-redux';
import {PATHS} from '../../../constants/routes';

export const MEETING_NEW_TEAM = 'MEETING_NEW_TEAM';
export const NEW_TEAM_OR_MEETING = 'NEW_TEAM_OR_MEETING';
export const CLEAN_MEETING_INFO = 'CLEAN_MEETING_INFO';

export const meetingToNewTeam = () => {
  return function (dispatch) {
    dispatch(createTeam());
    dispatch(push('/' + PATHS.MENULOGGEDIN.NEWTEAM));
  }
};

export default function meetingForTeamReducer(state = null, action) {
  switch (action.type) {
    case MEETING_NEW_TEAM:
      return true;
    case NEW_TEAM_OR_MEETING:
      return false;
    case CLEAN_MEETING_INFO:
      console.debug('CLEAN_MEETING_INFO');
      state = null;
      return null;
    default:
      return state;
  }
}

export const createTeam = createAction(MEETING_NEW_TEAM);
export const fromMeetingOrTeam = createAction(NEW_TEAM_OR_MEETING);
export const meetingCreated = createAction(CLEAN_MEETING_INFO);
