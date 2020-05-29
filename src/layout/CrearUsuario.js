// Node Modules imports
import React, { Fragment } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from 'react-redux';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { SUCCESS, ERROR_SOLICITUD } from '../config/Messages';
import { URL_API_SAVE_USUARIO } from '../config/ConfigApiUsuarios';

// COMPONENT imports
import HeaderComp from '../components/HeaderComp';
import MenuItemComp from '../components/MenuItemsComp';
import FormButtonsComp from '../components/FormButtonsComp';
import ErrorMessage from '../components/ErrorMessage';
import SelectPermComp from '../components/SelectPermComp';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';

const CrearUsuario = () => {
    const dispatch = useDispatch();
    let title = "Crear Usuario";
    let navItems = ["Admin", title];

    const { register, handleSubmit, errors, reset, control, setValue } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        let req = {};

        if(data) {
            req = {
                "user": data.usuario,
                "password": data.usuario,
                "name": data.nombre,
                "config": {
                    "permId": data.permisos_app,
                    "appTheme": true
                }  
            };
        }else {
            dispatch(setValidateMessage(true, ERROR_SOLICITUD));
            return;
        }

        try {
            await API.post(URL_API_SAVE_USUARIO, req, API_TOKEN);
            e.target.reset();
            setValue("permisos_app", "");
            dispatch(setValidateMessage(true, `Usuario: ${data.usuario} creado con exito!`, SUCCESS));
        }catch(err) {    
            dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
        };        
    };

    const handleChangePerm = (value) => setValue("permisos_app", value, true);

    return (
        <Fragment>
            <MenuItemComp eventKey={2} />
            <Container>
                <HeaderComp
                    navItems={navItems} 
                    title={title}                    
                />
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} controlId="usuario">
                        <Form.Label column sm={2}>Usuario</Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                                name="usuario" 
                                type="text" 
                                placeholder="Usuario" 
                                ref={register({ required: true })} 
                            />
                            {errors.usuario && <ErrorMessage message={"Debe ingresar un usuario valido."} />}
                        </Col>
                    </Form.Group>     
                    <Form.Group as={Row} controlId="nombre">
                        <Form.Label column sm={2}>Nombre</Form.Label>
                        <Col sm={6}>
                            <Form.Control 
                                name="nombre" 
                                type="text" 
                                placeholder="Nombre" 
                                ref={register({ required: true })} 
                            />
                            {errors.nombre && <ErrorMessage message={"Debe ingresar un nombre valido."} />}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="permisos_app">
                        <Form.Label column sm={2}>Permisos App</Form.Label>
                        <Col sm={6}>
                            <Controller
                                as={<SelectPermComp handleChangePerm={handleChangePerm} />}
                                control={control}
                                name="permisos_app"
                                rules={{ required: true }}
                            />
                            {errors.permisos_app && <ErrorMessage message={"Debe seleccionar un tipo de permiso."} />}
                        </Col>
                    </Form.Group>                                         
                    <FormButtonsComp reset={reset} />
                </Form>
            </Container>
        </Fragment>
    );
}

export default CrearUsuario;