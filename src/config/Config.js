/*
    CONST URL REACT FRONT END
*/
const URL = 'http://localhost:3000';
const URL_MENU_PRINCIPAL = '/MenuPrincipal';
const URL_INGRESO_SIMULADO = '/IngresoSimulado';
const URL_GASTO_SIMULADO = '/GastoSimulado';

/*
    CONST URL API
*/
const URL_API = 'http://localhost:5000/';
const URL_API_GET_AMOUNTS = `${URL_API}ingresoSimulado/getAmounts/`;
const URL_API_INGRESO_SIMULADO = `${URL_API}ingresoSimulado/`;

const SERVER_ERR_COM = "ERROR de comunicacion con servidor";


const config = {
    URL,
    URL_MENU_PRINCIPAL, 
    URL_INGRESO_SIMULADO,
    URL_GASTO_SIMULADO, 
    URL_API,
    URL_API_GET_AMOUNTS,
    URL_API_INGRESO_SIMULADO,
    SERVER_ERR_COM
}

export default config;