import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navigation.css';

function Navigation({ goBack, categoryName, subcategoryName }) {
    return (
        <div className="mt-1 d-flex align-items-center">
            <Link to="/" className="btn btn-link">Главная страница</Link>
            <span className="mx-3">{'>'}</span>
            <Link to="/" className="btn btn-link">Категории</Link>
            <span className="mx-3">{'>'}</span>
            <button className="btn btn-link" onClick={goBack}>{subcategoryName}</button>
            <span className="mx-3">{'>'}</span>
            <span>{categoryName}</span>
        </div>
    );
}

export default Navigation;