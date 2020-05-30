// Node Modules imports
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Config
import { URL_API } from '../config/ConfigApi';
import { SERVER_ERR_COM } from '../config/Messages';
import API from '../config/API';
import modules from '../config/Modules';
//import { TOKEN } from '../config/ConfigToken';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';

// COMPONENT-LAYOUT imports
import NotFound from '../layout/NotFound';

// CSS
import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Router app import
import AppLogin from './AppLogin';
import AppMenuPrincipal from './AppMenuPrincipal';
import AppSimulacion from './AppSimulacion';
import AppAdmin from './AppAdmin';

const App = () => {

    const dispatch = useDispatch();

/*
    const isAuth = () => {
        if(sessionStorage.getItem("auth") && TOKEN)
            return true;
        else   
            return false;
    };
*/

    useEffect(() => {
        const checkApi = async () => { 
            try {
                const res = await API.get(URL_API);
                if(res.status === 200)
                    dispatch(setValidateMessage(false, ``, 'success'));
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} ${SERVER_ERR_COM}`));
            };      
        };
        checkApi();
    }, [dispatch]);

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <AppLogin />
                </Route>
                <Route path={`/${modules.HOME}`}>
                    <AppMenuPrincipal />
                </Route>
                <Route path={`/${modules.SIMULACION}`}>
                    <AppSimulacion />
                </Route>
                <Route path={`/${modules.ADMIN}`}>
                    <AppAdmin />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>                
            </Switch>
        </BrowserRouter>
    );
};

export default App;