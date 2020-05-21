import React, { useEffect, useState, Fragment } from 'react';
import Pagination from 'react-bootstrap/Pagination'

const PaginationComp = props => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log("Entre a hook pagination");

        let page = props.page;
        let totalPages = props.totalPages;
        let pageItems = []
        let total = 0;

        (totalPages > 20) ? total = 20 : total = totalPages;

        for (let number = 1; number <= total; number++) {
            if(number === 7) {
                pageItems.push(<Pagination.Ellipsis key={`page_ellipsis ${number}`} />);
                number = totalPages;
            }
            pageItems.push(
                <Pagination.Item key={number} active={number === page} onClick={() => props.handlePage(number)}>
                    {number}
                </Pagination.Item>
            );
        }
        setItems(pageItems);
    }, [props]);

    return (
        <Fragment>
        {(props.totalPages > 1) &&
            <Pagination>
                <Pagination.First key="first_page" onClick={() => props.handlePage(1)} />
                <Pagination.Prev key="prev_page" onClick={() => (props.page > 1) ? props.handlePage(props.page-1) : props.handlePage(1)} />
                {items}
                <Pagination.Next key="next_page" onClick={() => (props.page === props.totalPages) ? props.handlePage(props.totalPages) : props.handlePage(props.page+1)} />
                <Pagination.Last key="last_page" onClick={() => props.handlePage(props.totalPages)} />
            </Pagination>
        }
        </Fragment>
    );
};

export default PaginationComp;