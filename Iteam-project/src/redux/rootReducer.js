import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import boardReducer from './reducers/BoardReducer';

export default combineReducers({
  router,
  boardReducer
})
