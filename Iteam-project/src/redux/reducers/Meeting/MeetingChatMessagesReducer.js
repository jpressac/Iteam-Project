import {createAction} from 'redux-actions';


export const SAVE_MEETING_CHATS = 'SAVE_MEETING_CHATS';
export const CLEAN_MEETING_CHAT = 'CLEAN_MEETING_CHAT';

export default function meetingChatMessagesReducer(state = null, action) {
  switch (action.type) {
    case SAVE_MEETING_CHATS:
      return action.payload;
    case CLEAN_MEETING_CHAT:
      state = null;
      return null;
    default:
      return state;
  }
}

export const saveMeetingChats = createAction(SAVE_MEETING_CHATS, (messages) => (messages));
export const cleanMeetingChats = createAction(CLEAN_MEETING_CHAT);
