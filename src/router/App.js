// Node Modules imports
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Config
import { URL_API } from '../config/ConfigApi';
import { SERVER_ERR_COM } from '../config/Messages';
import API from '../config/API';
import modules from '../config/Modules';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';

// COMPONENT-LAYOUT imports
import PrivateRoute from '../components/PrivateRoute';
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
                <PrivateRoute 
                    path={`/${modules.HOME}`} 
                    component={AppMenuPrincipal} 
                    module={`/${modules.HOME.toUpperCase()}`}
                />
                <PrivateRoute
                    path={`/${modules.SIMULACION}`} 
                    component={AppSimulacion} 
                    module={`/${modules.SIMULACION.toUpperCase()}`} 
                />
                <PrivateRoute 
                    path={`/${modules.ADMIN}`} 
                    component={AppAdmin} 
                    module={`/${modules.ADMIN.toUpperCase()}`} 
                />
                <Route path="*">
                    <NotFound />
                </Route>                
            </Switch>
        </BrowserRouter>
    );
};

export default App;