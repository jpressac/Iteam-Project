import {createAction} from 'redux-actions';


export const SAVE_MEETING_CONFIG_FOR_REPORT = 'SAVE_MEETING_CONFIG_FOR_REPORT';

export default function reportConfigurationReducer(state = null, action) {
  switch (action.type) {
    case SAVE_MEETING_CONFIG_FOR_REPORT:
      return action.payload;
    default:
      return state;
  }
}

export const saveMeetingInfoForReports = createAction('SAVE_MEETING_CONFIG_FOR_REPORT', (meeting) => (meeting));
