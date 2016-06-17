export const ROOT = '/application';
export const ERROR = '/error'
export const SIGNIN = '/application/member'
export const SIGNOUT = '/application/nmember'
export const PATHS = {
  ROOT,
  ERROR,
  COMMON : {
    ROOT : `${SIGNOUT}`,
    HOME: 'nmember/home',
    LOGIN : 'application/nmember/login',
    REGISTER : `${SIGNOUT}/register`,
    ABOUT : `${SIGNOUT}/about`,
    HOWTO :`${SIGNOUT}/howto`,
    CONTACT :`${SIGNOUT}/contact`
  },
  LOGGEDIN: {
    ROOT: `${SIGNIN}`,
    NEWTEAM: `${SIGNIN}/team`,
    PROFILE: `${SIGNIN}/myprofile`,
    MEETING: `${SIGNIN}/meeting`
  }
}
