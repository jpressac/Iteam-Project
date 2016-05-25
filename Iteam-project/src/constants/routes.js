export const ROOT = '/';
export const ERROR = '/error'
export const PATHS = {
  ROOT,
  ERROR,
  COMMON : {
    ROOT : ROOT,
    LOGIN : `${ROOT}user/authenticated`,
    REGISTER : `${ROOT}register`,
    ABOUT : `${ROOT}about`,
    HOWTO : `${ROOT}howto`
  }
}
