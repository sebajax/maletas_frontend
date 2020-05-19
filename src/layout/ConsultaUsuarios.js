/*
* Node Modules imports
*/
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import API from '../config/API';
import config from '../config/Config';
import { useDispatch } from 'react-redux';
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

const ConsultaUsuarios = () => {
    const [query, setQuery] = useState();
    const [tbody, setTbody] = useState();
    const dispatch = useDispatch();
    const cookies = new Cookies();
    let token = cookies.get('jwtToken');
    let title = "Consulta Usuarios";
    let navItems = ["Admin", title];

    const thead = [
        "Usuario",
        "Nombre",
        "App Theme",
        "Perm",
        "Elim",
        "Modif",
        "V.Clave"
    ];

    const queryFormation = () => {
        let body = query.map(element => {
            return {
                "_id": element._id,
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
    };

    useEffect(() => {
        console.log("ENTRE A HOOK");
        const getUsuarios = async () => {
            try {
                let res = await API.get(config.URL_API_GET_USUARIOS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setQuery(res.data);
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} Hubo un error al procesar su solicitud`));
            }
        }       
        getUsuarios();
    }, [dispatch, token]);

    return (
        <Fragment>
            <MenuItemComp eventKey={2} />
            <Container>
                <HeaderComp
                    navItems={navItems} 
                    title={title}                    
                />
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control type="nombre" placeholder="Nombre" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <SelectPermComp token={cookies.get('jwtToken')} />
                        </Form.Group>
                    </Form.Row>
                    <QueryButtonsComp handleClick={queryFormation} />
                </Form>
                <DynamicTableComp thead={thead} tbody={tbody} />
            </Container>
        </Fragment>
    );
}

export default ConsultaUsuarios;