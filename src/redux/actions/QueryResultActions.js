import { SET_QUERY_RESULT, CLEAN_QUERY_RESULT } from '../types/QueryResultTypes';

export const setQueryResults = result => ({
    type: SET_QUERY_RESULT,
    payload: result
});

export const cleanQueryResults = () => ({
    type: CLEAN_QUERY_RESULT
});