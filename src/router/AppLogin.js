// Node Modules imports
import React from 'react';
import { Route, Switch } from "react-router-dom";

// COMPONENT-LAYOUT imports
import Login from '../layout/Login';
import NotFound from '../layout/NotFound';

const AppLogin = () => {
    return(
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>  
            <Route path="*">
                <NotFound />
            </Route>                         
        </Switch>       
    );
};

export default AppLogin;