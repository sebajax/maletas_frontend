/*
* Node Modules imports
*/
import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling, faUser } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import config from '../config/Config';

/*
* REDUX Actions imports
*/
import { setTheme } from '../redux/actions/ThemeActions';

import CambiarClaveModalComp from './CambiarClaveModalComp';

const MenuItemComp = (props) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const dispatch = useDispatch();
    let theme = useSelector(state => state.ThemeReducer);

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
                                Usuario conectado <strong> COCO </strong>
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
                            onChange={() => {dispatch(setTheme())}} 
                        />
                    </Form>                  
                </Navbar.Collapse>
            </Navbar>
            <CambiarClaveModalComp show={show} handleClose={handleClose} />
        </Fragment>
    );
}

export default MenuItemComp;