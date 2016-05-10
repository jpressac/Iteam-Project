import * as c from './constants';
import assing from 'lodash.assing';

const initialState = {
    FormStatus: FormStatus.FORM_EMPTY,
    values: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case c.FORM_UPDATE_VALUE:
            return assign({}, state, {
                FormStatus : assign({}, state.FormStatus, {
                  FormStatus.FORM_EMPTY),
                values: assign({}, state.values, {
                    [action.name]: action.value
                })
            });
        case c.FORM_RESET:
            return initialState;

        default:
            return state;
    }

}
