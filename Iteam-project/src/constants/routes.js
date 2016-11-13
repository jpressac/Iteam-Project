export const ROOT = '/application';
export const ERROR = '/error';
export const SIGNIN = '/application/member';
export const SIGNOUT = '/application/nmember';
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
   BOARD: 'personalboard',
   MYMEETINGS: 'mymeeting',
   TEAMLIST: 'myteams',
   REPORTS: 'reports'
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
   TEAMLIST: 'application/member/myteams',
   REPORTS: 'application/member/reports'
 }
};
