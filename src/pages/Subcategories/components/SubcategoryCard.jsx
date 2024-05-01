import React from 'react';
import { Link } from 'react-router-dom';

function SubcategoryCard({ subcategory, categoryId }) {
    return (
        <div key={subcategory.subcategoryId} className="col-md-3 mb-3">
            <Link to={`/products/${subcategory.subcategoryId}/${categoryId}`}> 
                <div className="card">
                    <img src={subcategory.subcategoryImage} className="card-img-top" alt={subcategory.subcategoryName} />
                    <div className="card-img-overlay">
                        <p className="card-text">{subcategory.subcategoryName}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SubcategoryCard;