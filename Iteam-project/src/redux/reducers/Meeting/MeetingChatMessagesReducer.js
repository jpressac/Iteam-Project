/**
 * Created by Usuario on 08/01/2017.
 */
import {createAction} from 'redux-actions';


export const SAVE_MEETING_CHATS = 'SAVE_MEETING_CHATS';

export default function meetingChatMessagesReducer(state = null, action) {
  switch (action.type) {
    case SAVE_MEETING_CHATS:
      return action.payload;
    default:
      return state;
  }
}

export const saveMeetingChats = createAction('SAVE_MEETING_CHATS', (messages) => (messages));
