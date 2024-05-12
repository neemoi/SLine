import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationControl = ({ totalPages, currentPage, handlePageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination className="mt-5 justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    );
};

export default PaginationControl;