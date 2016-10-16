import {createAction} from 'redux-actions';
import {push} from 'react-router-redux';
import {PATHS} from '../../../constants/routes';

export const MEETING_NEW_TEAM = 'MEETING_NEW_TEAM';
export const NEW_TEAM = 'NEW_TEAM';

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
    case NEW_TEAM:
      return false;
    default:
      return state;
  }
}

export const createTeam = createAction('MEETING_NEW_TEAM');
