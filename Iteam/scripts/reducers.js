import * as c from './constants';
import assign from 'lodash.assing';
import {
    LOGIN,
    FORM_UPDATE_VALUE,
    FORM_RESET
} from './actions';

export default rootReducer;

const initialState = {
    formState:{
        username: '',
        password: ''
    }
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return assign({}, state, {
                formState: {
                      username: action.payload.username,
                      password: action.payload.password
                    }});
                case FORM_UPDATE_VALUE:
                    return handleFieldChangeReducer(state,action);

                default:
                    return state;
            }

    }

    function handleFieldChangeReducer(state,action){
      var field = action.payload.fieldName;
      var val = action.payload.value;
      return Object.assign({}, state, { formState: state.formState.map(fieldX => {
      if(field = fieldX.username){
        return assign({}, field, {value: val});
      }
      if(field = fieldX.password)
      return field;

    }
