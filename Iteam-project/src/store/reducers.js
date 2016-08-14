import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {registerReducer} from '../redux/RegistrationForm/reducer.js'
import loginReducer from '../redux/reducers/Login/LoginReducer'
import Immutable from 'immutable';
import {reducer as formReducer} from 'redux-form';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    loginReducer,

    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
