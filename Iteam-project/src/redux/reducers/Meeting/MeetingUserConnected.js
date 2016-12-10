/**
 * Created by Randanne on 08/12/2016.
 */
import {createAction} from 'redux-actions';
import {PATHS} from "../../../constants/routes";
import {push} from 'react-router-redux';

export const CONNECT_USER = 'CONNECT_USER';
export const DISCONNECT_USER = 'DISCONNECT_USER';


export function userConnection () {
  return function (dispatch) {
    dispatch(userConnected());
  }
}

export function userDisconnection (){
  return function (dispatch) {
    dispatch(disconnectUser());
    dispatch(push('/' + PATHS.MENULOGGEDIN.HOME));
  }
}

export default function meetingUser(state = false, action) {
  switch (action.type) {
    case CONNECT_USER:
      return true;
    case DISCONNECT_USER:
          return false;
    default:
      return state;
  }
}

export const userConnected = createAction('CONNECT_USER');
export const disconnectUser = createAction('DISCONNECT_USER');
