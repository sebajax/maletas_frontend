import { SET_QUERY_RESULT, CLEAN_QUERY_RESULT } from '../types/QueryResultTypes';

const QueryResultReducer = (state = null, action) => {
    switch(action.type) {
        case SET_QUERY_RESULT:
            return state = action.payload;
        case CLEAN_QUERY_RESULT:
            return state = null;
        default:
            return state;
    };
};

export default QueryResultReducer;