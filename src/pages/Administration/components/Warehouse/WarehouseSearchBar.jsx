import React from 'react';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Поиск по названию товара" 
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="form-control"
                style={{ width: '1297px', display: 'inline-block', marginRight: '10px', marginBottom: '20px' }}
            />
        </div>
    );
};

export default SearchBar;