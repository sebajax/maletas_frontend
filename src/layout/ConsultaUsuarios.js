/*
* Node Modules imports
*/
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import API from '../config/API';
import config from '../config/Config';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
/*
* COMPONENT imports
*/
import MenuItemComp from '../components/MenuItemsComp';
import QueryButtonsComp from '../components/QueryButtonsComp';
import HeaderComp from '../components/HeaderComp';
import SelectPermComp from '../components/SelectPermComp';
import DynamicTableComp from '../components/DynamicTableComp';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';
import QueryModalComp from '../components/QueryModalComp';

const ConsultaUsuarios = () => {
    const [data, setData] = useState({});
    const [queryAction, setQueryAction] = useState({});
    const [tbody, setTbody] = useState();
    const [modalInfo, setModalInfo] = useState();
    const [actionId, setActionId] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const cookies = new Cookies();
    let token = cookies.get('jwtToken');
    let title = "Consulta Usuarios";
    let navItems = ["Admin", title];
    let modalBody = "";

    const thead = [
        "Usuario",
        "Nombre",
        "App Theme",
        "Perm",
        "Elim",
        "Modif",
        "V.Clave"
    ];

    const { register, handleSubmit, control, setValue } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        let builder = {};
        if(data.nombre !== "")
            builder = {
                "name": data.nombre
            };
        if(data.permisos_app)
            builder = {
                "config.permId": data.permisos_app
            };
        setData(builder);
    };

    const handleDelete = async id => {
        try {
            let res = await getUsuarioInfo(id);
            if(res) {
                modalBody = `¿ Esta seguro de eliminar al usuario ${res.data.user} ?`;
                setModalInfo(modalBody);
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
            let res = await API.delete(config.URL_API_DELETE_USUARIO+actionId, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });     
            if(res) {
                handleClose();
                setModalInfo(null);
                setActionId(null);
                setQueryAction();
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
            return await API.get(config.URL_API_GET_USUARIO_ID+id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });                
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} Hubo un error al procesar su solicitud`));
            return;
        };
    };

    const handleChangePerm = value => {
        setValue("permisos_app", value);
    }

    useEffect(() => {
        console.log("ENTRE");
        const getUsuarios = async () => {
            try {
                let res = await API.post(config.URL_API_GET_USUARIOS, {data}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                let body = res.data.map(element => {
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
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} Hubo un error al procesar su solicitud`));
            }
        }       
        getUsuarios();
    }, [dispatch, token, data, queryAction]);

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
                                as={<SelectPermComp token={cookies.get('jwtToken')} handleChangePerm={handleChangePerm} />}
                                control={control}
                                name="permisos_app"
                            />
                        </Form.Group>
                    </Form.Row>
                    <QueryButtonsComp />
                </Form>
                <DynamicTableComp 
                    thead={thead} 
                    tbody={tbody}
                    handleDelete={handleDelete} 
                    handleUpdate={handleUpdate}
                    handleEmptyPass={handleEmptyPass}
                />
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