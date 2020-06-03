import { combineReducers } from 'redux';

import MontoTotalSimuladoReducer from './MontoTotalSimuladoReducer';
import HeaderReducer from './HeaderReducer';
import ThemeReducer from './ThemeReducer';
import QueryResultReducer from './QueryResultReducer';
import PermisosReducer from './PermisosReducer';
import AuthModulesReducer from './AuthModulesReducer';

const appReducer = combineReducers({ 
    MontoTotalSimuladoReducer,
    HeaderReducer,
    ThemeReducer,
    QueryResultReducer,
    PermisosReducer,
    AuthModulesReducer
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') 
        state = undefined;
  
    return appReducer(state, action);
};

export default rootReducer;