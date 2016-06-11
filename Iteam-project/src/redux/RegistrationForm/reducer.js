import {FORM_SUBMIT , FORM_RESET, FORM_UPDATE_VALUE} from '../../constants/RegistrationFormActions/actions.js';

const initialState = {
  values:{}
}

function formReducer(state= initialState, action){
  switch(action.type){
    case FORM_UPDATE_VALUE:
      return assign({}, state, {
        values: assign({}, state.values, {
          [action.name]: action.value
        })
      });
    case FORM_RESET:
      return initialState;

    case FORM_SUBMIT:
        return assign({}, state,{
        values: state.values
      });
    }
}
export default formReducer
