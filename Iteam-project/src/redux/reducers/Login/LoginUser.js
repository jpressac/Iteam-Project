import {createAction} from 'redux-actions';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export default function loginUser(state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}

export const user = createAction('LOGIN_USER', (user) => ({user}));
export const logoutUser = createAction('LOGOUT_USER');

