// Node Modules imports
import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";

// Config
import config from '../config/Config';
import { TOKEN } from '../config/ConfigToken';

// COMPONENT-LAYOUT imports
import NotFound from '../layout/NotFound';
import CrearUsuario from '../layout/CrearUsuario';
import ConsultaUsuarios from '../layout/ConsultaUsuarios';
import PermisosApp from '../layout/PermisosApp';
import AsignaModulosPerm from '../layout/AsignaModulosPerm';

const AppAdmin = () => {
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
                exact path={`${path}/${config.URL_CREAR_USUARIO}`}
                render={() => (isAuth()) ?
                    <CrearUsuario /> : <NotFound />
                }
            >   
            </Route>               
            <Route 
                exact path={`${path}/${config.URL_CONSULTA_USUARIOS}`}
                render={() => (isAuth()) ?
                    <ConsultaUsuarios /> : <NotFound />
                }
            >   
            </Route>         
            <Route 
                exact path={`${path}/${config.URL_PERMISOS_APP}`}
                render={() => (isAuth()) ?
                    <PermisosApp /> : <NotFound />
                }
            >   
            </Route>  
            <Route 
                exact path={`${path}/${config.URL_ASIGNA_MODULOS_PERM}`}
                render={() => (isAuth()) ?
                    <AsignaModulosPerm /> : <NotFound />
                }
            >   
            </Route>              
            <Route path="*">
                <NotFound />
            </Route>                         
        </Switch>       
    );
};

export default AppAdmin;