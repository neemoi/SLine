import React from 'react';
import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
    return (
        <div className="col-md-3 mb-3">
            <Link to={`/subcategory/${category.categoryId}`}>
                <div className="card">
                    <img src={category.categoryImage} className="card-img-top" alt={category.categoryName} />
                    <div className="card-img-overlay">
                        <p className="card-text">{category.categoryName}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CategoryCard;