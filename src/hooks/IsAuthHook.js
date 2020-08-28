// Node Modules imports
import { useState, useEffect } from "react";
import Validate from 'validate.js';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { URL_API_IS_AUTH } from '../config/ConfigApiPermisos';

const useIsAuth = module => {
    const [auth, setAuth] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log("ENTRE A ISAUTH HOOK", module);
        const isAuth = async () => {
            try {
                if(Validate.isDefined(module) && !Validate.isEmpty(module)) {
                    if(sessionStorage.getItem("auth") && localStorage.getItem("jwtToken") && sessionStorage.getItem("permId")) {
                        API_TOKEN.headers.Authorization = `Bearer ${localStorage.getItem("jwtToken")}` //seteo token
                        const resIsAuth = await API.get(`${URL_API_IS_AUTH}${sessionStorage.getItem("permId")}${module}`, API_TOKEN);
                        if(Validate.isDefined(resIsAuth.data)) {
                            setAuth(resIsAuth.data);
                        }
                    }
                }
            }catch(err) {
                setAuth(false);
            }
            setLoaded(true);
        };
        isAuth();
    }, [module]);
    return [{loaded, auth}];
};

export default useIsAuth;