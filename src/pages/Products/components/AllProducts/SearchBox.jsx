import React from 'react';

function SearchBox({ searchInput, handleSearchInputChange }) {
    return (
        <div className="search-box mt-4">
            <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder="Введите название товара"
                className="w-100"
            />
        </div>
    );
}

export default SearchBox;