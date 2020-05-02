import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const BreadCrumbComp = (props) => {
    
    const navItems = props.navItems;

    let listItems = navItems.map((navItem, index) => {
        if((index+1) === navItems.length) {
            return <Breadcrumb.Item active key={navItem.toString()}>{navItem}</Breadcrumb.Item>
        }else {
            return <Breadcrumb.Item href="/" key={navItem.toString()}>{navItem}</Breadcrumb.Item>
        }
    });

    return (
        <Breadcrumb>
            {listItems}
        </Breadcrumb>
    );
}

export default BreadCrumbComp