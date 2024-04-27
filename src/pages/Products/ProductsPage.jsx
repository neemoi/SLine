import React, { useState } from 'react';
import ProductsCards from './components/Products/ProductsContainer.jsx';
import SubcategoryMenu from './components/Products/SubcategoryMenu.jsx';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductsPage() {
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

export default ProductsPage;