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
  TEAM_SELECT : URL + '/team/select',
  TEAM_USER_BY_MEETING : URL + '/team/users/bymeeting',
  TEAM_NAME_EXISTENT: URL + '/team/name/existent'
};

export const MEETING = {
  MEETING_CREATE : URL + '/meeting/create',
  MEETING_IDEAS_SAVE : URL + '/meeting/ideas/save',
  MEETING_UPDATE : URL + '/meeting/update',
  MEETING_BY_USER : URL + '/meeting/meetingbyuser',
  MEETING_INFO : URL + '/meeting/meetinginfo',
  MEETING_INFO_PERSONAL_BOARD : URL + '/meeting/meetinginfo/byuser',
  MEETING_USERS : URL + '/meeting/meetingusers',
  MEETING_USER_CONNECTION : URL + '/meeting/usersconnection',
  MEETING_BYSTATE : URL + '/meeting/bystate'
};

export const REPORT = {
  SHARED_REPORT: URL + '/report/shared',
  GENERATE_SHARED_REPORT: URL + '/report/generatesharedtoken',
  MEETING_REPORT : URL + '/report/byranking',
  MEETING_REPORT_BY_USER : URL + '/report/byuser',
  MEETING_REPORT_BY_TAG : URL + '/report/bytag',
}

export const UTILITIES = {
  PROFESSIONS : URL + '/utilities/professions',
  NATIONALITIES : URL + '/utilities/nationality/get'
};
