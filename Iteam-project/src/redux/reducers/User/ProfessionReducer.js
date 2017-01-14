import {createAction} from 'redux-actions';


export const SAVE_PROFESSION = 'SAVE_PROFESSION';

export default function professionsReducer(state = '', action) {
  switch (action.type) {
    case SAVE_PROFESSION:
      return action.payload;
    default:
      return state;
  }
}

export const saveProfessions = createAction('SAVE_PROFESSION', (profession) => (profession));
