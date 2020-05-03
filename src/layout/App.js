import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
//START: import front layout component
import MenuPrincipal from './MenuPrincipal';
import IngresoSimulado from './IngresoSimulado';
import GastoSimulado from './GastoSimulado';
import NotFound from './NotFound';
//END: import front layout component

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
            <Route exact path="/GastoSimulado">
                <GastoSimulado />
            </Route> 
            <Route path="*">
                <NotFound />
            </Route>                 
        </Switch>
    </BrowserRouter>
);

export default App;