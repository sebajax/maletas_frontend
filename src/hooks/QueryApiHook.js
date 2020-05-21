import { useState, useEffect } from "react";
import API from '../config/API';
import { useDispatch } from 'react-redux';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';

const useQueryApi = () => {
    const [options, setOptions] = useState();
    const [render, setRender] = useState(false);
    const [result, setResult] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("ENTRE A QUERY HOOK");
        const getQuery = async () => {
            if(options) {
                setIsLoading(true);
                try {
                    const res = await API.get(options.url, options.config);
                    setResult(res.data);
                }catch(err) {
                    dispatch(setValidateMessage(true, "Hubo un error al procesar su solicitud"));
                }
                setIsLoading(false);
            }
        }
        getQuery();
    }, [dispatch, options, render]);
    return [{result, isLoading, render}, {setOptions, setRender}];
};

export default useQueryApi;