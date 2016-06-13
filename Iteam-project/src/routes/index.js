
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import NotLoggedIn from '../layouts/NotLoggedIn/'
import HomeView from '../views/HomeView/'
import RegistrationView from '../views/RegistrationView/'
import LoginView from '../views/LoginView/'
import AboutUsView from '../views/AboutUsView'
import CounterRoute from './Counter'
import ContactView from '../views/ContactView/'
import { PATHS } from '../constants/routes'

export const createRoutes = (store, flag) => (

  if(flag){
    <Route path = {PATHS.ROOT} component={NotLoggedIn}>
      <IndexRoute component={HomeView}></IndexRoute>
      <Route path={PATHS.COMMON.HOME} component={HomeView}></Route>
      <Route path={PATHS.COMMON.LOGIN} component={LoginView}></Route>
      <Route path={PATHS.COMMON.REGISTER} component={RegistrationView}></Route>
      <Route path={PATHS.COMMON.ABOUT} component={AboutUsView}></Route>
      <Route path={PATHS.COMMON.CONTACT} component={ContactView}></Route>
    </Route>
  }else{
    <Route path = {PATHS.ROOT} component={NotLoggedIn}>
      <IndexRoute component={LoginView}></IndexRoute>
      <Route path={PATHS.COMMON.HOME} component={LoginView}></Route>
      <Route path={PATHS.COMMON.LOGIN} component={LoginView}></Route>
      <Route path={PATHS.COMMON.REGISTER} component={RegistrationView}></Route>
      <Route path={PATHS.COMMON.ABOUT} component={AboutUsView}></Route>
      <Route path={PATHS.COMMON.CONTACT} component={ContactView}></Route>
    </Route>
  }



)

/*path: '/',
component: CoreLayout,
indexRoute: ContactView,
childRoutes: [
  CounterRoute(store)
]
*/



/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
