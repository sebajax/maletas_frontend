/*
* Node Modules imports
*/
import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import config from '../config/Config';
import Cookies from 'universal-cookie';
import API from '../config/API';
/*
* REDUX Actions imports
*/
import { changeTheme } from '../redux/actions/ThemeActions';
import { setValidateMessage } from '../redux/actions/HeaderActions';
/*
* COMPONENT imports
*/
import CambiarClaveModalComp from './CambiarClaveModalComp';

const MenuItemComp = (props) => {
    
    const history = useHistory();
    const cookies = new Cookies();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ThemeReducer);

    const handleSignOut = () => {
        cookies.remove('jwtToken', '/');
        sessionStorage.clear();
        dispatch({type: 'USER_LOGGED_OUT'});
        history.push('/');
    };

    const handleThemeChange = async () => {
        let data = { 
            "appTheme": (theme.theme) ? false : true,
        };
        try {
            await API.put(config.URL_API_UPDATE_THEME+sessionStorage.getItem('userId'), {data}, {
                headers: {
                    Authorization: `Bearer ${cookies.get('jwtToken')}`
                }
            });
            dispatch(changeTheme());
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} (No es posible conectarse al servidor)`)); 
        };
    };

    return (
        <Fragment>
            <Navbar bg={theme.style.bg} expand="md" variant={theme.style.variant}>
                <Navbar.Brand className={theme.style.text} as={Link} to={config.URL_MENU_PRINCIPAL}>
                    <FontAwesomeIcon icon={faSuitcaseRolling} size="2x" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown active={props.eventKey === 1 ? true : false} title="Simulacion" id="nav-dropdown-simulacion">
                            <NavDropdown.Item id="IngresoSimulado" as={Link} to={config.URL_INGRESO_SIMULADO}>Ingreso Simulado</NavDropdown.Item>
                            <NavDropdown.Item id="GastoSimulado"> Gasto Simulado </NavDropdown.Item>
                            <NavDropdown.Item id="ConsultaSimulado"> Consulta Simulado </NavDropdown.Item>
                        </NavDropdown>                                    
                    </Nav>
                    <OverlayTrigger
                        key="user_trigger_bottom"
                        placement="bottom"
                        overlay={
                            <Tooltip id="user_trigger">
                                Usuario conectado <strong>{sessionStorage.getItem('user')}</strong>
                            </Tooltip>
                        }
                    >
                        <Button variant="default" onClick={handleShow}>
                            <FontAwesomeIcon className={theme.style.text} icon={faUser} size="2x" />
                        </Button>  
                    </OverlayTrigger>                  
                    <Form inline>
                        <BootstrapSwitchButton 
                            size="sm"
                            onlabel="-"
                            offlabel="-"
                            checked={theme.theme}
                            onstyle="outline-light" 
                            offstyle="outline-primary"
                            onChange={handleThemeChange} 
                        />
                        <Button variant="default" onClick={handleSignOut}>
                            <FontAwesomeIcon className={theme.style.text} icon={faSignOutAlt} size="2x" />
                        </Button>  
                    </Form>                  
                </Navbar.Collapse>
            </Navbar>
            <CambiarClaveModalComp show={show} handleClose={handleClose} />
        </Fragment>
    );
}

export default MenuItemComp;