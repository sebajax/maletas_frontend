import { combineReducers } from 'redux';

import MontoTotalSimuladoReducer from './MontoTotalSimuladoReducer';
import HeaderReducer from './HeaderReducer';

const rootReducer = combineReducers({ 
    MontoTotalSimuladoReducer,
    HeaderReducer
});

export default rootReducer;