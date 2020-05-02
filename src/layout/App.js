import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import MenuPrincipal from './MenuPrincipal';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from './NotFound';
import IngresoSimulado from './IngresoSimulado';
import GastoSimulado from './GastoSimulado';

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