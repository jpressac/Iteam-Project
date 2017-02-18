import {createAction} from 'redux-actions';


export const SAVE_MEETING_CONFIG = 'SAVE_MEETING_CONFIG';

export default function meetingConfigurationReducer(state = null, action) {
  switch (action.type) {
    case SAVE_MEETING_CONFIG:
      return action.payload;
    default:
      return state;
  }
}

export const saveMeetingConfig = createAction('SAVE_MEETING_CONFIG', (meeting) => (meeting));
