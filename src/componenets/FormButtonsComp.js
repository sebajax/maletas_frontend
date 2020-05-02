import React from 'react';
import { Button, Col, Alert } from 'react-bootstrap';

const FormButtonsComp = () => (
    <Alert variant="dark">
        <div className={"d-flex flex-row-reverse"}>
            <Col sm={2}><Button block type="submit" variant="outline-primary">Confirmar</Button></Col>
            <Col sm={2}><Button block type="reset" variant="outline-danger">Cancelar</Button></Col>  
        </div>
    </Alert>  
);

export default FormButtonsComp;