import { SET_QUERY_RESULT } from '../types/QueryResultTypes';

const QueryResultReducer = (state = null, action) => {
    switch(action.type) {
        case SET_QUERY_RESULT:
            return state = action.payload;
        default:
            return state;
    };
};

export default QueryResultReducer;