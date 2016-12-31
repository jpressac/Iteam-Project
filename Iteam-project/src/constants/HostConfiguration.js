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
  USER_EXISTS : URL + '/user/exists'
};

export const TEAM = {
  TEAM_CREATE : URL + '/team/create',
  TEAM_DELETE : URL + '/team/delete',
  TEAM_BY_OWNER : URL + '/team/byowner',
  TEAM_SELECT : URL + '/team/userselection',
  TEAM_USER_BY_MEETING : URL + '/team/users/bymeeting'
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
  MEETING_USER_CONNECTION : URL + '/meeting/usersconnection'
};

export const UTILITIES = {
  PROFESSIONS : URL + '/utilities/professions',
  NATIONALITIES : URL + '/utilities/nationality/get'
};
