// Node Modules imports
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Config
import config from '../config/Config';
import { URL_API } from '../config/ConfigApi';
import { SERVER_ERR_COM } from '../config/Messages';
import API from '../config/API';
import { TOKEN } from '../config/ConfigToken';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';

// COMPONENT-LAYOUT imports
import Login from './Login';
import MenuPrincipal from './MenuPrincipal';
import IngresoSimulado from './IngresoSimulado';
import GastoSimulado from './GastoSimulado';
import NotFound from './NotFound';
import CrearUsuario from './CrearUsuario';
import ConsultaUsuarios from './ConsultaUsuarios';
import PermisosApp from './PermisosApp';

// CSS
import '../css/App.css'

const App = () => {

    const dispatch = useDispatch();

    const isAuth = () => {
        if(sessionStorage.getItem("auth") && TOKEN)
            return true;
        else   
            return false;
    };

    useEffect(() => {
        const checkApi = async () => { 
            try {
                const res = await API.get(URL_API);
                if(res.status === 200)
                    dispatch(setValidateMessage(false, ``, 'success'));
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} ${SERVER_ERR_COM}`));
            };      
        };
        checkApi();
    }, [dispatch]);

    return(
        <BrowserRouter>   
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>            
                <Route 
                    exact path={config.URL_MENU_PRINCIPAL}
                    render={() => (isAuth()) ?
                        <MenuPrincipal /> : <NotFound />}
                >
                </Route>
               <Route 
                    exact path={config.URL_INGRESO_SIMULADO}
                    render={() => (isAuth()) ?
                        <IngresoSimulado /> : <NotFound />}
                >   
                </Route>
                <Route 
                    exact path={config.URL_GASTO_SIMULADO}
                    render={() => (isAuth()) ?
                        <GastoSimulado /> : <NotFound />}
                >   
                </Route>
                <Route 
                    exact path={config.URL_CREAR_USUARIO}
                    render={() => (isAuth()) ?
                        <CrearUsuario /> : <NotFound />}
                >   
                </Route>               
                <Route 
                    exact path={config.URL_CONSULTA_USUARIOS}
                    render={() => (isAuth()) ?
                        <ConsultaUsuarios /> : <NotFound />}
                >   
                </Route>         
                <Route 
                    exact path={config.URL_PERMISOS_APP}
                    render={() => (isAuth()) ?
                        <PermisosApp /> : <NotFound />}
                >   
                </Route>                           
                <Route path="*">
                    <NotFound />
                </Route>                 
            </Switch>
        </BrowserRouter>
    );
};

export default App;