import React from 'react';
import image from '../../../img/name6.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Categories.css';

function Categories() {
    return (
        <div className="container">
            <hr className="mt-5" />
            <div className="container" id="all-categories" style={{ marginTop: '50px' }}>
                <div className="row row-cols-1 g-3">
                    <div className="col">
                        <Link to='all-categories'>
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
                <div className="row">
                    {[...Array(8)].map((_, index) => (
                        <div className="col-md-3 mb-3" key={index}>
                            <Link to='categoty-name'>
                                <div className="card">
                                    <img src={image} className="card-img-top" alt="Категория" />
                                    <div className="card-img-overlay">
                                        <p className="card-text">Категория</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <hr style={{ marginTop: '20px' }} />
                </div>
            </div>
        </div>
    );
}

export default Categories;
