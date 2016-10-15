import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import loginUser from './reducers/Login/LoginUser';
import meetingReducer from './reducers/Meeting/MeetingReducer'

export default combineReducers({
  router,
  loginUser,
  meetingReducer
})
