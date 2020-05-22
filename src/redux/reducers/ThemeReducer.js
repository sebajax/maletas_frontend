import { SET_THEME, CHANGE_THEME } from '../types/ThemeTypes';

const blackTheme = {
    theme: false,
    style: {
        bg: "dark",
        variant: "dark",
        text: "text-primary",
        modalTitle: "text-dark",
        btnSuccess: "outline-primary",
        btnCancel: "outline-danger",
        breadCrumb: "text-primary",
        tableHead: "table-dark",
        tableColor: "table-light",
    }
};

const blueTheme = {
    theme: true,
    style: {
        bg: "primary",
        variant: "dark",
        text: "text-white",
        modalTitle: "text-primary",
        btnSuccess: "primary",
        btnCancel: "danger",
        breadCrumb: "text-primary",
        tableHead: "table-primary",
        tableColor: "table-light",
    }
};

const themeSelector = theme => {
    switch(theme) {
        case false: 
            return blackTheme;
        case true:
            return blueTheme;
        default:
    };
};

const ThemeReducer = (state = blackTheme, action) => {
    switch(action.type) {
        case CHANGE_THEME: 
            state = themeSelector(!state.theme);
            return state;        
        case SET_THEME: 
            state = themeSelector(action.payload);
            return state;
        
        default:
            return state;
    };
};

export default ThemeReducer;