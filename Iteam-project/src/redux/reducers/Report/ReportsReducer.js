import {createAction} from 'redux-actions';
import {PATHS} from '../../../constants/routes'
import {push} from 'react-router-redux';

export const REPORTS = 'REPORTS';

export const reportsToReportsView = (reportType) => {
  return function (dispatch) {
    dispatch(reports(reportType));
    dispatch(push('/' + PATHS.MENULOGGEDIN.REPORTSPAGE));
  }
};

export default function reportReducer(state = null, action) {
  switch (action.type) {
    case REPORTS:
          return action.payload;
    default:
      return state;
  }
}

export const reports = createAction('REPORTS', (reportType) => (reportType));


