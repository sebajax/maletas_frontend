// Node Modules imports
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// Config
import API from '../config/API';
import { API_TOKEN } from '../config/ConfigToken';
import { SERVER_ERR_COM } from '../config/Messages';
import { URL_API_GET_PERMISOS } from '../config/ConfigApiPermisos';

// REDUX Actions imports
import { setValidateMessage } from '../redux/actions/HeaderActions';
import { setPermisosReducer } from '../redux/actions/PermisosActions';

const SelectPermComp = props => {
    const dispatch = useDispatch();
    const permisos = useSelector(state => state.PermisosReducer);
    
    useEffect(() => {
        const getPermisos = async () => {
            try {
                let res = await API.get(URL_API_GET_PERMISOS, API_TOKEN);
                if(res.data) {
                    dispatch(setPermisosReducer(res.data));
                }       
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} ${SERVER_ERR_COM}`)); 
            };
        };
        getPermisos();
    }, [dispatch]);

    return (
        <Form.Control 
            name="permisos_app"
            as="select" 
            onChange={e => props.handleChangePerm(e.target.value)}
            custom
        >
            <option value="">-Seleccione Permiso-</option>
            {(permisos) && permisos.map((perm) => {
                return <option value={perm._id} key={perm._id.toString()}>{perm.permType}</option>;
            })};
        </Form.Control>
    );
};

export default SelectPermComp;