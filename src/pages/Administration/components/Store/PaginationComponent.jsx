import React from 'react';
import { Pagination, Container } from 'react-bootstrap';

const PaginationComponent = ({ totalPages, currentPage, handlePageChange }) => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Pagination>{items}</Pagination>
        </Container>
    );
};

export default PaginationComponent;