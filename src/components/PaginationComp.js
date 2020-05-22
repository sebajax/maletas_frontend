import React, { Fragment } from 'react';
import Pagination from 'react-bootstrap/Pagination'
import { useSelector } from 'react-redux';

const PaginationComp = props => {
    
    const result = useSelector(state => state.QueryResultReducer);

    const totalPages = (result) ? result.totalPages : 1;
    const page = (result) ? result.page : 1;
    const pageEllipsis = 8;
    const startIndex = (page > 3) ?  (page - 3) : 1;

    const renderPagination = () => {
        let pageItems = []
        let indexEllipsis = 1;
    
        for (let number = startIndex; number <= totalPages; number++) {
            if(indexEllipsis === pageEllipsis) {
                pageItems.push(<Pagination.Ellipsis key={`page_ellipsis ${number}`} />);
                number = totalPages;
                indexEllipsis = 1;
            }
            pageItems.push(
                <Pagination.Item key={number} active={number === page} onClick={() => props.handlePage(number)}>
                    {number}
                </Pagination.Item>
            );
            indexEllipsis++;
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