import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
    const pagesToShow = 10; 
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const handleNextPages = () => {
        if (endPage < totalPages) {
            const nextPage = Math.min(totalPages, endPage + pagesToShow);
            handlePageChange(nextPage);
        }
    };

    const handlePrevPages = () => {
        if (startPage > 1) {
            const prevPage = Math.max(1, startPage - pagesToShow);
            handlePageChange(prevPage);
        }
    };

    return (
        <Pagination className="mt-5 justify-content-center">
            <Pagination.Prev onClick={handlePrevPages} />
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <Pagination.Item
                    key={startPage + i}
                    active={startPage + i === currentPage}
                    onClick={() => handlePageChange(startPage + i)}
                >
                    {startPage + i}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNextPages} />
        </Pagination>
    );
};

export default PaginationComponent;