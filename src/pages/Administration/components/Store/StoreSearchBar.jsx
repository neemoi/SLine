import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const StoreSearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <Form className="d-flex mb-3">
            <FormControl
                type="search"
                placeholder="Поиск по названию, городу или адресу"
                className="mr-2"
                aria-label="Search"
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
            />
        </Form>
    );
};

export default StoreSearchBar;