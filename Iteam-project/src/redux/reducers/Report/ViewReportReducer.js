import {createAction} from 'redux-actions';

export const VIEW_REPORTS = 'VIEW_REPORTS';

export default function viewReportReducer(state = false, action) {
  switch (action.type) {
    case VIEW_REPORTS:
      return action.payload;
    default:
      return state;
  }
}

export const saveMeetingIdViewReports = createAction('VIEW_REPORTS', (meetingId) => (meetingId));
