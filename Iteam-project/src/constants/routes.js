export const ROOT = '/'
export const ROOT_APPLICATION = '/application';
export const ERROR = ROOT_APPLICATION + '/error';

export const PATHS = {
  ROOT,
  ROOT_APPLICATION,
  ERROR,
  COMMON: {
    ROOT: 'nmember',
    HOME: 'home',
    LOGIN: 'login',
    REGISTER: 'register',
    ABOUT: 'about',
    HOWTO: 'howto',
    CONTACT: 'contact',
    ERROR: 'error'
  },
  LOGGEDIN: {
    ROOT: 'member',
    HOME: 'home',
    NEWTEAM: 'team',
    PROFILE: 'myprofile',
    MEETING: 'meeting',
    MYMEETINGS: 'mymeeting',
    MEETCONFIG: 'meetingconfig',
    TEAMLIST: 'myteams',
    REPORTS: 'reports',
REPORTSPAGE: 'reportspage',
    CHAT: 'chat',
    HISTORY: 'history',
  },
  PERSONALBOARD: {
    ROOT: 'member/pboard',
    PERSONAL: 'personal'
  },
  SHAREDBOARD: {
    ROOT: 'member/sboard',
    SHARED_REPORT: 'shared'
  },
  REPORT_NOT_LOGGEDIN: {
    ROOT: 'report',
    SHARED_REPORT: 'report/shared'
  },
  MENUNOTLOGGEDIN: {
    HOME: 'application/nmember/home',
    LOGIN: 'application/nmember/login',
    REGISTER: 'application/nmember/register',
    ABOUT: 'application/nmember/about',
    HOWTO: 'application/nmember/howto',
    CONTACT: 'application/nmember/contact'
  },
  MENULOGGEDIN: {
    HOME: 'application/member/home',
    NEWTEAM: 'application/member/team',
    PROFILE: 'application/member/myprofile',
    MEETING: 'application/member/meeting',
    BOARD: 'application/member/personalboard',
    MYMEETINGS: 'application/member/mymeeting',
    MEETCONFIG: 'application/member/meetingconfig',
    TEAMLIST: 'application/member/myteams',
    REPORTS: 'application/member/reports',
REPORTSPAGE: 'application/member/reportspage',
    PERSONALBOARD: 'application/member/pboard/personal',
    SHAREDBOARD: 'application/member/sboard/shared',
    CHAT: 'application/member/chat',
    HISTORY: 'application/member/history'
  },
  SHARED_REPORT: {
    REPORT_NOT_LOGGEDIN: 'application/nmember/report',
    REPORT_LOGGEDIN: 'application/member/report',
    SHARED: 'application/report/shared'
  }
};
