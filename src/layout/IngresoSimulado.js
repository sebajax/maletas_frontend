import React, { useState, Fragment } from 'react';
import MenuItemComp from '../componenets/MenuItemsComp';
import FormButtonsComp from '../componenets/FormButtonsComp';
import { Jumbotron, Container, Form, Col, Row } from 'react-bootstrap';
import BreadCrumComp from '../componenets/BreadCrumbComp';
import MontoTotalComp from '../componenets/MontoTotalComp';
import DatePickerComp from '../componenets/DatePickerComp';

const IngresoSimulado = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    let navItems = ["Menu Simulado", "Ingreso Simulado"];

    return (
        <Fragment>
            <MenuItemComp />
            <Container>
                <BreadCrumComp navItems={navItems} />
                <Jumbotron>
                    <h2 className="text-primary mb-4">Ingreso Simulado</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="fecha">
                            <Form.Label column sm={2}>Fecha</Form.Label>
                            <Col sm={10}>
                                <DatePickerComp required setStartDate={setStartDate} startDate={startDate} />
                                <Form.Control.Feedback type="invalid">Debe ingresar una fecha valida.</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="monto">
                            <Form.Label column sm={2}>Monto</Form.Label>
                            <Col sm={6}>
                                <Form.Control required type="text" placeholder="Monto" />
                                <Form.Control.Feedback type="invalid">Debe ingresar un monto valido.</Form.Control.Feedback>
                            </Col>
                        </Form.Group>    
                        <FormButtonsComp />                    
                    </Form>
                </Jumbotron>
                <MontoTotalComp monto={10000} />
            </Container>
        </Fragment>
    );
}

export default IngresoSimulado;