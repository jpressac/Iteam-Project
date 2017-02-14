import {createAction} from 'redux-actions';


export const TOKEN_REPORT = 'TOKEN_REPORT';

export default function tokenReducer(state = null, action) {
  switch (action.type) {
    case TOKEN_REPORT:
      return action.payload;
    default:
      return state;
  }
}

export const saveTokenSharedReport = createAction('TOKEN_REPORT', (token) => (token));
