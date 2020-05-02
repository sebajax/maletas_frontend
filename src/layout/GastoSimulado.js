import React, { useState, Fragment } from 'react';
import MenuItemComp from '../componenets/MenuItemsComp';
import FormButtonsComp from '../componenets/FormButtonsComp';
import { Container, Form, Col, Row, InputGroup } from 'react-bootstrap';
import BreadCrumbComp from '../componenets/BreadCrumbComp';
import MontoTotalComp from '../componenets/MontoTotalComp';
import DatePickerComp from '../componenets/DatePickerComp';

const GastoSimulado = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [validated, setValidated] = useState(false);
    let title = "Gasto Simulado";
    let navItems = ["Menu Simulado", title];

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <Fragment>
            <MenuItemComp eventKey={1} />
            <Container>
                <BreadCrumbComp navItems={navItems} />
                <h3 className="text-primary mb-4">{title}</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="fecha">
                        <Form.Label column sm={2}>Fecha</Form.Label>
                        <Col sm={6}>
                            <DatePickerComp required setStartDate={setStartDate} startDate={startDate} />
                            <Form.Control.Feedback type="invalid">Debe ingresar una fecha valida.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="categoria">
                        <Form.Label column sm={2}>Categoria</Form.Label>
                        <Col sm={6}>
                            <Form.Control required type="text" placeholder="Categoria de gasto" />
                            <Form.Control.Feedback type="invalid">Debe ingresar una categoria valida.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>                       
                    <Form.Group as={Row} controlId="monto">
                        <Form.Label column sm={2}>Monto</Form.Label>
                        <Col sm={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="monto_addon">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control required type="text" placeholder="Monto" />
                                <Form.Control.Feedback type="invalid">Debe ingresar un monto valido.</Form.Control.Feedback>
                            </InputGroup>
                        </Col>
                    </Form.Group>    
                    <FormButtonsComp />                    
                </Form>
                <MontoTotalComp monto={10000} />
            </Container>
        </Fragment>
    );
}

export default GastoSimulado;