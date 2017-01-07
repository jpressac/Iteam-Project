export const ROOT = '/application';
export const ERROR = '/error';

export const PATHS = {
 ROOT,
 ERROR,
 COMMON : {
   ROOT : 'nmember',
   HOME: 'home',
   LOGIN :'login',
   REGISTER : 'register',
   ABOUT : 'about',
   HOWTO : 'howto',
   CONTACT : 'contact'
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
   CHAT: 'chat'
 },
  PERSONALBOARD:{
    ROOT:'member/pboard',
    PERSONAL: 'personal'
  },
  SHAREDBOARD:{
    ROOT:'member/sboard',
    SHARED:'shared'
  },
 MENUNOTLOGGEDIN: {
   HOME : 'application/nmember/home',
   LOGIN : 'application/nmember/login',
   REGISTER : 'application/nmember/register',
   ABOUT : 'application/nmember/about',
   HOWTO : 'application/nmember/howto',
   CONTACT : 'application/nmember/contact'
 },
 MENULOGGEDIN:{
   HOME : 'application/member/home',
   NEWTEAM : 'application/member/team',
   PROFILE : 'application/member/myprofile',
   MEETING : 'application/member/meeting',
   BOARD : 'application/member/personalboard',
   MYMEETINGS: 'application/member/mymeeting',
   MEETCONFIG: 'application/member/meetingconfig',
   TEAMLIST: 'application/member/myteams',
   REPORTS: 'application/member/reports',
   PERSONALBOARD: 'application/member/pboard/personal',
   SHAREDBOARD: 'application/member/sboard/shared',
   CHAT:'application/member/chat'
 }
};
