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

/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';

/*
* COMPONENT-LAYOUT imports
*/
import MenuPrincipal from './MenuPrincipal';
import IngresoSimulado from './IngresoSimulado';
import GastoSimulado from './GastoSimulado';
import NotFound from './NotFound';

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        API.get(config.URL_API)
        .then(res => {
            console.log(res);
            if(res.status === 200)
                dispatch(setValidateMessage(false, ``, 'success'));
        })
        .catch(err => {
            console.log(err);
            dispatch(setValidateMessage(true, `${err} (No es posible conectarse al servidor)`));
        });        
    }, [dispatch]);      

    return(
        <BrowserRouter>   
            <Switch>
                <Route exact path="/">
                    <MenuPrincipal />
                </Route>             
                <Route exact path={config.URL_MENU_PRINCIPAL}>
                    <MenuPrincipal />
                </Route>    
                <Route exact path={config.URL_INGRESO_SIMULADO}>
                    <IngresoSimulado />
                </Route> 
                <Route exact path={config.URL_GASTO_SIMULADO}>
                    <GastoSimulado />
                </Route> 
                <Route path="*">
                    <NotFound />
                </Route>                 
            </Switch>
        </BrowserRouter>
    );
};

export default App;