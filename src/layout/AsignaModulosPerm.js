// Node Modules imports
import React, { Fragment, useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Validate from 'validate.js';

// Config
import modules from '../config/Modules';
import {
    URL_API_GET_AUTH_MODULES
} from '../config/ConfigApiPermisos';

// COMPONENT imports
import MenuItemComp from '../components/MenuItemsComp';
import HeaderComp from '../components/HeaderComp';
import DynamicTableComp from '../components/DynamicTableComp';
import AsignaModulosPermComp from '../components/AsignaModulosPermComp';

// HOOKS imports
import useQueryApi from '../hooks/QueryApiHook';

// REDUX Actions imports
import { setQueryResults, cleanQueryResults } from '../redux/actions/QueryResultActions';
import { setAuthModules } from '../redux/actions/AuthModulesActions';

const AsignaModulosPerm = () => {
    const dispatch = useDispatch();
    const result = useSelector(state => state.QueryResultReducer);
    const authModules = useSelector(state => state.AuthModulesReducer);
    const [tbody, setTbody] = useState();
    const [modalAsignaPerm, setModalAsignaPerm] = useState({
        show: false,
        id: null
    });
    const [{isLoading}, {setQuery, setUrl}] = useQueryApi();
    let title = "Asigna Modulos Perm";
    let navItems = ["Admin", title];

    //Modal actions
    const handleClose = () => setModalAsignaPerm({
        show: false,
        id: null
    });
    const handleShow = id => setModalAsignaPerm({
        show: true,
        id
    });

    const thead = [
        "Modulo",
        "Permisos",
        "Asignar",
    ];

    const handleAuthModule = id => {
        handleShow(id);
    };

    const authModulePermToString = permArray => {
        if (Validate.isArray(permArray)) {
            let permToString = "[ ";
            for(let obj of permArray) {
                permToString += obj.permType + ' ';
            }
            permToString += "]";        
            return permToString;       
        }else {
            return null;
        }
    }

    useEffect(() => {
        dispatch(cleanQueryResults());
        dispatch(setQueryResults([]));
    }, [dispatch]);

    useEffect(() => {
        setUrl(URL_API_GET_AUTH_MODULES);
        setQuery();
        dispatch(setAuthModules(result));
    }, [dispatch, result, setUrl, setQuery]);

    useEffect(() => {
        let permResult = null;
        let body = Object.keys(modules).map(key => {
            if(Validate.isDefined(authModules)) {
                if(Validate.isArray(authModules)) {
                    permResult = authModules.find(elemnt => elemnt.module === key);
                }
            }
            return {
                "id": (Validate.isDefined(permResult)) ? permResult.module : key,
                "module": key,
                "permType": (Validate.isDefined(permResult)) ? authModulePermToString(permResult.permId) : "",
                "authModule": "authModule",
            };
        });
        setTbody(body);
    }, [authModules]);

    return (
        <Fragment>
            <MenuItemComp eventKey={2} />
            <Container>
                <HeaderComp
                    navItems={navItems} 
                    title={title}                    
                />      
                {isLoading ? (
                    <Spinner animation="border" variant="primary" />
                ):(
                    <DynamicTableComp
                        thead={thead} 
                        tbody={tbody}
                        handleAuthModule={handleAuthModule}
                    />
                )}          
            </Container>
            <AsignaModulosPermComp
                modalAsignaPerm={modalAsignaPerm} 
                handleClose={handleClose}
            />
        </Fragment>
    )
}

export default AsignaModulosPerm;