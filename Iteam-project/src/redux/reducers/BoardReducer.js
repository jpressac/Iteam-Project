import {createAction} from 'redux-actions';


export const RECEIVE_NOTE = 'RECEIVE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export default function reducer(state=[], action){
  switch (action.type){
    case RECEIVE_NOTE:
    case EDIT_NOTE:
    case DELETE_NOTE:
  }
}

export const addNote = createAction('RECEIVE_NOTE', (content) => ({content }));
export const deleteNote = createAction('DELETE_NOTE');
export const like = createAction('RECEIVE_LIKE', note => ({ note, like: true }));
export const unlike = createAction('RECEIVE_LIKE', note => ({ note, like: false }));
export const editPost = createAction('EDIT_NOTE', (note, content) => ({ note, content }));
