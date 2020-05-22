import { useState, useEffect } from "react";
import API from '../config/API';
import config from '../config/Config';
import { useDispatch } from 'react-redux';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setQueryResults } from '../redux/actions/QueryResultActions';

const useQueryApi = () => {
    const [url, setUrl] = useState();
    const [query, setQuery] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getQuery = async () => {
            if(url) {
                setIsLoading(true);
                try {
                    const res = await API.get(url, { 
                        headers: config.API_TOKEN.headers,
                        params: {q: query},
                    });
                    dispatch(setQueryResults(res.data));
                }catch(err) {
                    dispatch(setValidateMessage(true, `${err} ${config.ERROR_SOLICITUD}`));
                }
                setIsLoading(false);
            }
        }
        getQuery();
    }, [dispatch, query, url]);
    return [{isLoading}, {setQuery, setUrl}];
};

export default useQueryApi;