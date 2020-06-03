import { SET_AUTH_MODULES } from '../types/AuthModulesTypes';

const AuthModulesReducer = (state = null, action) => {
    switch(action.type) {
        case SET_AUTH_MODULES:
            return state = action.payload;
        default:
            return state;
    };
};

export default AuthModulesReducer;