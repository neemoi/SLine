import React from 'react';

function Pagination({ currentPage, totalProducts, pageSize, onPageChange }) {
    const totalPages = Math.ceil(totalProducts / pageSize);
    const maxPagesToShow = 20;

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <button
                            className={`page-link ${currentPage === page ? 'bg-orange' : ''}`}
                            style={{ marginTop: '50px', marginBottom: '50px', color: 'black', backgroundColor: currentPage === page ? 'orange' : '' }}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;