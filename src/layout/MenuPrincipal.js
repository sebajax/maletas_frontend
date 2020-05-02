import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLuggageCart } from '@fortawesome/free-solid-svg-icons';
import MenuItemComp from '../componenets/MenuItemsComp';

const MenuPrincipal = () => (
  <Fragment>
        <MenuItemComp eventKey={0} />
        <Container id="container" className="p-2">
            <div className="d-flex justify-content-center text-primary" style={{paddingTop: "70px", fontSize: "34px"}}>
                <span style={{opacity: "0.1"}}><FontAwesomeIcon icon={faLuggageCart} size="10x" /></span> 
            </div>
        </Container>
    </Fragment>
);

export default MenuPrincipal;