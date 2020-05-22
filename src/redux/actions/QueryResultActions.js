import { SET_QUERY_RESULT } from '../types/QueryResultTypes';

export const setQueryResults = result => ({
    type: SET_QUERY_RESULT,
    payload: result
});