import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import loginUser from './reducers/Login/LoginUser';
import meetingReducer from './reducers/Meeting/MeetingReducer'
import meetingForTeamReducer from './reducers/Meeting/MeetingForTeamReducer'
import meetingUser from './reducers/Meeting/MeetingUserConnected'
import meetingConfigurationReducer from './reducers/Meeting/MeetingConfigReducer'
import meetingChatMessagesReducer from './reducers/Meeting/MeetingChatMessagesReducer'
import reportReducer from './reducers/Reports/ReportsReducer'

export default combineReducers({
  router,
  loginUser,
  meetingReducer,
  meetingForTeamReducer,
  meetingUser,
  meetingConfigurationReducer,
  meetingChatMessagesReducer,
 reportReducer
})
