// Node Modules imports
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// HOOKS imports
import isAuthHook from '../hooks/IsAuthHook';

// COMPONENT-LAYOUT imports
import NotFound from '../layout/NotFound';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [{loaded, auth}] = isAuthHook(rest.module);

    if(!loaded) {
        return null;
    }else {
        return (
            <Switch>
                <Route {...rest} render={(props) => (
                    (auth === true)
                    ? <Component {...props} />
                    : <Redirect to='/' />
                )} />
                <Route path="*"> 
                    <NotFound /> 
                </Route>
            </Switch>
        );
    }
};

export default PrivateRoute;