import React, { Fragment } from 'react';
import MenuItemComp from '../componenets/MenuItemsComp';
import FormButtonsComp from '../componenets/FormButtonsComp';
import { Jumbotron, Container } from 'react-bootstrap';
import BreadCrumComp from '../componenets/BreadCrumbComp';

const IngresoSimulado = () => {

    let navItems = ["Menu Simulado", "Ingreso Simulado"];

    return (
        <Fragment>
            <MenuItemComp />
            <Container>
                <BreadCrumComp navItems={navItems} />
                <Jumbotron>
                    <FormButtonsComp />
                </Jumbotron>
            </Container>
        </Fragment>
    );
}

export default IngresoSimulado;