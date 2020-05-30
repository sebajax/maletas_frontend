import modules from './Modules';
import config from './Config';

// Home
const PATH_HOME = `/${modules.HOME}/${config.URL_MENU_PRINCIPAL}`;

// Simulado
const PATH_SIMULACION_INGRESO_SIMULADO = `/${modules.SIMULACION}/${config.URL_INGRESO_SIMULADO}`;
const PATH_SIMULACION_GASTO_SIMULADO = `/${modules.SIMULACION}/${config.URL_GASTO_SIMULADO}`;

// Admin
const PATH_ADMIN_CREAR_USUARIO = `/${modules.ADMIN}/${config.URL_CREAR_USUARIO}`;
const PATH_ADMIN_CONSULTA_USUARIOS = `/${modules.ADMIN}/${config.URL_CONSULTA_USUARIOS}`;
const PATH_ADMIN_PERMISOS_APP = `/${modules.ADMIN}/${config.URL_PERMISOS_APP}`;

const ROUTES = {
    PATH_HOME,
    PATH_SIMULACION_INGRESO_SIMULADO,
    PATH_SIMULACION_GASTO_SIMULADO,
    PATH_ADMIN_CREAR_USUARIO,
    PATH_ADMIN_CONSULTA_USUARIOS,
    PATH_ADMIN_PERMISOS_APP,
};

export default ROUTES;