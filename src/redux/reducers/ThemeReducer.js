import { SET_THEME } from '../types/ThemeTypes';

const blackTheme = {
    theme: false,
    style: {
        bg: "dark",
        variant: "dark",
        text: "text-primary",
        btnSuccess: "outline-primary",
        btnCancel: "outline-danger",
        breadCrumb: "text-primary"
    }
};

const blueTheme = {
    theme: true,
    style: {
        bg: "primary",
        variant: "dark",
        text: "text-white",
        btnSuccess: "primary",
        btnCancel: "danger",
        breadCrumb: "text-primary"
    }
};

const themeSelector = state => {
    switch(state.theme) {
        case false: 
            return blueTheme;
        case true:
            return blackTheme;
        default:
    };
};

const ThemeReducer = (state = blackTheme, action) => {
    switch(action.type) {
        case SET_THEME: 
            state = themeSelector(state);
            return state;
        
        default: 
            return state;
    };
};

export default ThemeReducer;