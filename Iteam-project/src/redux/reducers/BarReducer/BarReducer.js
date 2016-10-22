/**
 * Created by Randanne on 22/10/2016.
 */
import {createAction} from 'redux-actions';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const CLOSE_DRAWER = 'CLOSE_DRAWER';

export default function reducer(state = {
  drawerOpen: false
}, action) {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false
      };
    default:
      return state;
  }
}

export const openDrawer = createAction(OPEN_DRAWER);
export const closeDrawer = createAction(CLOSE_DRAWER);
