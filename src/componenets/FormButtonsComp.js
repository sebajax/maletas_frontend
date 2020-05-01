import React from 'react';
import { Button, Col } from 'react-bootstrap';

const FormButtonsComp = () => (
        <div className={"mt-5 d-flex flex-row-reverse"}>
            <Col sm={2}><Button block type="submit" variant="outline-primary">Confirmar</Button></Col>
            <Col sm={2}><Button block type="reset" variant="outline-danger">Cancelar</Button></Col>    
        </div>
);

export default FormButtonsComp;