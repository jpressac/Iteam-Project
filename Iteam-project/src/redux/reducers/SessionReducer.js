import {createAction} from 'redux-actions';

export const CREATE_SESSION = 'CREATE_SESSION';
export const JOIN_SESSION = 'JOIN_SESSION';
export const LEAVE_SESSION = 'LEAVE_SESSION';

export default function sessionReducer(state= {
  id: null,
  name: null,
  clients: []
},action){
  switch(action.type){
    case CREATE_SESSION:
    case JOIN_SESSION:
    case LEAVE_SESSION:
  }
}


export const createSession= createAction('CREATE_SESSION', user => ({}));
export const joinSession = createAction('JOIN_SESSION', (user, sessionId) => ({}));
export const leaveSession = createAction('LEAVE_SESSION', (user, sessionId)=>({}));
