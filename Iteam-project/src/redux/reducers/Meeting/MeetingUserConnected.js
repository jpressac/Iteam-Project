/**
 * Created by Randanne on 08/12/2016.
 */
import {createAction} from 'redux-actions';

export const IS_USER_CONNECTED = 'IS_USER_CONNECTED';


export function userConnection (connected) {
  return function (dispatch) {
    dispatch(isUserConnected(connected));
  }
}

export default function meetingUser(state = false, action) {
  switch (action.type) {
    case IS_USER_CONNECTED:
      return action.payload;
    default:
      return false;
  }
}

export const isUserConnected = createAction('IS_USER_CONNECTED', (connected) => ({connected}));
