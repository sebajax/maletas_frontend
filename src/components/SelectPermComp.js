/*
* Node Modules imports
*/
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import API from '../config/API';
import config from '../config/Config';
import { useDispatch } from 'react-redux';
/*
* REDUX Actions imports
*/
import { setValidateMessage } from '../redux/actions/HeaderActions';

const SelectPermComp = props => {

    const dispatch = useDispatch();
    const [permisos, setPermisos] = useState();
    
    useEffect(() => {
        const getPermisos = async () => {
            try {
                let res = await API.get(config.URL_API_GET_PERMISOS, config.API_TOKEN);
                if(res.data) {
                    let options = res.data.map((perm) => {
                        return <option value={perm._id} key={perm._id.toString()}>{perm.permType}</option>;
                    });  
                    setPermisos(options);
                }        
            }catch(err) {
                dispatch(setValidateMessage(true, `${err} ${config.SERVER_ERR_COM}`)); 
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
            {permisos}
        </Form.Control>
    );
};

export default SelectPermComp;