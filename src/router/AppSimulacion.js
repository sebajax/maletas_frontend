// Node Modules imports
import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

// Config
import config from '../config/Config';

// COMPONENT-LAYOUT imports
import PrivateRoute from '../components/PrivateRoute';
import IngresoSimulado from '../layout/IngresoSimulado';
import GastoSimulado from '../layout/GastoSimulado';
import NotFound from '../layout/NotFound';

const AppSimulacion = () => {
    const { path } = useRouteMatch();

    return(
        <Switch>
            <PrivateRoute 
                path={`${path}/${config.URL_INGRESO_SIMULADO}`}
                component={IngresoSimulado} 
                module={path.toUpperCase()} 
            />
            <PrivateRoute 
                path={`${path}/${config.URL_GASTO_SIMULADO}`}
                component={GastoSimulado} 
                module={path.toUpperCase()} 
            />            
            <Route path="*">
                <NotFound />
            </Route>                 
        </Switch>
    );
};

export default AppSimulacion;