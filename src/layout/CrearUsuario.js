// Node Modules imports
import React, { Fragment } from 'react';
import { Container, Form, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { SUCCESS, ERROR_SOLICITUD } from '../config/Messages';
import { URL_API_SAVE_USUARIO } from '../config/ConfigApiUsuarios';

// COMPONENT imports
import HeaderComp from '../components/HeaderComp';
import MenuItemComp from '../components/MenuItemsComp';
import FormButtonsComp from '../components/FormButtonsComp';
import SelectPermComp from '../components/SelectPermComp';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';

// Validation Form Schema
const schemaCrearUsuario = Yup.object().shape({
    usuario: Yup.string()
        .required('Debe ingresar un usuario valido.'),
    nombre: Yup.string()
        .required('Debe ingresar un nombre valido.'),
    permisos_app: Yup.string()
        .required('Debe seleccionar un tipo de permiso.')
});

const CrearUsuario = () => {
    const dispatch = useDispatch();
    let title = "Crear Usuario";
    let navItems = ["Admin", title];

    return (
        <Fragment>
            <MenuItemComp eventKey={2} />
            <Container className="form-container">
                <div className="form">
                    <HeaderComp
                        navItems={navItems} 
                        title={title}                    
                    />

                    <Formik
                        validationSchema={schemaCrearUsuario}
                        initialValues={{
                            usuario: '',
                            nombre: '',
                            permisos_app: ''
                        }}
                        onSubmit={async (values, { resetForm }) => {
                            let req = {};
                            if(values) {
                                req = {
                                    "user": values.usuario,
                                    "password": values.usuario,
                                    "name": values.nombre,
                                    "config": {
                                        "permId": values.permisos_app,
                                        "appTheme": true
                                    }  
                                };
                            }else {
                                dispatch(setValidateMessage(true, ERROR_SOLICITUD));
                                return;
                            }

                            try {
                                await API.post(URL_API_SAVE_USUARIO, req, API_TOKEN);
                                dispatch(setValidateMessage(true, `Usuario: ${values.usuario} creado con exito!`, SUCCESS));
                                resetForm();
                            }catch(err) {
                                dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
                            };  
                        }}
                    >
                    {({ touched, errors, values, handleChange, handleSubmit, handleBlur, handleReset }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="usuario">
                                <Col>
                                    <Form.Control 
                                        name="usuario" 
                                        type="text" 
                                        placeholder="Usuario"
                                        value={values.usuario}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.usuario && errors.usuario}
                                        isValid={touched.usuario && !errors.usuario}                                 
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.usuario} </Form.Control.Feedback>
                                </Col>
                            </Form.Group>     
                            <Form.Group as={Row} controlId="nombre">
                                <Col>
                                    <Form.Control
                                        name="nombre" 
                                        type="text" 
                                        placeholder="Nombre" 
                                        value={values.nombre}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.nombre && errors.nombre}
                                        isValid={touched.nombre && !errors.nombre}                                       
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.nombre} </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="permisos_app">
                                <Col>
                                    <SelectPermComp 
                                        name="permisos_app"
                                        value={values.permisos_app}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.permisos_app && errors.permisos_app}
                                        isValid={touched.permisos_app && !errors.permisos_app}
                                    />
                                    <Form.Control.Feedback type="invalid"> {errors.permisos_app} </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <FormButtonsComp reset={handleReset} />
                        </Form>
                    )}
                    </Formik>
                </div>
            </Container>
        </Fragment>
    );
}

export default CrearUsuario;