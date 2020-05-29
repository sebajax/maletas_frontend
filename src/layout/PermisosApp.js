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
import SavePermisoComp from '../components/SavePermisoComp';
import QueryModalComp from '../components/QueryModalComp';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setQueryResults, cleanQueryResults } from '../redux/actions/QueryResultActions';
import { setPermisosReducer } from '../redux/actions/PermisosActions';

const PermisosApp = () => {

    //Layout states
    const result = useSelector(state => state.QueryResultReducer);
    const theme = useSelector(state => state.ThemeReducer);
    const permisos = useSelector(state => state.PermisosReducer);
    const [tbody, setTbody] = useState();
    const [editId, setEditId] = useState(null);
    const [show, setShow] = useState(false);
    const [createPerm, setCreatePerm] = useState(false);

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
    const handleCloseCreatePerm = () => setCreatePerm(false);
    const handleShowCreatePerm = () => setCreatePerm(true);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        let query = {}

        if(data.permisos_app) 
            query.permId = data.permisos_app;
        
        setUrl(config.URL_API_GET_PERMISOS);
        setQuery(query);
    };

    const handleDelete = async id => {
        let permiso = await getPermisoInfo(id);
        if(permiso) {
            if(permiso.data.permType !== "admin") {
                return handleShow(id);
            }else {
                dispatch(setValidateMessage(true, `prohibido eliminar admin`));
                return;
            }
        }else {
            dispatch(setValidateMessage(true, `${config.ERROR_SOLICITUD}`));
            return;
        }
    };

    const deletePerm = async () => {
        try {
            let res = await API.delete(config.URL_API_DELETE_PERMISO+show.id, config.API_TOKEN);     
            if(res) {
                let data = Object.assign([], result);
                data = data.filter(obj => {
                    return obj._id !== show.id;
                });
                let refreshPermisos = Object.assign([], permisos);
                refreshPermisos = refreshPermisos.filter(obj => {
                    return obj._id !== show.id;
                });
                dispatch(setPermisosReducer(refreshPermisos));
                dispatch(setQueryResults(data));
                handleClose();
                dispatch(setValidateMessage(true, res.data.message, 'success'));
            }else {
                dispatch(setValidateMessage(true, `Permiso inexistente`));
                return;
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${config.ERROR_SOLICITUD}`));
            return;
        };  
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
                            //updated Permiso - debe tener un permType
                            if(data[`permType_${id}`]) {
                                let updatedPermiso = {
                                    permType: data[`permType_${id}`].toLowerCase()
                                }
                                let response = await API.put(config.URL_API_UPDATE_PERMISO+id, updatedPermiso, config.API_TOKEN);
                                let res = Object.assign([], result);
                                let index = res.findIndex(element => element._id === id);
                                res[index].permType = updatedPermiso.permType;
                                let refreshPermisos = Object.assign([], permisos);
                                let indexPerm = refreshPermisos.findIndex(element => element._id === id);
                                refreshPermisos[indexPerm].permType = updatedPermiso.permType;
                                dispatch(setPermisosReducer(refreshPermisos));
                                dispatch(setQueryResults(res));
                                setEditId(null);
                                dispatch(setValidateMessage(true, response.data.message, 'success'));
                            }else {
                                dispatch(setValidateMessage(true, `${config.ERROR_SOLICITUD}`));
                                return;
                            }
                        }else {
                            dispatch(setValidateMessage(true, `prohibido modificar admin`));
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

    const savePermiso = async permiso => {
        try {
            if(Validate.isDefined(permiso.permType)) {
                let reqPerm = {
                    permType: permiso.permType.toLowerCase()
                }
                let newPermiso = await API.post(config.URL_API_SAVE_PERMISO, reqPerm, config.API_TOKEN);
                if(newPermiso) {
                    let data = Object.assign([], result);
                    data.push(newPermiso.data)
                    dispatch(setQueryResults(data));   
                    let refreshPermisos = Object.assign([], permisos);
                    refreshPermisos.push(newPermiso.data);
                    dispatch(setPermisosReducer(refreshPermisos));
                    handleCloseCreatePerm();
                    dispatch(setValidateMessage(true, `Permiso: ${newPermiso.permType} creado con exito!`, 'success'));
                }else {
                    dispatch(setValidateMessage(true, `${config.ERROR_SOLICITUD}`));
                    return;
                }
            }else {
                dispatch(setValidateMessage(true, `${config.ERROR_SOLICITUD}`));
                return;
            }
        }catch(err) {    
            dispatch(setValidateMessage(true, `${err} ${config.ERROR_SOLICITUD}`));
            return;
        };    
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
                            <Col className="mt-2" sm={10}><Button block type="button" variant={theme.style.btnSuccess} onClick={() => handleShowCreatePerm()} >Crear Perm</Button></Col>
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
            <SavePermisoComp
                createPerm={createPerm} 
                handleCloseCreatePerm={handleCloseCreatePerm} 
                savePermiso={savePermiso}
            />            
        </Fragment>
    );
};

export default PermisosApp;