import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Col, Row, InputGroup } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
//START: import front component
import BreadCrumbComp from '../componenets/BreadCrumbComp';
import MontoTotalComp from '../componenets/MontoTotalComp';
import DatePickerComp from '../componenets/DatePickerComp';
import MenuItemComp from '../componenets/MenuItemsComp';
import FormButtonsComp from '../componenets/FormButtonsComp';
import ErrorMessage from '../componenets/ErrorMessage';
//END: import front component

const IngresoSimulado = () => {
    
    const [startDate, setStartDate] = useState(null);
    let title = "Ingreso Simulado";
    let navItems = ["Menu Simulado", title];
    let dateReg = /^\d{4}[./-]\d{1,2}[./-]\d{1,2}$/

    const { register, handleSubmit, errors, setValue, control, reset } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data, e) => {
        console.log(data);
        e.target.reset();
        setStartDate(null);
    }
    
    const handleChange = (newStartDate, newStartDateFormatted) => {
        if (newStartDate) {
            if(newStartDateFormatted.toString().match(dateReg))
                errors.fecha = ""; 
            else
                errors.fecha = true; 
        }else 
            errors.fecha = true; 
        setStartDate(newStartDate);
    }

    useEffect(() => {
        setValue("fecha", startDate);
    }, 
        [startDate, setValue]
    );

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
                                valueName="selected"
                                rules={{ required: true }}
                                name="fecha"
                                control={control}
                                as={<DatePickerComp startDate={startDate} handleChange={handleChange}  />}        
                            />
                            {errors.fecha && <ErrorMessage message={"Debe ingresar una fecha valida."} />}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="categoria">
                        <Form.Label column sm={2}>Categoria</Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                                name="categoria" 
                                type="text" 
                                placeholder="Categoria de ingreso" 
                                ref={register({ required: true })} 
                            />
                            {errors.categoria && <ErrorMessage message={"Debe ingresar una categoria valida."} />}
                        </Col>
                    </Form.Group>                       
                    <Form.Group as={Row} controlId="monto">
                        <Form.Label column sm={2}>Monto</Form.Label>
                        <Col sm={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="monto_addon">$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control 
                                    name="monto" 
                                    required type="text" 
                                    placeholder="Monto" 
                                    ref={register({ 
                                        required: true, 
                                        validate: {
                                            positiveNumber: value => parseFloat(value) > 0
                                        } 
                                    })} 
                                />
                            </InputGroup>
                            {errors.monto && <ErrorMessage message={"Debe ingresar un monto valida."} />}
                        </Col>
                    </Form.Group>    
                    <FormButtonsComp reset={reset} />                    
                </Form>
                <MontoTotalComp monto={10000} />
            </Container>
        </Fragment>
    );
}

export default IngresoSimulado;