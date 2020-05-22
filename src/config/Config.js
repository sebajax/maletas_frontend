import Cookies from 'universal-cookie';
const cookies = new Cookies();
const TOKEN = cookies.get('jwtToken');

/*
    CONST URL REACT FRONT END
*/
const URL = 'http://localhost:3000';
const URL_LOGIN = '/Login';
const URL_MENU_PRINCIPAL = '/MenuPrincipal';
const URL_INGRESO_SIMULADO = '/IngresoSimulado';
const URL_GASTO_SIMULADO = '/GastoSimulado';
const URL_CREAR_USUARIO = '/CrearUsuario';
const URL_CONSULTA_USUARIOS = '/ConsultaUsuarios';

/*
    CONST URL API
*/
const URL_API = 'http://localhost:5000/';
//const URL_API = 'http://192.168.1.95:5000/';
const URL_API_LOGIN = `${URL_API}login`;
const URL_API_TOKEN = `${URL_API_LOGIN}/checkToken`;

//Usuarios
const URL_API_GET_USUARIOS = `${URL_API}usuarios/getAllUsuarios/`;
const URL_API_GET_USUARIO = `${URL_API}usuarios/getUsuario/`;
const URL_API_GET_USUARIO_ID = `${URL_API}usuarios/getUsuarioId/`;
const URL_API_SAVE_USUARIO = `${URL_API}usuarios/saveUsuario/`;
const URL_API_UPDATE_USUARIO = `${URL_API}usuarios/updateUsuario/`;
const URL_API_DELETE_USUARIO = `${URL_API}usuarios/removeUsuario/`;
const URL_API_UPDATE_THEME = `${URL_API}usuarios/updateTheme/`;

//Permisos
const URL_API_GET_PERMISOS = `${URL_API}permisos/getPermisos/`;

//Ingresos Simulado
const URL_API_GET_MONTO_TOTAL_SIMULADO = `${URL_API}ingresosSimulado/getMontoTotalSimulado`;
const URL_API_SAVE_INGRESO_SIMULADO = `${URL_API}ingresosSimulado/saveIngresoSimulado`;

const API_TOKEN = {
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
}

const SERVER_ERR_COM = "ERROR de comunicacion con servidor";
const ERROR_SOLICITUD = "Hubo un error al procesar su solicitud";

const config = {
    ERROR_SOLICITUD,
    TOKEN,
    API_TOKEN,
    URL,
    URL_LOGIN,
    URL_MENU_PRINCIPAL, 
    URL_INGRESO_SIMULADO,
    URL_GASTO_SIMULADO, 
    URL_CREAR_USUARIO,
    URL_CONSULTA_USUARIOS,
    URL_API,
    URL_API_LOGIN,
    URL_API_TOKEN,
    URL_API_GET_MONTO_TOTAL_SIMULADO,
    URL_API_SAVE_INGRESO_SIMULADO,
    URL_API_GET_USUARIOS,
    URL_API_GET_USUARIO,
    URL_API_GET_USUARIO_ID,
    URL_API_SAVE_USUARIO,
    URL_API_UPDATE_USUARIO,
    URL_API_DELETE_USUARIO,
    URL_API_UPDATE_THEME,
    URL_API_GET_PERMISOS,
    SERVER_ERR_COM
};

export default config;