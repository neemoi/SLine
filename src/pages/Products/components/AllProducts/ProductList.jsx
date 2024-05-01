import React from 'react';
import ProductCard from '../Products/ProductCard';

function ProductList({ products }) {
    return (
        <div className="row row-cols-1 row-cols-md-4 g-3 justify-content-center mt-4">
            {products.map(product => (
                <ProductCard key={product.productId} product={product} />
            ))}
        </div>
    );
}

export default ProductList;