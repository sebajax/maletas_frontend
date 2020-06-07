// Node Modules imports
import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

// Config
import config from '../config/Config';

// COMPONENT-LAYOUT imports
import PrivateRoute from '../components/PrivateRoute';
import MenuPrincipal from '../layout/MenuPrincipal';
import NotFound from '../layout/NotFound';

const AppMenuPrincipal = () => {
    const { path } = useRouteMatch();
    
    return(
        <Switch>
            <PrivateRoute 
                path={`${path}/${config.URL_MENU_PRINCIPAL}`} 
                component={MenuPrincipal} 
                module={path.toUpperCase()} 
            />
            <Route path="*"> 
                <NotFound /> 
            </Route>
        </Switch>       
    );
};

export default AppMenuPrincipal;