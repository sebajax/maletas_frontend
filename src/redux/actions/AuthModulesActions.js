import { SET_AUTH_MODULES } from '../types/AuthModulesTypes';

export const setAuthModules = authModules => {
    return {
        type: SET_AUTH_MODULES,
        payload: authModules
    };
};