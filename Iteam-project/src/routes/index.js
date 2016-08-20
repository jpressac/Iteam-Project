import React from 'react'
import { Route, IndexRoute } from 'react-router'
import NotLoggedIn from '../layouts/NotLoggedIn/'
import HomeView from '../views/HomeView/'
import RegistrationView from '../views/RegistrationView/'
import LoginView from '../views/LoginView/'
import AboutView from '../views/AboutView'
import ContactView from '../views/ContactView/'
import { PATHS } from '../constants/routes'
import LoggedInLayout from '../layouts/LoggedInLayout'
import TeamCreationView from '../views/TeamCreationView'
import MeetingView from '../views/MeetingView'
import BoardView from '../views/BoardView/BoardView'
import ProfileView from '../views/ProfileView/ProfileView'

export const createRoutes = (store) => (

  <Route path = {PATHS.ROOT}>
     <Route path= {PATHS.COMMON.ROOT}  component={NotLoggedIn}>
       <IndexRoute component={HomeView} />
       <Route path={PATHS.COMMON.HOME} component={HomeView} />
       <Route path={PATHS.COMMON.LOGIN} component={LoginView} />
       <Route path={PATHS.COMMON.REGISTER} component={RegistrationView} />
       <Route path={PATHS.COMMON.CONTACT} component={ContactView} />
       <Route path={PATHS.COMMON.ABOUT} component={AboutView} />
     </Route>
     <Route path={PATHS.LOGGEDIN.ROOT} component={LoggedInLayout}>
       <IndexRoute component={HomeView} />
       <Route path={PATHS.LOGGEDIN.NEWTEAM} component={TeamCreationView} />
       <Route path={PATHS.LOGGEDIN.HOME} component={HomeView} />
       <Route path={PATHS.LOGGEDIN.MEETING} component={MeetingView} />
       <Route path={PATHS.LOGGEDIN.BOARD} component={BoardView} />
       <Route path={PATHS.LOGGEDIN.PROFILE} component={ProfileView} />
     </Route>
   </Route>
   );

export default createRoutes
