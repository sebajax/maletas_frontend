import React, { Fragment } from 'react';
import Pagination from 'react-bootstrap/Pagination'
import { useSelector } from 'react-redux';

const PaginationComp = props => {
    
    const result = useSelector(state => state.QueryResultReducer);

    const totalPages = (result) ? result.totalPages : 1;
    const page = (result) ? result.page : 1;
    const pageEllipsis = 7;
    const maximumPages = 20;

    const renderPagination = () => {
        let pageItems = []
        let total = 0;
        
        (totalPages > maximumPages) ? total = maximumPages : total = totalPages;
    
        for (let number = 1; number <= total; number++) {
            if(number === pageEllipsis) {
                pageItems.push(<Pagination.Ellipsis key={`page_ellipsis ${number}`} />);
                number = totalPages;
            }
            pageItems.push(
                <Pagination.Item key={number} active={number === page} onClick={() => props.handlePage(number)}>
                    {number}
                </Pagination.Item>
            );
        }
        return pageItems;
    };

    return (
        <Fragment>
        {(totalPages > 1) &&
            <Pagination>
                <Pagination.First key="first_page" onClick={() => props.handlePage(1)} />
                <Pagination.Prev key="prev_page" onClick={() => (page > 1) ? props.handlePage(page-1) : props.handlePage(1)} />
                {renderPagination()}
                <Pagination.Next key="next_page" onClick={() => (page === totalPages) ? props.handlePage(totalPages) : props.handlePage(page+1)} />
                <Pagination.Last key="last_page" onClick={() => props.handlePage(totalPages)} />
            </Pagination>
        }
        </Fragment>
    );
};

export default PaginationComp;