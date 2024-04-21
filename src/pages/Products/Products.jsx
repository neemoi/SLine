import React, { useState } from 'react';
import ProductsCards from './components/ProductsCards.jsx';
import SubcategoryMenu from './components/SubcategoryMenu.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

function Products() {
    const { subcategoryId, categoryId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
    };
    
    return (
        <div className="container mt-5" id="all-products">
            <div className="row">
                <div className="col-md-4">
                    <SubcategoryMenu categoryId={categoryId} onSearchTermChange={handleSearchTermChange} />
                </div>
                <div className="col-md-8">
                    <ProductsCards subcategoryId={subcategoryId} searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    );
}

export default Products;
