// Node Modules imports
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { ERROR_SOLICITUD } from '../config/Messages';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setQueryResults } from '../redux/actions/QueryResultActions';

const useQueryApi = () => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState();
    const [query, setQuery] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getQuery = async () => {
            if(url) {
                setIsLoading(true);
                try {
                    const res = await API.get(url, { 
                        headers: API_TOKEN.headers,
                        params: {q: query},
                    });
                    dispatch(setQueryResults(res.data));
                }catch(err) {
                    dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
                }
                setIsLoading(false);
            }
        }
        getQuery();
    }, [dispatch, query, url]);
    return [{isLoading}, {setQuery, setUrl}];
};

export default useQueryApi;