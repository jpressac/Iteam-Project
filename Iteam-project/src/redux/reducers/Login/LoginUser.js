import {createAction} from 'redux-actions';
import axios from 'axios';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const logout = () => {
  debugger
  return function(dispatch) {
    return axios.post('http://localhost:8080/application/member/logout').then(()=> {
      dispatch(logoutUser())
    });
    window.location.reload();
  }

}
export default function loginUser(state = null, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}

export const user = createAction('LOGIN_USER', (user) => ({user}));
export const logoutUser = createAction('LOGOUT_SUCCESS');

