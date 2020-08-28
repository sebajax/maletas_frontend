// Node Modules imports
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Button, Form, Alert, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const SavePermisoComp = props => {
    const theme = useSelector(state => state.ThemeReducer);

    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        props.savePermiso(data);
    };

    return (
        <Modal show={props.createPerm} onHide={props.handleCloseCreatePerm}>
            <Modal.Header>
                <Modal.Title className={theme.style.modalTitle}>Agregar nuevo permiso a sistema</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
                    <Form.Group>
                        <Form.Control 
                            name="permType" 
                            type="text" 
                            placeholder="Agregar Permiso" 
                            ref={register({ required: true })} 
                        />
                        {errors.permType && <span message={"Debe ingresar un permiso valido."} />}
                    </Form.Group>                    
            </Modal.Body>
            <Modal.Footer className="w-100">
                <Alert className="w-100" variant={theme.style.bg}>
                    <div className={"d-flex flex-row-reverse"}>
                        <Col sm={4}><Button block type="submit" variant={theme.style.btnSuccess}>Agregar</Button></Col>
                        <Col sm={4}><Button block type="reset" variant={theme.style.btnCancel} onClick={props.handleCloseCreatePerm}>Cancelar</Button></Col>  
                    </div>
                </Alert>  
            </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default SavePermisoComp;