import React from 'react';
import ProductCard from './ProductCard';

function AllProduct({ products, handleAllProductsClick }) {
    return (
        <div>
            <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center mt-4">
                {products.map(product => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
            <button className="btn btn-yellow mt-3" onClick={handleAllProductsClick}>Все товары</button>
        </div>
    );
}

export default AllProduct;