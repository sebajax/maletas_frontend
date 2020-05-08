import { combineReducers } from 'redux';

import MontoTotalSimuladoReducer from './MontoTotalSimuladoReducer';
import HeaderReducer from './HeaderReducer';
import ThemeReducer from './ThemeReducer';

const rootReducer = combineReducers({ 
    MontoTotalSimuladoReducer,
    HeaderReducer,
    ThemeReducer
});

export default rootReducer;