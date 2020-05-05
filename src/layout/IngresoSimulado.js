import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Col, Row, InputGroup } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import url from '../config/Config';
import Validate from 'validate.js';
//START: import front component
import HeaderComp from '../components/HeaderComp';
import MontoTotalComp from '../components/MontoTotalComp';
import DatePickerComp from '../components/DatePickerComp';
import MenuItemComp from '../components/MenuItemsComp';
import FormButtonsComp from '../components/FormButtonsComp';
import ErrorMessage from '../components/ErrorMessage';
//END: import front component

const IngresoSimulado = (props) => {
    
    //INI: States
    const [startDate, setStartDate] = useState(null);
    const [monto, setMonto] = useState();

    let title = "Ingreso Simulado";
    let navItems = ["Menu Simulado", title];
    //END: States
    
    const { register, handleSubmit, errors, setValue, control, reset } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        data.fecha = data.fecha.toISOString().slice(0, 19).replace('T', ' ');
        axios.post(`${url}/ingresoSimulado`, {data})
            .then(res => {
                e.target.reset();
                setMonto(updateMonto());
                setStartDate(null);
                props.initValidate(true, `Monto agregado al total: ${res.data.monto}`, 'success');
                setTimeout(() => {
                    props.initValidate();
                }, 3000);
            })
            .catch(function (err) {
                props.initValidate(true, `Hubo un error al procesar la solicitud verifique`);
                console.log(err);
            });
    }

    const handleChange = (newStartDate) => {
        if (Validate.isDefined(newStartDate)) 
            errors.fecha = (Validate.isDate(newStartDate) ? false : true );
        else 
            errors.fecha = true; 
        
        setValue("fecha", newStartDate);
        setStartDate(newStartDate);
    }

    const updateMonto = () => {
        axios.get(`${url}/ingresoSimulado/getAmounts`)
        .then(res => {
            if(res.data.monto)
                setMonto(res.data.monto);
        })
        .catch(err => {
            props.initValidate(true, `Hubo un error al procesar la solicitud verifique`);
            console.log(err);
        });
    }

    useEffect(() => {}, []);   

    return (
        <Fragment>
            <MenuItemComp eventKey={1} />
            <Container>
                <HeaderComp 
                    navItems={navItems} 
                    validate={props.validate}
                    title={title}
                    initValidate={props.initValidate}
                />
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
                <MontoTotalComp monto={monto}/>
            </Container>
        </Fragment>
    );
}

export default IngresoSimulado;