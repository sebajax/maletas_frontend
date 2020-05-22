import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Button, Col, Alert } from 'react-bootstrap';

const QueryModalComp = props => {

    const theme = useSelector(state => state.ThemeReducer);

    return (
        <Modal show={props.show.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title className={theme.style.modalTitle}>Confirma eliminar registro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿ Esta seguro de realizar esta operación ?
            </Modal.Body>
            <Modal.Footer className="w-100">
                <Alert className="w-100" variant={theme.style.bg}>
                    <div className={"d-flex flex-row-reverse"}>
                        <Col sm={4}><Button block type="button" variant={theme.style.btnSuccess} onClick={props.delete}>Confirmar!!</Button></Col>
                        <Col sm={4}><Button block type="reset" variant={theme.style.btnCancel} onClick={props.handleClose}>Cancelar</Button></Col>  
                    </div>
                </Alert>  
            </Modal.Footer>
        </Modal>
    );
};

export default QueryModalComp;