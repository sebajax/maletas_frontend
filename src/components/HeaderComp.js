import React, { Fragment } from 'react';
import { Breadcrumb, Alert} from 'react-bootstrap';

const HeaderComp = (props) => {
    
    const navItems = props.navItems;
    
    let listItems = navItems.map((navItem, index) => {
        if((index+1) === navItems.length) {
            return <Breadcrumb.Item active key={navItem.toString()}>{navItem}</Breadcrumb.Item>
        }else {
            return <Breadcrumb.Item href="/" key={navItem.toString()}>{navItem}</Breadcrumb.Item>
        }
    });

    return (
        <Fragment>
            <Breadcrumb>
                {listItems}
            </Breadcrumb>
            <h3 className="text-primary mb-4">{props.title}</h3>
            {props.validate.valid && <Alert variant={props.validate.variant} onClose={() => props.initValidate()} dismissible> {props.validate.message} </Alert>}

        </Fragment>
    );
}

export default HeaderComp;