// Node Modules imports
import React from 'react';
import { Button, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const FormButtonsComp = props => {
    const theme = useSelector(state => state.ThemeReducer);
    
    return (
        <Alert className="w-100" variant={theme.style.bg}>
            <div className={"d-flex flex-row-reverse"}>
                <Col sm={4} md={3} lg={3}><Button block type="submit" variant={theme.style.btnSuccess}>Confirmar</Button></Col>
                <Col sm={4} md={3} lg={3}><Button block type="reset" variant={theme.style.btnCancel} onClick={props.reset}>Cancelar</Button></Col>  
            </div>
        </Alert>  
    );
};

export default FormButtonsComp;