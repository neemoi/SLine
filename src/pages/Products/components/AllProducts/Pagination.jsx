import React from 'react';

function Pagination({ currentPage, totalProducts, pageSize, onPageChange }) {
    const totalPages = Math.ceil(totalProducts / pageSize);

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    return (
        <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        <button
                            className={`page-link ${currentPage === index + 1 ? 'bg-orange' : ''}`}
                            style={{marginTop: '50px', marginBottom: '50px', color: 'black', backgroundColor: currentPage === index + 1 ? 'orange' : '' }}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;