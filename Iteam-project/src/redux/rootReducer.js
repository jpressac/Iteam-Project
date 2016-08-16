import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import loginUser from './reducers/Login/LoginUser';

export default combineReducers({
  router,
  loginUser
})
