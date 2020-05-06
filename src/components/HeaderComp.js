import React, { Fragment } from 'react';
import { Breadcrumb, Alert} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setValidateMessage } from '../redux/actions/HeaderActions';
import Validate from 'validate.js';

const HeaderComp = (props) => {
    
    const dispatch = useDispatch();
    let validate = useSelector(state => state.HeaderReducer);
    let navItems = (Validate.isDefined(props.navItems)) ? true : false; 
    let title = (Validate.isDefined(props.title)) ? true : false; 
    let listItems = "";
    
    if(navItems) {
        listItems = props.navItems.map((navItem, index) => {
            if((index+1) === props.navItems.length) {
                return <Breadcrumb.Item active key={navItem.toString()}>{navItem}</Breadcrumb.Item>
            }else {
                return <Breadcrumb.Item href="/" key={navItem.toString()}>{navItem}</Breadcrumb.Item>
            }
        });
    }

    return (
        <Fragment>
            {navItems 
                ?
                    <Breadcrumb>
                        {listItems}
                    </Breadcrumb>
                :
                    ""
            }
            {title ? <h3 className="text-primary mb-4">{props.title}</h3> : ""}
            {validate.valid && <Alert variant={validate.variant} onClose={() => dispatch(setValidateMessage())} dismissible> {validate.message} </Alert>}

        </Fragment>
    );
}

export default HeaderComp;