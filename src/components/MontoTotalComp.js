import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import url from '../config/Config';

const MontoTotalComp = (props) => {

    const [monto, setMonto] = useState(); 
    let variant = "primary";
    if(props.monto <= 0) variant = "danger";
    
    useEffect(() => {
        axios.get(`${url}/ingresoSimulado/getAmounts`)
        .then(res => {
            if(res.data.monto)
                setMonto(res.data.monto);
        })
        .catch(err => {
            console.log(err);
            setMonto("ERROR de comunicacion con servidor");
        });
    }, []);

    useEffect(() => {
        setMonto(props.monto);
    }, [props.monto])

    return (
        <Alert variant={variant}>
            <Alert.Heading>TOTAL ACTUAL EN CAJA <CurrencyFormat value={monto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Alert.Heading>
        </Alert>
    );
}

export default MontoTotalComp;