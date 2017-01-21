// We only need to import the modules necessary for initial render
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import NotLoggedIn from '../layouts/NotLoggedIn/'
import HomeView from '../views/HomeView/'
import RegistrationView from '../views/RegistrationView/'
import AboutView from '../views/AboutView'
import ContactView from '../views/ContactView/'
import {PATHS} from '../constants/routes'
import LoggedInLayout from '../layouts/LoggedInLayout'
import PersonalBoardLayout from '../layouts/PersonalBoardLayout/PersonalBoardLayout'
import SharedBoardLayout from '../layouts/SharedBoardLayout/SharedBoardLayout'
import TeamCreationView from '../views/TeamCreationView'
import MeetingView from '../views/MeetingView'
import PersonalBoardView from '../views/PersonalBoardView/PersonalBoardView'
import ProfileView from '../views/ProfileView/ProfileView'
import SharedBoardView from '../views/SharedBoardView/SharedBoardView'
import MyTeamView from '../views/MyTeamView/MyTeamView'
import MymeetView from '../views/MymeetView/MymeetView'
import MeetingConfigView from '../views/MeetingConfigView'
import ReportsView from '../views/ReportsView/ReportsView'
import HistoryView from '../views/HistoryView/HistoryView'

export const createRoutes = (store) => (

  <Route path={PATHS.ROOT}>
    <Route path={PATHS.COMMON.ROOT} component={NotLoggedIn}>
      <IndexRoute component={HomeView}/>
      <Route path={PATHS.COMMON.HOME} component={HomeView}/>
      <Route path={PATHS.COMMON.REGISTER} component={RegistrationView}/>
      <Route path={PATHS.COMMON.CONTACT} component={ContactView}/>
      <Route path={PATHS.COMMON.ABOUT} component={AboutView}/>
    </Route>
    <Route path={PATHS.LOGGEDIN.ROOT} component={LoggedInLayout}>
      <IndexRoute component={HomeView}/>
      <Route path={PATHS.LOGGEDIN.NEWTEAM} component={TeamCreationView}/>
      <Route path={PATHS.LOGGEDIN.HOME} component={HomeView}/>
      <Route path={PATHS.LOGGEDIN.MEETING} component={MeetingView}/>
      <Route path={PATHS.LOGGEDIN.PERSONALBOARD} component={PersonalBoardView}/>
      <Route path={PATHS.LOGGEDIN.SHAREDBOARD} component={SharedBoardView}/>
      <Route path={PATHS.LOGGEDIN.PROFILE} component={ProfileView}/>
      <Route path={PATHS.LOGGEDIN.MYMEETINGS} component={MymeetView}/>
      <Route path={PATHS.LOGGEDIN.MEETCONFIG} component={MeetingConfigView}/>
      <Route path={PATHS.LOGGEDIN.REPORTS} component={ReportsView}/>
      <Route path={PATHS.LOGGEDIN.TEAMLIST} component={MyTeamView}/>
      <Route path={PATHS.LOGGEDIN.HISTORY} component={HistoryView}/>
    </Route>
    <Route path={PATHS.PERSONALBOARD.ROOT} component={PersonalBoardLayout}>
      <Route path={PATHS.PERSONALBOARD.PERSONAL} component={PersonalBoardView}/>
    </Route>
    <Route path={PATHS.SHAREDBOARD.ROOT} component={SharedBoardLayout}>
      <Route path={PATHS.SHAREDBOARD.SHARED} component={SharedBoardView}/>
    </Route>
  </Route>
);

export default createRoutes
