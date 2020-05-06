import { SET_MONTO_TOTAL_SIMULADO } from '../actions/types/MontoTotalSimuladoTypes';

const MontoTotalSimuladoReducer = (state = 0, action) => {
    switch(action.type) {
        case SET_MONTO_TOTAL_SIMULADO:
            return (parseFloat(state) + parseFloat(action.payload));
        default:
            return state;
    };
};

export default MontoTotalSimuladoReducer;