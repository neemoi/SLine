import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css';

function ProductDetailsNavigation({ goBack, categoryName, productName }) {
    return (
        <div className="mt-1 d-flex align-items-center">
            <Link to="/home" className="btn-link-custom">Главная страница</Link>
            <span className="mx-3">{'>'}</span>
            <Link to="/categories" className="btn-link-custom">Категории</Link>
            <span className="mx-3">{'>'}</span>
            <span className="btn-link-custom" onClick={goBack}>{categoryName}</span>
            <span className="mx-3">{'>'}</span>
            <span>{productName}</span>
        </div>
    );
}

export default ProductDetailsNavigation; 