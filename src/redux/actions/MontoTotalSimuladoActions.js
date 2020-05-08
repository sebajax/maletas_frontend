import { SET_MONTO_TOTAL_SIMULADO, INIT_MONTO_TOTAL_SIMULADO } from '../types/MontoTotalSimuladoTypes';

export const setMontoTotalSimulado = monto => ({
    type: SET_MONTO_TOTAL_SIMULADO,
    payload: monto
});

export const initMontoTotalSimulado = monto => ({
    type: INIT_MONTO_TOTAL_SIMULADO,
    payload: monto
});