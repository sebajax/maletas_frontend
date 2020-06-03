// Node Modules imports
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Button, Form, Alert, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import Validate from 'validate.js';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { SERVER_ERR_COM, ERROR_SOLICITUD, SUCCESS } from '../config/Messages';
import { 
    URL_API_GET_PERMISOS,
    URL_API_SAVE_AUTH_MODULE
} from '../config/ConfigApiPermisos';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setAuthModules } from '../redux/actions/AuthModulesActions';

const AsignaModulosPermComp = props => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ThemeReducer);
    const authModules = useSelector(state => state.AuthModulesReducer);
    const [perm, setPerm] = useState(null);
    const modulePerms = (Validate.isArray(authModules)) ? authModules.find(obj => obj.module === props.modalAsignaPerm.id) : null;
    
    const { register, handleSubmit } = useForm({
        mode: 'onChange',
    });

    const onSubmit = async (data, e) => {
        e.preventDefault();
        props.handleClose();
        let res = [];
        if(data) {
            for(const prop in data) {
                if(data[prop])
                    res.push(prop);
            }
        }

        try{
            let resAuthModule = await API.post(URL_API_SAVE_AUTH_MODULE+props.modalAsignaPerm.id, res, API_TOKEN);
            if(resAuthModule) {
                dispatch(setAuthModules(resAuthModule.data));
                dispatch(setValidateMessage(true, `AuthModule: ${props.modalAsignaPerm.id} - permisos asignados con exito!`, SUCCESS));
            }
        }catch(err) {
            dispatch(setValidateMessage(true, `${err} ${ERROR_SOLICITUD}`));
        };
    };

    const formCheckedElement = _id => {
        if(Validate.isDefined(modulePerms)) {
            if(Validate.isArray(modulePerms.permId)) {
                if(Validate.isDefined(modulePerms.permId.find(perm => perm._id === _id)))
                    return true;
            }
        }
        return false;
    };

    useEffect(() => {
        const getAuthModule = async () => {
            try {
                let resPerm = await API.get(URL_API_GET_PERMISOS, API_TOKEN);
                (resPerm.data) ? setPerm(resPerm.data) : setPerm(null);
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} ${SERVER_ERR_COM}`));
            };
        };
        if(props.modalAsignaPerm.id) getAuthModule();
    }, [dispatch, props.modalAsignaPerm.id]);

    return (
        <Modal show={props.modalAsignaPerm.show} onHide={() => props.handleClose()}>
            <Modal.Header>
                <Modal.Title className={theme.style.modalTitle}>Asignar permiso a {props.modalAsignaPerm.id} </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                {(perm) && perm.map(element => {
                    if(formCheckedElement(element._id))
                        return <Form.Check name={element._id} ref={register()} defaultChecked label={element.permType} type="checkbox" key={element._id} />
                    else 
                        return <Form.Check name={element._id} ref={register()} label={element.permType} type="checkbox" key={element._id} />
            })}
            </Modal.Body>
            <Modal.Footer className="w-100">
                <Alert className="w-100" variant={theme.style.bg}>
                    <div className={"d-flex flex-row-reverse"}>
                        <Col sm={4}><Button block type="submit" variant={theme.style.btnSuccess}>Agregar</Button></Col>
                        <Col sm={4}><Button block type="button" variant={theme.style.btnCancel} onClick={() => props.handleClose()}>Cerrar</Button></Col>  
                    </div>
                </Alert>
            </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AsignaModulosPermComp;