import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const MenuItemComp = (props) => (
    <Fragment>
        <Navbar bg="dark" expand="md" variant="dark">
            <Navbar.Brand className="text-primary" href="/">
                <FontAwesomeIcon icon={faSuitcaseRolling} size="2x" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavDropdown active={props.eventKey === 1 ? true : false} title="Simulacion" id="nav-dropdown-simulacion">
                        <NavDropdown.Item id="IngresoSimulado" href="/IngresoSimulado"> Ingreso Simulado </NavDropdown.Item>
                        <NavDropdown.Item id="GastoSimulado" href="/GastoSimulado"> Gasto Simulado </NavDropdown.Item>
                        <NavDropdown.Item id="ConsultaSimulado"> Consulta Simulado </NavDropdown.Item>
                    </NavDropdown>                                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Fragment>
);

export default MenuItemComp;