export const FORM_UPDATE_VALUE = 'FORM_UPDATE_VALUE';
export const FORM_RESET = 'FORM_RESET';
export const LOGIN = 'LOGIN';

export function updateField(fieldName, value) {
    return {
        type: FORM_UPDATE_VALUE,
        payload: {
            fieldName,
            value
        }
    };
}

export function reset() {
    return {
        type: FORM_RESET
      };

    export function login(username, password) {
        return {
            type: LOGIN,
            payload: {
                username,
                password
              }
        };
    }
