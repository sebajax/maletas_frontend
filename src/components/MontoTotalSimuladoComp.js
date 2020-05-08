/*
* Node Modules imports
*/
import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { useSelector, useDispatch } from 'react-redux';
import API from '../config/API';
import config from '../config/Config';

/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { initMontoTotalSimulado } from '../redux/actions/MontoTotalSimuladoActions';

const MontoTotalSimuladoComp = () => {
    const dispatch = useDispatch();
    let theme = useSelector(state => state.ThemeReducer);
    let monto = useSelector(state => state.MontoTotalSimuladoReducer);
    let variant = (monto <= 0) ? "danger" : (theme.theme) ? "success" : "primary";
   
    useEffect(() => {
        API.get(config.URL_API_GET_AMOUNTS)
        .then(res => {
            if(res.data.monto)
                dispatch(initMontoTotalSimulado(res.data.monto));
        })
        .catch(err => {
            dispatch(setValidateMessage(true, `${err} (No es posible conectarse al servidor)`)); 
        });  
    }, [dispatch]);

    return (
        <Alert variant={variant}>
            <Alert.Heading>Total en caja (simulado) <CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Alert.Heading>
        </Alert>
    );
}

export default MontoTotalSimuladoComp;