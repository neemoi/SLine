import React from 'react';
import ProductsCardsBySubcategory from './components/ProductsCardsBySubcategory.jsx';
import SubcategoryMenu from './components/SubcategoryMenu.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function Products() {
    const { subcategoryId, categoryId } = useParams();
    
    return (
        <div className="container mt-5" id="all-products">
            <div className="row">
                <div className="col-md-4">
                    <SubcategoryMenu categoryId={categoryId} />
                </div>
                <div className="col-md-8">
                    <ProductsCardsBySubcategory subcategoryId={subcategoryId} />
                </div>
            </div>
        </div>
    );
}

export default Products;
