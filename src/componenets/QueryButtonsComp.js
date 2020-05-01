import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const QueryButtonsComp = (props) => (
    <Form onSubmit={props.handleSubmit} className={"w-75"}>
        <Form.Row className={"mt-3"}>
            <Col sm={2}>
                <Button block type="submit" variant="outline-success">Consultar</Button>
            </Col>
            <Col sm={2}>
                <Button block type="reset" variant="outline-success">Imprimir</Button>
            </Col>
            <Col sm={2}>
                <Button block type="button" variant="outline-success">Exportar xls</Button>
            </Col>
            <Col sm={2}>
                <Button block type="button" variant="outline-success">Exportar json</Button>
            </Col>
        </Form.Row>
    </Form>
);

export default QueryButtonsComp;