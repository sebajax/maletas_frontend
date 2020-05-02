import React, { Fragment, useState, useEffect } from 'react';
import MenuItemComp from '../componenets/MenuItemsComp';
import FormButtonsComp from '../componenets/FormButtonsComp';
import { Container, Form, Col, Row, InputGroup } from 'react-bootstrap';
import BreadCrumbComp from '../componenets/BreadCrumbComp';
import MontoTotalComp from '../componenets/MontoTotalComp';
import DatePickerComp from '../componenets/DatePickerComp';
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const IngresoSimulado = () => {
    
    const [startDate, setStartDate] = useState(null);
    let title = "Ingreso Simulado";
    let navItems = ["Menu Simulado", title];

    const { register, handleSubmit, errors, setValue, control } = useForm({
        mode: 'onChange',
    });

    const onSubmit = data => {
        console.log(data);
    }
    const handleChange = (newStartDate) => {
        setStartDate(newStartDate);
    }

    useEffect(() => {
        setValue("fecha", startDate);
    });    

    return (
        <Fragment>
            <MenuItemComp eventKey={1} />
            <Container>
                <BreadCrumbComp navItems={navItems} />
                <h3 className="text-primary mb-4">{title}</h3>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} controlId="fecha">
                        <Form.Label column sm={2}>Fecha</Form.Label>
                        <Col sm={6}>
                            <Controller
                                rules={{ required: true }}
                                name="fecha"
                                control={control}  
                                as={<DatePickerComp startDate={startDate} handleChange={handleChange}  />}        
                            />
                            <div className="text-danger"><FontAwesomeIcon icon={faExclamationCircle} /> {errors.fecha && "Debe ingresar una fecha valida."}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="categoria">
                        <Form.Label column sm={2}>Categoria</Form.Label>
                        <Col sm={6}>
                            <Form.Control name="categoria" required type="text" placeholder="Categoria de ingreso" ref={register({ required: true })} />
                            {errors.categoria && "Debe ingresar una categoria valida."}
                        </Col>
                    </Form.Group>                       
                    <Form.Group as={Row} controlId="monto">
                        <Form.Label column sm={2}>Monto</Form.Label>
                        <Col sm={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="monto_addon">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control name="monto" required type="text" placeholder="Monto" ref={register({ required: true })} />
                            </InputGroup>
                            {errors.monto && "Debe ingresar un monto valida."}
                        </Col>
                    </Form.Group>    
                    <FormButtonsComp />                    
                </Form>
                <MontoTotalComp monto={10000} />
            </Container>
        </Fragment>
    );
}

export default IngresoSimulado;