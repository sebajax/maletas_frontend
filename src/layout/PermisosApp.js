/*
* Node Modules imports
*/
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Col, Spinner, Alert, Button } from 'react-bootstrap';
import API from '../config/API';
import config from '../config/Config';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import Validate from 'validate.js';
/*
* HOOKS imports
*/
import useQueryApi from '../hooks/QueryApiHook';
/*
* COMPONENT imports
*/
import MenuItemComp from '../components/MenuItemsComp';
import HeaderComp from '../components/HeaderComp';
import SelectPermComp from '../components/SelectPermComp';
import DynamicTableComp from '../components/DynamicTableComp';
import QueryModalComp from '../components/QueryModalComp';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setQueryResults, cleanQueryResults } from '../redux/actions/QueryResultActions';

const PermisosApp = () => {

    //Layout states
    const result = useSelector(state => state.QueryResultReducer);
    const theme = useSelector(state => state.ThemeReducer);
    const [tbody, setTbody] = useState();
    const [editId, setEditId] = useState(null);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const [{isLoading}, {setQuery, setUrl}] = useQueryApi();

    const { handleSubmit, control, setValue } = useForm();

    let title = "Permisos App";
    let navItems = ["Admin", title];

    const thead = [
        "Permiso",
        "Elim",
        "Modif",
    ];

    //Modal actions
    const handleClose = () => setShow({
        show: false,
        id: null
    });
    const handleShow = id => setShow({
        show: true,
        id: id
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        let query = {}

        if(data.permisos_app) 
            query.permId = data.permisos_app;
        
        setUrl(config.URL_API_GET_PERMISOS);
        setQuery(query);
    };

    const handleDelete = async id => {
        return handleShow(id);      
    };

    const deletePerm = async () => {
        console.log(show.id);
    }

    const handleUpdate = async id => {
        setEditId(id);
    };

    const updateCancel = () => {
        setEditId(null);
    }

    const onUpdate = async (data, id) => {
        if(data) {
            if(id === editId) {
                try {
                    let permiso = await getPermisoInfo(id);
                    if(permiso) {
                        if(permiso.data.permType !== "admin") {
                            let response = await API.put(config.URL_API_UPDATE_PERMISO+id, {data}, config.API_TOKEN);
                            dispatch(setValidateMessage(true, response.data.message, 'success'));
                            let res = Object.assign([], result);
                            let index = res.findIndex(element => element._id === id);
                            res[index].permType = data.permType;
                            dispatch(setQueryResults(res));
                            setEditId(null);
                        }else {
                            dispatch(setValidateMessage(true, `${data.permType} prohibido modificar`));
                            return;
                        }
                    }else {
                        dispatch(setValidateMessage(true, `${config.ERROR_SOLICITUD}`));
                        return;
                    }
                }catch(err) {
                    dispatch(setValidateMessage(true, `${err}`));
                    return;
                };            
            }
        }
    };

    const handleChangePerm = value => {
        setValue("permisos_app", value);
    };

    const getPermisoInfo = async id => {
        try {
            return await API.get(config.URL_API_GET_PERMISO_ID+id, config.API_TOKEN);
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${config.ERROR_SOLICITUD}`));
            return;
        };
    };    

    useEffect(() => {
        dispatch(cleanQueryResults());
    }, [dispatch]);

    useEffect(() => {
        if(Validate.isDefined(result)) {
            if(Validate.isDefined(result.map)) {
                let body = result.map(element => {
                    return {
                        "id": element._id,
                        "permType": element.permType,
                        "update": "update",
                        "delete": "delete",
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
                        <Form.Group as={Col} controlId="permisos_app">
                            <Controller
                                as={<SelectPermComp handleChangePerm={handleChangePerm} />}
                                control={control}
                                name="permisos_app"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Alert className="w-100" variant={theme.style.bg}>
                        <div className={"d-md-inline-flex"}>
                            <Col className="mt-2" sm={10}><Button block type="submit" variant={theme.style.btnSuccess}>Consultar</Button></Col>
                            <Col className="mt-2" sm={10}><Button block type="button" variant={theme.style.btnSuccess}>Crear Perm</Button></Col>
                        </div>
                    </Alert>                    
                </Form>
                {isLoading ? (
                    <Spinner animation="border" variant="primary" />
                ):(
                    <DynamicTableComp
                        thead={thead}
                        tbody={tbody}
                        handleDelete={handleDelete} 
                        handleUpdate={handleUpdate}
                        updateCancel={updateCancel}
                        onUpdate={onUpdate}
                        editId={editId}
                    />
                )}
            </Container>
            <QueryModalComp
                show={show} 
                handleClose={handleClose} 
                delete={deletePerm}
            />
        </Fragment>
    );
};

export default PermisosApp;