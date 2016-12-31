import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import loginUser from './reducers/Login/LoginUser';
import meetingReducer from './reducers/Meeting/MeetingReducer'
import meetingForTeamReducer from './reducers/Meeting/MeetingForTeamReducer'
import meetingUser from './reducers/Meeting/MeetingUserConnected'
import meetingConfigurationReducer from './reducers/Meeting/MeetingConfigReducer'

export default combineReducers({
  router,
  loginUser,
  meetingReducer,
  meetingForTeamReducer,
  meetingUser,
  meetingConfigurationReducer
})
