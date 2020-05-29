// Node Modules imports
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import Validate from 'validate.js';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { SUCCESS, ERROR_SOLICITUD } from '../config/Messages';
import {
    URL_API_GET_USUARIOS,
    URL_API_DELETE_USUARIO,
    URL_API_GET_USUARIO_ID,

} from '../config/ConfigApiUsuarios';

// HOOKS imports
import useQueryApi from '../hooks/QueryApiHook';

// COMPONENT imports
import MenuItemComp from '../components/MenuItemsComp';
import QueryButtonsComp from '../components/QueryButtonsComp';
import HeaderComp from '../components/HeaderComp';
import SelectPermComp from '../components/SelectPermComp';
import DynamicTableComp from '../components/DynamicTableComp';
import QueryModalComp from '../components/QueryModalComp';
import PaginationComp from '../components/PaginationComp';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setQueryResults, cleanQueryResults } from '../redux/actions/QueryResultActions';

const ConsultaUsuarios = () => {
    const dispatch = useDispatch();    
    const result = useSelector(state => state.QueryResultReducer);
    const [tbody, setTbody] = useState();
    const [show, setShow] = useState(false);
    
    const [{isLoading}, {setQuery, setUrl}] = useQueryApi();
    const url = `${URL_API_GET_USUARIOS}1`
    let title = "Consulta Usuarios";
    let navItems = ["Admin", title];
    const USUARIO_INEXISTENTE = "Usuario inexistente";

    //Modal actions
    const handleClose = () => setShow({
        show: false,
        id: null
    });
    const handleShow = id => setShow({
        show: true,
        id: id
    });

    const { register, handleSubmit, control, setValue } = useForm();

    const thead = [
        "Usuario",
        "Nombre",
        "App Theme",
        "Perm",
        "Elim",
        "Modif",
        "V.Clave"
    ];

    const handlePage = clickedPage => setUrl(`${URL_API_GET_USUARIOS}${clickedPage}`);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        let query = {}

        if(data.nombre !== "")
            query.name = data.nombre;
        if(data.permisos_app) 
            query.permId = data.permisos_app;
        
        setUrl(url);
        setQuery(query);
    };

    const handleDelete = async id => {
        try {
            let res = await getUsuarioInfo(id);
            if(res) {
                return handleShow(id);
            }else {
                dispatch(setValidateMessage(true, USUARIO_INEXISTENTE));
                return;                
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
            return;
        }
    };

    const deleteUsuario = async () => {
        try {
            let res = await API.delete(URL_API_DELETE_USUARIO+show.id, API_TOKEN);     
            if(res) {
                let data = Object.assign({}, result);
                data.docs = data.docs.filter(obj => {
                    return obj._id !== show.id;
                });
                dispatch(setQueryResults(data));
                handleClose();
                dispatch(setValidateMessage(true, res.data.message, SUCCESS));
            }else {
                dispatch(setValidateMessage(true, USUARIO_INEXISTENTE));
                return;
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
            return;
        };    
    };

    const handleUpdate = async id => {
        
    };
/*
    const updateUsuario = async () => {

    }
*/
    const handleEmptyPass = async id => {

    };

    const getUsuarioInfo = async id => {
        try {
            return await API.get(URL_API_GET_USUARIO_ID+id, API_TOKEN);
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
            return;
        };
    };

    const handleChangePerm = value => setValue("permisos_app", value);

    useEffect(() => {
        dispatch(cleanQueryResults());
    }, [dispatch]);

    useEffect(() => {
        if(Validate.isDefined(result)) {
            if(Validate.isDefined(result.docs)) {
                let body = result.docs.map(element => {
                    return {
                        "id": element._id,
                        "user": element.user,
                        "name": element.name,
                        "appTheme": (element.config.appTheme) ? "Blue Theme" : "Black Theme",
                        "permType": (Validate.isDefined(element.config.permId)) ? element.config.permId.permType : "No Perm",
                        "update": "update",
                        "delete": "delete",
                        "emptyPass": "emptyPass"
                    };
                });
                setTbody(body);  
            }
        }
    }, [result]);

    return (
        <Fragment>
            <MenuItemComp eventKey={2} />
            <Container>
                <HeaderComp
                    navItems={navItems} 
                    title={title}                    
                />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="nombre">
                            <Form.Control type="text" name="nombre" placeholder="Nombre" ref={register()} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="permisos_app">
                            <Controller
                                as={<SelectPermComp handleChangePerm={handleChangePerm} />}
                                control={control}
                                name="permisos_app"
                            />
                        </Form.Group>
                    </Form.Row>
                    <QueryButtonsComp />
                </Form>
                {isLoading ? (
                    <Spinner animation="border" variant="primary" />
                ):(
                    <DynamicTableComp 
                        thead={thead} 
                        tbody={tbody}
                        handleDelete={handleDelete} 
                        handleUpdate={handleUpdate}
                        handleEmptyPass={handleEmptyPass}
                    />
                )}
                <PaginationComp handlePage={handlePage} />
            </Container>
            <QueryModalComp
                show={show} 
                handleClose={handleClose} 
                delete={deleteUsuario}
            />
        </Fragment>
    );
}

export default ConsultaUsuarios;