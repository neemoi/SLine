import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css';

function ProductsNavigation({categoryName, subcategoryName }) {
    return (
        <div className="mt-1 d-flex align-items-center">
            <Link to="/" className="btn btn-link">Главная страница</Link>
            <span className="mx-3">{'>'}</span>
            <Link to="/categories" className="btn btn-link">Категории</Link>
            <span className="mx-3">{'>'}</span>
            <span className="mx-3">{subcategoryName}</span>
            <span className="mx-3">{'>'}</span>
            <span>{categoryName}</span>
        </div>
    );
}

export default ProductsNavigation;