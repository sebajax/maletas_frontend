// Node Modules imports
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Col, Row, InputGroup } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import Validate from 'validate.js';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { SUCCESS, ERROR_SOLICITUD } from '../config/Messages';
import { URL_API_SAVE_INGRESO_SIMULADO } from '../config/ConfigApiIngresosSimulado';

// COMPONENT imports
import HeaderComp from '../components/HeaderComp';
import MontoTotalSimuladoComp from '../components/MontoTotalSimuladoComp';
import DatePickerComp from '../components/DatePickerComp';
import MenuItemComp from '../components/MenuItemsComp';
import FormButtonsComp from '../components/FormButtonsComp';
import ErrorMessage from '../components/ErrorMessage';

// REDUX Actions imports
import { setMontoTotalSimulado } from '../redux/actions/MontoTotalSimuladoActions';
import { setValidateMessage } from '../redux/actions/HeaderActions';

const IngresoSimulado = () => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(null);
    let title = "Ingreso Simulado";
    let navItems = ["Menu Simulado", title];
    
    const { register, handleSubmit, errors, setValue, control, reset } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        data.fecha = data.fecha.toISOString().slice(0, 19).replace('T', ' ');
        try {
            const res = await API.post(URL_API_SAVE_INGRESO_SIMULADO, {data}, API_TOKEN);
            e.target.reset();
            dispatch(setMontoTotalSimulado(res.data.monto));
            setStartDate(null);
            dispatch(setValidateMessage(true, `Monto agregado al total: ${res.data.monto}`, SUCCESS));
        }catch(err) {    
            dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
        };
    };

    const handleChange = (newStartDate) => {
        if (Validate.isDefined(newStartDate)) 
            errors.fecha = (Validate.isDate(newStartDate) ? false : true );
        else 
            errors.fecha = true; 
        
        setValue("fecha", newStartDate, true);
        setStartDate(newStartDate);
    }

    return (
        <Fragment>
            <MenuItemComp eventKey={1} />
            <Container>
                <HeaderComp 
                    navItems={navItems} 
                    title={title}
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
                <MontoTotalSimuladoComp />
            </Container>
        </Fragment>
    );
}

export default IngresoSimulado;