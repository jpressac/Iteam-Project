import {createAction} from 'redux-actions';


export const SAVE_NATIONALITY = 'SAVE_NATIONALITY';

export default function nationalityReducer(state = '', action) {
  switch (action.type) {
    case SAVE_NATIONALITY:
      return action.payload;
    default:
      return state;
  }
}

export const saveNationality = createAction('SAVE_NATIONALITY', (nationality) => (nationality));
