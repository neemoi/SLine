import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from './CategoryList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../Main/styles/Categories.css';

function CategoriesItem() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:7036/Catalog/Categories');
                const data = await response.json();

                const categoriesWithUrls = data.map(category => ({
                    ...category,
                    categoryImage: hexToString(category.categoryImage)
                }));

                setCategories(categoriesWithUrls);
            } catch (error) {
                console.error('Error when getting categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const hexToString = hex => {
        const hexString = hex.toString(); 
        let result = '';
        for (let i = 0; i < hexString.length; i += 2) {
            result += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
        }
        return result;
    };

    return (
        <div className="container mt-5">
            <div className="mt-1 d-flex align-items-center">
                <Link to="/" className="btn btn-link">Главная страница</Link>
                <span className="mx-3">{'>'}</span>
                <Link to="/categories" className="btn btn-link">Категории</Link>
            </div>
            <hr className="mt-1" />
            <CategoryList categories={categories} />
        </div>
    );
}

export default CategoriesItem;