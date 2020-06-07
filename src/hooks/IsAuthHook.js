// Node Modules imports
import { useState, useEffect } from "react";
import Validate from 'validate.js';

// Config
import API from '../config/API';
import { TOKEN, API_TOKEN } from '../config/ConfigToken';
import { URL_API_IS_AUTH } from '../config/ConfigApiPermisos';

const useIsAuth = module => {
    const [auth, setAuth] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log("ENTRE A ISAUTH HOOK", module);
        const isAuth = async () => {
            try {
                console.log(sessionStorage.getItem("auth"));
                console.log(sessionStorage.getItem("permId"));
                console.log(TOKEN);
                if(Validate.isDefined(module) && !Validate.isEmpty(module)) {
                    if(sessionStorage.getItem("auth") && TOKEN && sessionStorage.getItem("permId")) {
                        const resIsAuth = await API.get(`${URL_API_IS_AUTH}${sessionStorage.getItem("permId")}${module}`, API_TOKEN);
                        if(Validate.isDefined(resIsAuth.data)) {
                            console.log(resIsAuth.data);
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