// Node Modules imports
import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useSelector, useDispatch } from 'react-redux';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { URL_API_GET_MONTO_TOTAL_SIMULADO } from '../config/ConfigApiIngresosSimulado';
import { ERROR_SOLICITUD } from '../config/Messages';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { initMontoTotalSimulado } from '../redux/actions/MontoTotalSimuladoActions';

const MontoTotalSimuladoComp = () => {
    const dispatch = useDispatch();
    let theme = useSelector(state => state.ThemeReducer);
    let monto = useSelector(state => state.MontoTotalSimuladoReducer);
    let variant = (monto <= 0) ? "danger" : (theme.theme) ? "success" : "primary";
   
    useEffect(() => {
        const getMontoTotalSimulado = async () => {
            try {
                let res = await API.get(URL_API_GET_MONTO_TOTAL_SIMULADO, API_TOKEN)
                if(res.data.monto)
                    dispatch(initMontoTotalSimulado(res.data.monto));
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`)); 
            };
        };
        getMontoTotalSimulado();
    }, [dispatch]);

    return (
        <Alert variant={variant}>
            <Alert.Heading>Total en caja (simulado) <CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Alert.Heading>
        </Alert>
    );
}

export default MontoTotalSimuladoComp;