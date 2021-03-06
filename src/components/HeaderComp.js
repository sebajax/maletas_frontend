// Node Modules imports
import React, { Fragment } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Validate from 'validate.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// Config
import { SUCCESS } from '../config/Messages';

// COMPONENT imports
import { setValidateMessage } from '../redux/actions/HeaderActions';

const HeaderComp = props => {
    const dispatch = useDispatch();
    let validate = useSelector(state => state.HeaderReducer);
    let theme = useSelector(state => state.ThemeReducer);
    
    let navItems = (Validate.isDefined(props.navItems)) ? true : false; 
    let title = (Validate.isDefined(props.title)) ? true : false; 
    let listItems = "";
    let item = "";
    
    if(navItems) {
        listItems = props.navItems.map((navItem, index) => {
            if((index+1) === props.navItems.length)
                item = `\xa0 ${navItem.toString()}`;
            else 
                item = `\xa0 ${navItem.toString()} /`;

            return <Form.Label className={theme.style.breadCrumb} key={navItem.toString()}>{item}</Form.Label>
        });
    }

    if(validate.valid) {
        setTimeout(() => {
            dispatch(setValidateMessage());
        }, 4000)        
    };

    return (
        <Fragment>
            {navItems 
                ?
                    <Alert variant={theme.style.bg}>
                        {listItems}
                    </Alert>
                :
                    ""
            }
            {title ? <h3 className="text-primary mb-4">{props.title}</h3> : ""}
            {validate.valid && 
                <Fragment>
                    <Alert variant={validate.variant} onClose={() => dispatch(setValidateMessage())} dismissible> 
                        {validate.variant === SUCCESS ? 
                            <FontAwesomeIcon icon={faCheckCircle} /> 
                        : 
                            <FontAwesomeIcon icon={faExclamationCircle} />
                        }
                        <span className="ml-1"> {validate.message} </span>
                    </Alert>
                </Fragment>
            }

        </Fragment>
    );
}

export default HeaderComp;