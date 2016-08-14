import {createAction} from 'redux-actions';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export default function loginReducer(state = {user:null}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        ...
          state,
          user: null
      }
    default:
      return state;
  }
}

export const loginUser = createAction('LOGIN_USER', (user) => ({user}));
export const logoutUser = createAction('LOGOUT_USER');

