/*
    CONST URL REACT FRONT END
*/
const URL = 'http://localhost:3000';
const URL_LOGIN = '/Login';
const URL_MENU_PRINCIPAL = '/MenuPrincipal';
const URL_INGRESO_SIMULADO = '/IngresoSimulado';
const URL_GASTO_SIMULADO = '/GastoSimulado';

/*
    CONST URL API
*/
const URL_API = 'http://localhost:5000/';
//const URL_API = 'http://192.168.1.95:5000/';
const URL_API_LOGIN = `${URL_API}login`;
const URL_API_TOKEN = `${URL_API_LOGIN}/checkToken`;

//Usuarios
const URL_API_UPDATE_USUARIO = `${URL_API}usuarios/updateUsuario/`;
const URL_API_UPDATE_THEME = `${URL_API}usuarios/updateTheme/`;

//Ingresos Simulado
const URL_API_GET_MONTO_TOTAL_SIMULADO = `${URL_API}ingresosSimulado/getMontoTotalSimulado`;
const URL_API_SAVE_INGRESO_SIMULADO = `${URL_API}ingresosSimulado/saveIngresoSimulado`;

const SERVER_ERR_COM = "ERROR de comunicacion con servidor";

const config = {
    URL,
    URL_LOGIN,
    URL_MENU_PRINCIPAL, 
    URL_INGRESO_SIMULADO,
    URL_GASTO_SIMULADO, 
    URL_API,
    URL_API_LOGIN,
    URL_API_TOKEN,
    URL_API_GET_MONTO_TOTAL_SIMULADO,
    URL_API_SAVE_INGRESO_SIMULADO,
    URL_API_UPDATE_USUARIO,
    URL_API_UPDATE_THEME,
    SERVER_ERR_COM
};

export default config;