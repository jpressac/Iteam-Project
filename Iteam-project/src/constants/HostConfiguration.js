export const PORT = '8080';
//201.220.156.168
export const HOST = 'localhost';
export const URL = 'http://' + HOST + ':' + PORT;

export const USER = {
  LOGIN_USER : URL + '/user/authenticated',
  GET_USER : URL + '/user',
  POST_USER : URL + '/user',
  UPDATE_USER : URL + '/user/modify',
  DELETE_USER : URL + '/user/delete',
  USER_EXISTS : URL + '/user/exists',
  PASSWORD_VALIDATION: URL + '/validate/password'
};

export const TEAM = {
  TEAM_CREATE : URL + '/team/create',
  TEAM_DELETE : URL + '/team/delete',
  TEAM_BY_OWNER : URL + '/team/byowner',
  TEAM_BY_OWNER_PAGINATED : URL + '/team/byowner/paginated',
  TEAM_SELECT : URL + '/team/select',
  TEAM_USER_BY_MEETING : URL + '/team/users/bymeeting',
  TEAM_NAME_EXISTENT: URL + '/team/name/existent',
  TEAM_BY_OWNER_SEARCH : URL + '/team/byowner/search'
};

export const MEETING = {
  MEETING_CREATE : URL + '/meeting/create',
  MEETING_IDEAS_SAVE : URL + '/meeting/ideas/save',
  MEETING_UPDATE : URL + '/meeting/update',
  MEETING_REPORT : URL + '/meeting/report',
  MEETING_REPORT_BY_USER : URL + '/meeting/report/byuser',
  MEETING_REPORT_BY_TAG : URL + '/meeting/report/bytag',
  MEETING_BY_USER : URL + '/meeting/meetingbyuser',
  MEETING_INFO : URL + '/meeting/meetinginfo',
  MEETING_INFO_PERSONAL_BOARD : URL + '/meeting/meetinginfo/byuser',
  MEETING_USERS : URL + '/meeting/meetingusers',
  MEETING_USER_CONNECTION : URL + '/meeting/usersconnection',
  MEETING_ENDED : URL + '/meeting/ended',
  MEETING_PROGRAMMED: URL + '/meeting/programmed',
  MEETING_MARK_ENDED: URL + '/meeting/markended',
  MEETING_SEARCH_HISTORY: URL + '/meeting/search/history',
  MEETING_SEARCH_PROGRAMMED: URL + '/meeting/search/programmed',
  MEETING_PAGINATED : URL + '/meeting/paginated'
};

export const UTILITIES = {
  PROFESSIONS : URL + '/utilities/professions',
  NATIONALITIES : URL + '/utilities/nationality/get'
};
