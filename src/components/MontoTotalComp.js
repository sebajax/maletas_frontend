import React from 'react';
import { Alert } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

const MontoTotalComp = (props) => {
    let variant = "primary";
    if(props.monto < 0) variant = "danger";
    
    return (
        <Alert variant={variant}>
            <Alert.Heading>TOTAL ACTUAL EN CAJA <CurrencyFormat value={props.monto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Alert.Heading>
        </Alert>
    );
}

export default MontoTotalComp;