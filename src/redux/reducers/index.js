import { combineReducers } from 'redux';

import MontoTotalSimuladoReducer from './MontoTotalSimuladoReducer';
import HeaderReducer from './HeaderReducer';
import ThemeReducer from './ThemeReducer';
import QueryResultReducer from './QueryResultReducer';

const appReducer = combineReducers({ 
    MontoTotalSimuladoReducer,
    HeaderReducer,
    ThemeReducer,
    QueryResultReducer
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') 
        state = undefined;
  
    return appReducer(state, action);
};

export default rootReducer;