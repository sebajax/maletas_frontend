/*
* Node Modules imports
*/
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Col, Spinner } from 'react-bootstrap';
import API from '../config/API';
import config from '../config/Config';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
/*
* HOOKS imports
*/
import useQueryApi from '../hooks/QueryApiHook';
/*
* COMPONENT imports
*/
import MenuItemComp from '../components/MenuItemsComp';
import QueryButtonsComp from '../components/QueryButtonsComp';
import HeaderComp from '../components/HeaderComp';
import SelectPermComp from '../components/SelectPermComp';
import DynamicTableComp from '../components/DynamicTableComp';
import QueryModalComp from '../components/QueryModalComp';
import PaginationComp from '../components/PaginationComp';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';

const ConsultaUsuarios = () => {

    //Layout states
    const [query, setQuery] = useState();
    const [actionId, setActionId] = useState();
    const [tbody, setTbody] = useState();
    const [modalInfo, setModalInfo] = useState();
    const [show, setShow] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = useState(1);
    
    const headers = config.API_TOKEN.headers;
    const queryConfig = {
        url: `${config.URL_API_GET_USUARIOS}${page}`,
        config: {
            headers,
            params: {
                q: {}
            }
        }
    };    
    
    const [{result, isLoading, render}, {setOptions, setRender}] = useQueryApi();
    const dispatch = useDispatch();
    let title = "Consulta Usuarios";
    let navItems = ["Admin", title];
    
    //Modal actions
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const handlePage = clickedPage => {
        console.log(clickedPage);
        let builder = query;
        builder.url = `${config.URL_API_GET_USUARIOS}${clickedPage}`;
        //setPage(clickedPage);
        setQuery(builder);
        setRender(!render);
    };

    const onSubmit = async (data, e) => {
        e.preventDefault();

        let builder = queryConfig;
       
        if(data.nombre !== "") {
            builder.config.params.q.name = data.nombre
        }

        if(data.permisos_app) {
            Object.assign(builder.config.params.q, data.permisos_app)
        }

        console.log(builder);
        //setPage(1);
        //setTotalPages(1);
        setQuery(builder);
    };

    const handleDelete = async id => {
        try {
            let res = await getUsuarioInfo(id);
            if(res) {
                setModalInfo(`¿ Esta seguro de eliminar al usuario ${res.data.user} ?`);
                setActionId(id);
                return handleShow();
            }else {
                dispatch(setValidateMessage(true, `Usuario inexistente`));
                return;                
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} Hubo un error al procesar su solicitud`));
            return;
        }
    };

    const deleteUsuario = async () => {
        try {
            let res = await API.delete(config.URL_API_DELETE_USUARIO+actionId, config.API_TOKEN);     
            if(res) {
                handleClose();
                setModalInfo(null);
                setActionId(null);
                setRender(!render);
                dispatch(setValidateMessage(true, res.data.message, 'success'));
                setTimeout(() => {
                    dispatch(setValidateMessage());
                }, 3000);
            }else {
                dispatch(setValidateMessage(true, `Usuario inexistente`));
                return;
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} Hubo un error al procesar su solicitud`));
            return;
        };    
    };

    const handleUpdate = () => {
        
    };

    const handleEmptyPass = () => {

    };

    const getUsuarioInfo = async id => {
        try {
            return await API.get(config.URL_API_GET_USUARIO_ID+id, config.API_TOKEN);                
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} Hubo un error al procesar su solicitud`));
            return;
        };
    };

    const handleChangePerm = value => {
        setValue("permisos_app", value);
    }

    useEffect(() => {
        console.log("Entre a hook");
        setOptions(query);
        if(result) {
            let body = result.docs.map(element => {
                return {
                    "id": element._id,
                    "user": element.user,
                    "name": element.name,
                    "appTheme": (element.config.appTheme) ? "Blue Theme" : "Black Theme",
                    "permType": element.config.permId.permType,
                    "update": "update",
                    "delete": "delete",
                    "emptyPass": "emptyPass"
                };
            });
            setTbody(body);   
            setPage(result.page);
            setTotalPages(result.totalPages);
        }
    }, [result, query, setOptions]);

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
                <PaginationComp page={page} totalPages={totalPages} handlePage={handlePage} />
            </Container>
            <QueryModalComp
                show={show} 
                handleClose={handleClose} 
                body={modalInfo} 
                delete={deleteUsuario}
            />
        </Fragment>
    );
}

export default ConsultaUsuarios;