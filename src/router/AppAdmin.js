// Node Modules imports
import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

// Config
import config from '../config/Config';

// COMPONENT-LAYOUT imports
import PrivateRoute from '../components/PrivateRoute';
import NotFound from '../layout/NotFound';
import CrearUsuario from '../layout/CrearUsuario';
import ConsultaUsuarios from '../layout/ConsultaUsuarios';
import PermisosApp from '../layout/PermisosApp';
import AsignaModulosPerm from '../layout/AsignaModulosPerm';

const AppAdmin = () => {
    const { path } = useRouteMatch();
    
    return(
        <Switch>
            <PrivateRoute 
                path={`${path}/${config.URL_CREAR_USUARIO}`}
                component={CrearUsuario} 
                module={path.toUpperCase()} 
            />
            <PrivateRoute 
                path={`${path}/${config.URL_CONSULTA_USUARIOS}`}
                component={ConsultaUsuarios} 
                module={path.toUpperCase()} 
            />
            <PrivateRoute 
                path={`${path}/${config.URL_PERMISOS_APP}`}
                component={PermisosApp} 
                module={path.toUpperCase()} 
            />
            <PrivateRoute 
                path={`${path}/${config.URL_ASIGNA_MODULOS_PERM}`}
                component={AsignaModulosPerm} 
                module={path.toUpperCase()} 
            />
            <Route path="*">
                <NotFound />
            </Route>                         
        </Switch>       
    );
};

export default AppAdmin;