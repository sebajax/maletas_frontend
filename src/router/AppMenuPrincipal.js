// Node Modules imports
import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

// Config
import config from '../config/Config';
import { TOKEN } from '../config/ConfigToken';

// COMPONENT-LAYOUT imports
import MenuPrincipal from '../layout/MenuPrincipal';
import NotFound from '../layout/NotFound';

const AppMenuPrincipal = () => {
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
                exact path={`${path}/${config.URL_MENU_PRINCIPAL}`}
                render={() => (isAuth()) ?
                    <MenuPrincipal /> : <NotFound />
                }
            >
            </Route>
            <Route path="*">
                <NotFound />
            </Route>                         
        </Switch>       
    );
};

export default AppMenuPrincipal;