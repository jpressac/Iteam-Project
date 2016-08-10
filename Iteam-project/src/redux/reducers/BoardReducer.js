import {createAction} from 'redux-actions';
import findIndex from 'lodash/findIndex';

export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export default function  boardReducer(state=[], action){
  switch (action.type){
    case RECEIVE_NOTE:
          return [
            ...state,
            action.payload
          ];
    case EDIT_NOTE:
          const index = findIndex(state, p => p.id ===action.payload.post.id);
          return index > -1 ? [
            ...state.slice(0,index)
          ]: state;

    case DELETE_NOTE:
      return state.filter(p => p.id !== action.payload.id);
  }
}

export const addNote = createAction('RECEIVE_NOTE', (content) => ({content}));
export const deleteNote = createAction('DELETE_NOTE');
export const like = createAction('RECEIVE_LIKE', note => ({ note, like: true }));
export const unlike = createAction('RECEIVE_LIKE', note => ({ note, like: false }));
export const editPost = createAction('EDIT_NOTE', (note, content) => ({ note, content }));
