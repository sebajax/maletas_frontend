// Node Modules imports
import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

// Config
import config from '../config/Config';
import { TOKEN } from '../config/ConfigToken';

// COMPONENT-LAYOUT imports
import IngresoSimulado from '../layout/IngresoSimulado';
import GastoSimulado from '../layout/GastoSimulado';
import NotFound from '../layout/NotFound';

const AppSimulacion = () => {
    const { path } = useRouteMatch();

    const isAuth = () => {
        if(sessionStorage.getItem("auth") && TOKEN)
            return true;
        else   
            return false;
    };

    return(
        <Switch>
            <Route 
                exact path={`${path}/${config.URL_INGRESO_SIMULADO}`}
                render={() => (isAuth()) ?
                    <IngresoSimulado /> : <NotFound />}
            >   
            </Route>
            <Route 
                exact path={`${path}/${config.URL_GASTO_SIMULADO}`}
                render={() => (isAuth()) ?
                    <GastoSimulado /> : <NotFound />}
            >   
            </Route>
            <Route path="*">
                <NotFound />
            </Route>                 
        </Switch>
    );
};

export default AppSimulacion;