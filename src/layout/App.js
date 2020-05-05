import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';
import url from '../config/Config';
//START: import front layout component
import MenuPrincipal from './MenuPrincipal';
import IngresoSimulado from './IngresoSimulado';
import GastoSimulado from './GastoSimulado';
import NotFound from './NotFound';
//END: import front layout component

const App = () => {

    const [validate, setValidate] = useState({});

    const initValidate = (valid = false, message = "", variant = "danger") => {
        setValidate({
            valid: valid,
            message: message, 
            variant: variant
        });
    }

    useEffect(() => {
        axios.get(`${url}/`)
        .then(res => {
            console.log(res);
            if(res.status === 200)
                initValidate(false, ``, 'success');
        })
        .catch(err => {
            console.log(err);
            initValidate(true, `${err} (No es posible conectarse al servidor)`);
        });        
    }, []);      

    return(
        <BrowserRouter>   
            <Switch>
                <Route exact path="/MenuPrincipal">
                    <MenuPrincipal />
                </Route>    
                <Route exact path="/">
                    <MenuPrincipal />
                </Route> 
                <Route exact path="/IngresoSimulado">
                    <IngresoSimulado 
                        initValidate={initValidate}
                        validate={validate}
                    />
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
};

export default App;