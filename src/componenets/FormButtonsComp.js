import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const FormButtonsComp = (props) => (
    <Form onSubmit={props.handleSubmit}>
        <Form.Row className={"mt-5 d-flex flex-row-reverse"}>
            <Col sm={2}><Button block type="submit" variant="outline-success">Confirmar</Button></Col>
            <Col sm={2}><Button block type="reset" variant="outline-danger">Cancelar</Button></Col>    
        </Form.Row>
    </Form>  
);

export default FormButtonsComp;