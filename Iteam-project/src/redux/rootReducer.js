import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import loginUser from './reducers/Login/LoginUser';
import meetingReducer from './reducers/Meeting/MeetingReducer'
import meetingForTeamReducer from './reducers/Meeting/MeetingForTeamReducer'
import meetingUser from './reducers/Meeting/MeetingUserConnected'
import meetingConfigurationReducer from './reducers/Meeting/MeetingConfigReducer'
import meetingChatMessagesReducer from './reducers/Meeting/MeetingChatMessagesReducer'
import tokenReducer from './reducers/Report/TokenReducer'
import reportReducer from './reducers/Report/ReportsReducer'
import meetingsNotViewed from './reducers/Meeting/MeetingNotViewedReducer'
import mixMeetingReducer from './reducers/Report/ReportByMeetingReducer'
import meetingsVotesReducer from './reducers/Meeting/MeetingVotesReducer'


export default combineReducers({
  router,
  loginUser,
  meetingReducer,
  meetingForTeamReducer,
  meetingUser,
  meetingConfigurationReducer,
  meetingChatMessagesReducer,
  tokenReducer,
  reportReducer,
  meetingsNotViewed,
  mixMeetingReducer,
  meetingsVotesReducer
})
