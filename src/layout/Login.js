// Node Modules imports
import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLuggageCart, faSuitcaseRolling, faUser } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { Formik } from 'formik';
import * as Yup from 'yup';

// Config
import API from '../config/API';
import ROUTES from '../config/Routes';
import { URL_API_LOGIN } from '../config/ConfigApi';
import version from '../config/Version';
import { ERROR_ACCESO } from '../config/Messages';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setTheme } from '../redux/actions/ThemeActions';

// COMPONENT imports
import HeaderComp from '../components/HeaderComp';

// Validation Form Schema
const schemaLogin = Yup.object().shape({
    usuario: Yup.string()
        .required('Debe ingresar un Usuario.'),
    password: Yup.string()
        .required('Debe ingresar un Password.')
});

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch({type: 'USER_LOGGED_OUT'});
    }, [dispatch]);

    return (
        <Fragment>
            
            <Navbar className="justify-content-between" bg="dark" expand="md" variant="dark">
                <Navbar.Brand className="text-primary">
                    <FontAwesomeIcon icon={faSuitcaseRolling} size="2x" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>    

            <div className="login-container mt-5 p-2">
                <div className="login shadow rounded p-5">
                    <div className="d-flex justify-content-center text-primary" style={{fontSize: "34px"}}>
                        <span style={{opacity: "0.1"}}><FontAwesomeIcon icon={faUser} size="2x" /></span> 
                    </div>
                    <HeaderComp />
                    <Formik
                        validationSchema={schemaLogin}
                        initialValues={{
                            usuario: '',
                            password: '',
                        }}
                        onSubmit={async values => { 
                            try {
                                const response = await API.get(URL_API_LOGIN, {
                                    auth: {
                                        username: values.usuario,
                                        password: values.password
                                    }
                                });
                                if(response.data.auth && response.data.token) {
                                    localStorage.setItem("jwtToken", response.data.token);
                                    sessionStorage.setItem("auth", response.data.auth);
                                    sessionStorage.setItem("userId", response.data.userId);
                                    sessionStorage.setItem("user", response.data.user);
                                    sessionStorage.setItem("permType", response.data.permType);
                                    sessionStorage.setItem("permId", response.data.permId);
                                    dispatch(setTheme(response.data.appTheme));
                                    dispatch(setValidateMessage());
                                    history.push(ROUTES.PATH_HOME);
                                }else {
                                    dispatch(setValidateMessage(true, ERROR_ACCESO));
                                }
                            }catch(err) {
                                dispatch(setValidateMessage(true, ERROR_ACCESO));
                            }                             
                        }}
                    >
                    {({ touched, errors, values, handleChange, handleSubmit, handleBlur }) => (
                        <Form noValidate className="mt-3" onSubmit={handleSubmit}>
                            
                            <Form.Group controlId="loginUser">
                                <Form.Control
                                    name="usuario"
                                    type="text" 
                                    value={values.usuario}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Usuario" 
                                    isInvalid={touched.usuario && errors.usuario}
                                    isValid={touched.usuario && !errors.usuario}
                                />
                                <Form.Control.Feedback type="invalid"> {errors.usuario} </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="loginPassword">
                                <Form.Control
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Password" 
                                    isInvalid={touched.password && errors.password}
                                    isValid={touched.password && !errors.password}
                                    autoComplete="on" 
                                />
                                <Form.Control.Feedback type="invalid"> {errors.password} </Form.Control.Feedback>
                            </Form.Group>

                            <Button className="mt-4" size="lg" variant="primary" type="submit" block>Ingresar</Button>
                        
                        </Form>
                    )}
                    </Formik>

                </div>
            </div>
            <div className="d-flex justify-content-center text-primary mt-5">
                <span style={{opacity: "0.1"}}><FontAwesomeIcon icon={faLuggageCart} size="3x" /></span> 
            </div>
            <div className="d-flex justify-content-center text-primary">
                <span style={{opacity: "0.1"}}>{version.APP}</span>
            </div>
            <div className="d-flex justify-content-center text-primary">
                <span style={{opacity: "0.1"}}>v{version.VERSION}</span>
            </div>            
        </Fragment>
    );
};

export default Login;