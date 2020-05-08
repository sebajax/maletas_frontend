import { SET_MONTO_TOTAL_SIMULADO, INIT_MONTO_TOTAL_SIMULADO } from '../types/MontoTotalSimuladoTypes';

const MontoTotalSimuladoReducer = (state = 0, action) => {
    switch(action.type) {
        case INIT_MONTO_TOTAL_SIMULADO:
            state = parseFloat(action.payload);
            return state;
        case SET_MONTO_TOTAL_SIMULADO:
            return parseFloat(state) + parseFloat(action.payload);
        default:
            return parseFloat(state);
    };
};

export default MontoTotalSimuladoReducer;