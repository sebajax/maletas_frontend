import { SET_MONTO_TOTAL_SIMULADO } from './types/MontoTotalSimuladoTypes';

export const setMontoTotalSimulado = monto => ({
    type: SET_MONTO_TOTAL_SIMULADO,
    payload: monto
});