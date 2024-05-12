import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, itemsPerPage, totalItems, handlePageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <Pagination className="mt-5 justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default PaginationComponent;