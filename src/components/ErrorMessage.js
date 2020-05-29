// Node Modules imports
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';

const ErrorMessage = props => (
    <div className="d-flex flex-row">
        <Alert className="p-1" variant="danger">
            <FontAwesomeIcon icon={faExclamationCircle} />
            <span className="ml-1">{props.message}</span>
        </Alert>   
    </div>
);

export default ErrorMessage;