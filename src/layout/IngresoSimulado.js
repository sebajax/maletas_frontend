import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Container, Form, Col, Row, InputGroup, Alert } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import url from '../config/Config';
import Validate from 'validate.js';
//START: import front component
import BreadCrumbComp from '../components/BreadCrumbComp';
import MontoTotalComp from '../components/MontoTotalComp';
import DatePickerComp from '../components/DatePickerComp';
import MenuItemComp from '../components/MenuItemsComp';
import FormButtonsComp from '../components/FormButtonsComp';
import ErrorMessage from '../components/ErrorMessage';
//END: import front component

const IngresoSimulado = () => {
    
    //INI: States
    const [startDate, setStartDate] = useState(null);
    const [validate, setValidate] = useState({ 
        valid: false,
        message: '', 
        variant: '',
    });
    const [amount, setAmount] = useState(0);
    //END: States

    let title = "Ingreso Simulado";
    let navItems = ["Menu Simulado", title];
    
    const { register, handleSubmit, errors, setValue, control, reset } = useForm({
        mode: 'onChange',
    });

    const initValidate = (valid = false, message = "", variant = "danger") => {
        setValidate({
            valid: valid,
            message: message, 
            variant: variant
        });
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        data.fecha = data.fecha.toISOString().slice(0, 19).replace('T', ' ');
        axios.post(`${url}/ingresoSimulado`, {data})
            .then(res => {
                e.target.reset();
                setStartDate(null);
                initValidate(true, `Monto agregado al total: ${res.data.monto}`, 'success');
                getAmounts();
                setTimeout(() => {
                    initValidate();
                }, 3000);
            })
            .catch(function (err) {
                initValidate(true, `Hubo un error al procesar la solicitud verifique`);
                console.log(err);
            });
    }
    
    const handleChange = (newStartDate) => {
        if (Validate.isDefined(newStartDate)) {
            errors.fecha = (Validate.isDate(newStartDate) ? false : true );
        }else 
            errors.fecha = true; 
        
        setValue("fecha", newStartDate);
        setStartDate(newStartDate);
    }

    const getAmounts = useCallback(() => {
        axios.get(`${url}/ingresoSimulado/getAmounts`)
        .then(res => {
            console.log(res.data.monto);
            if(res.data.monto)
                setAmount(res.data.monto);
        })
        .catch(err => {
            initValidate(true, `Hubo un error al procesar la solicitud verifique`);
            console.log(err);
        });
    }, []);

    useEffect(() => {
        getAmounts();
    }, [getAmounts]);

    return (
        <Fragment>
            <MenuItemComp eventKey={1} />
            <Container>
                <BreadCrumbComp navItems={navItems} />
                <h3 className="text-primary mb-4">{title}</h3>
                {validate.valid && <Alert variant={validate.variant} onClose={() => initValidate()} dismissible> {validate.message} </Alert>}
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
                                            number: value => Validate.isNumber(parseFloat(value))
                                        } 
                                    })} 
                                />
                            </InputGroup>
                            {errors.monto && <ErrorMessage message={"Debe ingresar un monto valida."} />}
                        </Col>
                    </Form.Group>    
                    <FormButtonsComp reset={reset} />               
                </Form>
                <MontoTotalComp monto={amount} />
            </Container>
        </Fragment>
    );
}

export default IngresoSimulado;