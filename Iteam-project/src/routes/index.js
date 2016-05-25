// We only need to import the modules necessary for initial render
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from '../layouts/CoreLayout'
import HomeView from '../views/HomeView'
import RegistrationView from '../views/RegistrationView'
import AboutView from '../views/AboutView'
import CounterRoute from './Counter'
import { PATHS } from '../constants/routes'
//TODO import actions

export const createRoutes = (store) => (
  {
  path: '/',
  component: CoreLayout,
  indexRoute: RegistrationView,
  childRoutes: [
    CounterRoute(store)
  ]
})


  /*
  <Route path = {PATHS.ROOT} >
    <Route path={PATHS.ROOT} component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path={PATHS.ROOT.REGISTER} component={RegistrationView} />
    </Route>
  </Route>
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
