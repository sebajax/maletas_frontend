/*
* Node Modules imports
*/
import React, {Fragment} from 'react';
import { useDispatch } from 'react-redux';
import { Container, Form, Button, Alert, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLuggageCart, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import API from '../config/API';
import config from '../config/Config';
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { useHistory } from "react-router-dom";
import version from '../config/Version';
/*
* COMPONENT imports
*/
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
            const response = await API.get(config.URL_API_LOGIN, {
                auth: {
                    username: data.usuario,
                    password: data.password
                }
            });
            if(response.data.auth && response.data.token) {
                sessionStorage.setItem('jwtToken', response.data.token);
                history.push(config.URL_MENU_PRINCIPAL);
            }else {
                dispatch(setValidateMessage(true, `Datos de acceso incorrecto.`));
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `Datos de acceso incorrecto.`));
        } 
    };

    return (
        <Fragment>
            <Navbar className="justify-content-between" bg="primary" expand="md" variant="dark">
                <Navbar.Brand className="text-white">
                    <FontAwesomeIcon icon={faSuitcaseRolling} size="2x" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Form inline>
                    <h5 className="text-white">{version.APP} v{version.VERSION}</h5>
                </Form>
            </Navbar>        
            <Container id="container" className="my-5 w-50 h-auto">
                <HeaderComp />
                <Alert variant="primary">
                    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="loginUser">
                            <Form.Control 
                                name="usuario"
                                size="lg" 
                                type="text" 
                                placeholder="Ingrese usuario" 
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
                        <Button className="mt-2" size="lg" variant="primary" type="submit">Confirmar</Button>
                    </Form>
                </Alert>
            </Container>
            <div className="d-flex justify-content-center text-primary">
                <span style={{opacity: "0.1"}}><FontAwesomeIcon icon={faLuggageCart} size="3x" /></span> 
            </div>
        </Fragment>
    );
};

export default Login;