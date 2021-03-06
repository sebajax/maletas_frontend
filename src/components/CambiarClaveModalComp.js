// Node Modules imports
import React from 'react';
import { Modal } from 'react-bootstrap';

// COMPONENT imports
import FormButtonsComp from './FormButtonsComp';

const CambiarClaveModalComp = props => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-primary"> Cambiar Clave Usuario - {sessionStorage.getItem('user')} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer className="w-100">
                <FormButtonsComp />
            </Modal.Footer>
        </Modal>
    );
};

export default CambiarClaveModalComp;