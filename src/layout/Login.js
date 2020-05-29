// Node Modules imports
import React, {Fragment} from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Button, Alert, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLuggageCart, faSuitcaseRolling, faUser } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

// Config
import API from '../config/API';
import config from '../config/Config';
import { URL_API_LOGIN } from '../config/ConfigApi';
import version from '../config/Version';
import { cookies } from '../config/ConfigToken';
import { ERROR_ACCESO } from '../config/Messages';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setTheme } from '../redux/actions/ThemeActions';

// COMPONENT imports
import HeaderComp from '../components/HeaderComp';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const response = await API.get(URL_API_LOGIN, {
                auth: {
                    username: data.usuario,
                    password: data.password
                }
            });
            if(response.data.auth && response.data.token) {
                cookies.set('jwtToken', response.data.token, { path: '/' });
                sessionStorage.setItem("auth", response.data.auth);
                sessionStorage.setItem("userId", response.data.userId);
                sessionStorage.setItem("user", response.data.user);
                sessionStorage.setItem("permType", response.data.permType);
                dispatch(setTheme(response.data.appTheme));
                dispatch(setValidateMessage());
                history.push(config.URL_MENU_PRINCIPAL);
            }else {
                dispatch(setValidateMessage(true, ERROR_ACCESO));
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${ERROR_ACCESO}`));
        } 
    };

    return (
        <Fragment>
            <Navbar className="justify-content-between" bg="dark" expand="md" variant="dark">
                <Navbar.Brand className="text-primary">
                    <FontAwesomeIcon icon={faSuitcaseRolling} size="2x" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Navbar>        
            <Container id="container" className="my-5 w-75">
                <HeaderComp />
                <Alert variant="dark">
                    <div className="d-flex justify-content-center text-primary" style={{paddingTop: "30px", fontSize: "34px"}}>
                        <span style={{opacity: "0.1"}}><FontAwesomeIcon icon={faUser} size="3x" /></span> 
                    </div>                
                    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="loginUser">
                            <Form.Control 
                                name="usuario"
                                size="lg" 
                                type="text" 
                                placeholder="Usuario" 
                                ref={register({ required: true })} 
                            />
                            {errors.usuario && <ErrorMessage message={"Debe ingresar un usuario."} />}
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Control 
                                name="password"
                                size="lg" 
                                type="password" 
                                placeholder="Password" 
                                autoComplete="on" 
                                ref={register({ required: true })} 
                            />
                            {errors.password && <ErrorMessage message={"Debe ingresar un password."} />}
                        </Form.Group>
                        <hr />
                        <Button className="mt-4" size="lg" variant="primary" type="submit" block>Confirmar</Button>
                    </Form>
                    <br />
                </Alert>
            </Container>
            <div className="d-flex justify-content-center text-primary">
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