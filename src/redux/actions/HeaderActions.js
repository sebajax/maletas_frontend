import { SET_VALIDATE_MESSAGE } from './types/HeaderTypes';

export const setValidateMessage = (valid = false, message = "", variant = "danger") => {
    return {
        type: SET_VALIDATE_MESSAGE,
        payload: {
            ...{valid, message, variant}
        }
    };
};