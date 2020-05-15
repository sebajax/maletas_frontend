import { SET_THEME, CHANGE_THEME } from '../types/ThemeTypes';

export const setTheme = appTheme => {
    return {
        type: SET_THEME,
        payload: appTheme
    };
};

export const changeTheme = () => {
    return {
        type: CHANGE_THEME
    };
};