import React, { Fragment } from 'react';
import { Alert, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const QueryButtonsComp = (props) => {

    const theme = useSelector(state => state.ThemeReducer);

    return (
        <Fragment>
            <Alert className="w-100" variant={theme.style.bg}>
                <div className={"d-md-inline-flex"}>
                    <Col sm={5}><Button block type="button" variant={theme.style.btnSuccess} onClick={props.handleClick}>Consultar</Button></Col>
                    <Col sm={5}><Button block type="reset" variant={theme.style.btnSuccess}>Imprimir</Button></Col>
                    <Col sm={5}><Button block type="button" variant={theme.style.btnSuccess}>XLS</Button></Col>
                    <Col sm={5}><Button block type="button" variant={theme.style.btnSuccess}>JSON</Button></Col>
                </div>
            </Alert>
        </Fragment>
    );
};

export default QueryButtonsComp;