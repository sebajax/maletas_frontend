/*
* Node Modules imports
*/
import React, { Fragment } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import API from '../config/API';
import config from '../config/Config';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';
/*
* COMPONENT imports
*/
import HeaderComp from '../components/HeaderComp';
import MenuItemComp from '../components/MenuItemsComp';
import FormButtonsComp from '../components/FormButtonsComp';
import ErrorMessage from '../components/ErrorMessage';
import SelectPermComp from '../components/SelectPermComp';

const CrearUsuario = () => {

    const dispatch = useDispatch();
    const cookies = new Cookies();
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
            dispatch(setValidateMessage(true, `Hubo un error al procesar su solicitud`));
            return;
        }

        try {
            await API.post(config.URL_API_SAVE_USUARIO, req, {
                headers: {
                    Authorization: `Bearer ${cookies.get('jwtToken')}`
                }
            });
            e.target.reset();
            dispatch(setValidateMessage(true, `Usuario: ${data.usuario} creado con exito!`, 'success'));
            setTimeout(() => {
                dispatch(setValidateMessage());
            }, 3000);
        }catch(err) {    
            dispatch(setValidateMessage(true, `${err} Hubo un error al procesar su solicitud`));
        };        
    };

    const handleChangePerm = (value) => {
        setValue("permisos_app", value, true);
    }

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
                                    as={<SelectPermComp token={cookies.get('jwtToken')} handleChangePerm={handleChangePerm} />}
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