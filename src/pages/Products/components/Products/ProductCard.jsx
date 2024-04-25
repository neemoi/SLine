import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProductsContainer.css';

function ProductCard({ product }) {
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        const fetchPriceRange = async () => {
            try {
                const response = await fetch(`https://localhost:7036/Catalog/Warehouse/${product.productId}`);
                const priceData = await response.json();

                if (priceData) {
                    const minPrice = priceData.minPrice;
                    const maxPrice = priceData.maxPrice;
                    setPriceRange(`Цена: от ${minPrice} до ${maxPrice}р.`);
                }
            } catch (error) {
                console.error('Error fetching price range:', error);
            }
        };

        fetchPriceRange();
    }, [product.productId]);

    return (
        <div className="col mb-3">
            <Link to={`/product/${product.productId}`} className="card h-100 product-card">
                <img src={product.image} className="card-img-top" alt={product.productName} />
                <div className="card-body">
                    <h2 className="card-title">{product.productName}</h2>
                    <h6 className="card-subtitle mb-3 text-muted">Производитель: {product.manufacturer}</h6>
                    <h6 className="card-price">{priceRange}</h6>
                    <button className="btn btn-yellow rounded-pill w-100 mb-1">В корзину</button>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;