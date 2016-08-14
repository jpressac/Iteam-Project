import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import loginReducer from './reducers/Login/LoginReducer';

export default combineReducers({
  router,
  loginReducer
})
