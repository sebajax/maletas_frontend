import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuPrincipal from './layout/MenuPrincipal';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from './layout/NotFound';
import IngresoSimulado from './layout/IngresoSimulado';

const App = () => (
    <BrowserRouter>   
        <Switch>
            <Route exact path="/MenuPrincipal">
                <MenuPrincipal />
            </Route>    
            <Route exact path="/">
                <MenuPrincipal />
            </Route> 
            <Route exact path="/IngresoSimulado">
                <IngresoSimulado />
            </Route> 
            <Route path="*">
                <NotFound />
            </Route>                 
        </Switch>
    </BrowserRouter>
);

export default App;