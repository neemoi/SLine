import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../../../img/name6.png'; 
import '../styles/Categories.css';

function Categories() {
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

    const splitIntoRows = (arr, size) => {
        const rows = [];
        for (let i = 0; i < arr.length; i += size) {
            rows.push(arr.slice(i, i + size));
        }
        return rows;
    };

    return (
        <div className="container">
            <hr className="mt-5" />
            <div className="container" id="all-categories" style={{ marginTop: '50px' }}>
                <div className="row row-cols-1 g-3">
                    <div className="col">
                        <Link to='/all-categories'>
                            <div className="card">
                                <img src={image} className="card-img-top" alt="Все товары" />
                                <div className="card-img-overlay">
                                    <p className="card-text">Все товары</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container" id="categories">
                {splitIntoRows(categories, 4).map((row, index) => (
                    <div className="row justify-content-center" key={index}>
                        {row.map((category, idx) => (
                            <div className="col-md-3 mb-3" key={idx}>
                                <Link to={`/category/${category.categoryId}`}>
                                    <div className="card">
                                        <img src={category.categoryImage} className="card-img-top" alt={category.categoryName} />
                                        <div className="card-img-overlay">
                                            <p className="card-text">{category.categoryName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;
