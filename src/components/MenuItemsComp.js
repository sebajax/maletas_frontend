// Node Modules imports
import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, NavDropdown, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import Validate from 'validate.js';

// Config
import ROUTES from '../config/Routes';
import { API_TOKEN } from '../config/ConfigToken';
import API from '../config/API';
import { SERVER_ERR_COM } from '../config/Messages';
import { URL_API_UPDATE_THEME } from '../config/ConfigApiUsuarios';
import { URL_API_GET_MODULES_ACCESS } from '../config/ConfigApiPermisos';
import modules from '../config/Modules';

// COMPONENT imports
import CambiarClaveModalComp from './CambiarClaveModalComp';

// REDUX Actions imports
import { changeTheme } from '../redux/actions/ThemeActions';
import { setValidateMessage } from '../redux/actions/HeaderActions';

const MenuItemComp = props => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ThemeReducer);
    const authModules = useSelector(state => state.AuthModulesReducer);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [access, setAccess] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleSignOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch({type: 'USER_LOGGED_OUT'});
        history.push('/');
    };

    const handleThemeChange = async () => {
        let data = { 
            "appTheme": (theme.theme) ? false : true,
        };
        try {
            await API.put(URL_API_UPDATE_THEME+sessionStorage.getItem('userId'), {data}, API_TOKEN);
            dispatch(changeTheme());
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${SERVER_ERR_COM}`)); 
        };
    };

    useEffect(() => {
        console.log("ENTRE A MENU HOOK");
        const getModulesAccess = async () => {
            try {
                if(sessionStorage.getItem("permId")) {
                    const resAccess = await API.get(`${URL_API_GET_MODULES_ACCESS}${sessionStorage.getItem("permId")}`, API_TOKEN);
                    if(Validate.isDefined(resAccess.data)) {
                        setAccess(resAccess.data);
                    }
                }
            }catch(err) {
                setAccess([]);
            }
        };
        getModulesAccess();  
    }, [authModules]);

    return (
        (access.includes(modules.HOME.toUpperCase())) &&
            <Fragment>
                <Navbar collapseOnSelect bg={theme.style.bg} expand="md" variant={theme.style.variant}>
                    <Navbar.Brand className={theme.style.text} as={Link} to={ROUTES.PATH_HOME}>
                        <FontAwesomeIcon icon={faSuitcaseRolling} size="2x" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="menu-items">
                        <Nav className="mr-auto">
                            {(access.includes(modules.SIMULACION.toUpperCase())) &&
                                <NavDropdown active={props.eventKey === 1 ? true : false} title={modules.SIMULACION} id="nav-dropdown-simulacion">
                                    <NavDropdown.Item id="IngresoSimulado" as={Link} to={ROUTES.PATH_SIMULACION_INGRESO_SIMULADO}> Ingreso Simulado</NavDropdown.Item>
                                    <NavDropdown.Item id="GastoSimulado"> Gasto Simulado </NavDropdown.Item>
                                    <NavDropdown.Item id="ConsultaSimulado"> Consulta Simulado </NavDropdown.Item>
                                </NavDropdown>
                            }
                            {(access.includes(modules.ADMIN.toUpperCase())) &&
                                <NavDropdown active={props.eventKey === 2 ? true : false} title={modules.ADMIN} id="nav-dropdown-admin">
                                    <NavDropdown.Item id="CrearUsuario" as={Link} to={ROUTES.PATH_ADMIN_CREAR_USUARIO}> Crear Usuario</NavDropdown.Item>
                                    <NavDropdown.Item id="ConsultaUsuarios" as={Link} to={ROUTES.PATH_ADMIN_CONSULTA_USUARIOS}> Consulta Usuarios </NavDropdown.Item>
                                    <NavDropdown.Item id="PermisosApp" as={Link} to={ROUTES.PATH_ADMIN_PERMISOS_APP}> Permisos App </NavDropdown.Item>
                                    <NavDropdown.Item id="AsignaModulosPerm" as={Link} to={ROUTES.PATH_ADMIN_ASIGNA_MODULOS_PERM}> Asigna Modulos Perm </NavDropdown.Item>
                                    <NavDropdown.Item id="AppLogs"> App Logs </NavDropdown.Item>
                                </NavDropdown>
                            }
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