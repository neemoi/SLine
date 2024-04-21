import React from 'react';
import '../styles/ProductsContainer.css';

function ProductCard({ product }) {
    return (
        <div className="col mb-3">
            <div className="card h-100 product-card">
                <img src={product.image} className="card-img-top" alt={product.productName} />
                <div className="card-body">
                    <h2 className="card-title">{product.productName}</h2>
                    <h6 className="card-subtitle mb-3 text-muted">Производитель: {product.manufacturer}</h6>
                    <h6 className="card-price">Цена: от 15 до 20р.</h6>
                    <button className="btn btn-yellow rounded-pill w-100 mb-1">В корзину</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
