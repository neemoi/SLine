import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css';

function ProductDetailsNavigation({categoryName, productName }) {
    return (
        <div className="mt-1 d-flex align-items-center">
            <Link to="/" className="btn-link-custom">Главная страница</Link>
            <span className="mx-4">{'>'}</span>
            <Link to="/categories" className="btn-link-custom">Категории</Link>
            <span className="mx-3">{'>'}</span>
            <span className="mx-1">{categoryName}</span>
            <span className="mx-3">{'>'}</span>
            <span>{productName}</span>
        </div>
    );
}

export default ProductDetailsNavigation; 