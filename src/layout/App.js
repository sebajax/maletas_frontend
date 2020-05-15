/*
* Node Modules imports
*/
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import API from '../config/API';
import config from '../config/Config';
import Cookies from 'universal-cookie';

/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';

/*
* COMPONENT-LAYOUT imports
*/
import Login from './Login';
import MenuPrincipal from './MenuPrincipal';
import IngresoSimulado from './IngresoSimulado';
import GastoSimulado from './GastoSimulado';
import NotFound from './NotFound';

const App = () => {

    const cookies = new Cookies();
    const dispatch = useDispatch();

    const isAuth = () => {
        if(sessionStorage.getItem("auth") && cookies.get('jwtToken'))
            return true;
        else   
            return false;
    };

    useEffect(() => {
        API.get(config.URL_API)
        .then(res => {
            if(res.status === 200)
                dispatch(setValidateMessage(false, ``, 'success'));
        })
        .catch(err => {
            dispatch(setValidateMessage(true, `${err} (No es posible conectarse al servidor)`));
        });        
    }, [dispatch]);    

    return(
        <BrowserRouter>   
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>            
                <Route 
                    exact path={config.URL_MENU_PRINCIPAL}
                    render={() => (isAuth()) ?
                        <MenuPrincipal /> : <NotFound />}
                >
                </Route>
               <Route 
                    exact path={config.URL_INGRESO_SIMULADO}
                    render={() => (isAuth()) ?
                        <IngresoSimulado /> : <NotFound />}
                >   
                </Route>
                <Route 
                    exact path={config.URL_GASTO_SIMULADO}
                    render={() => (isAuth()) ?
                        <GastoSimulado /> : <NotFound />}
                >   
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>                 
            </Switch>
        </BrowserRouter>
    );
};

export default App;