import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../Products/Navigation.jsx';
import ProductCard from '../Products/ProductCard.jsx';

function ProductsContainer({ searchTerm }) {
    const { subcategoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = `https://localhost:7036/Catalog/Subcategories/${subcategoryId}`;
                
                if (searchTerm) {
                    url = `https://localhost:7036/Catalog/Products/${encodeURIComponent(searchTerm)}`;
                }
                
                const productsResponse = await fetch(url);
                const productsData = await productsResponse.json();

                if (productsData.length > 0) {
                    setSubcategoryName(productsData[0].subcategoryName);

                    const categoryResponse = await fetch(`https://localhost:7036/Catalog/Categories`);
                    const categoryData = await categoryResponse.json();
                    const category = categoryData.find(cat => cat.subcategories.some(subcat => subcat.subcategoryId === parseInt(subcategoryId)));
                    
                    if (category) {
                        setCategoryName(category.categoryName);
                    }
                }

                const decodedProducts = productsData.map(product => ({
                    ...product,
                    image: atob(product.image)
                }));

                setProducts(decodedProducts);
            } catch (error) {
                console.error('Error receiving data:', error);
            }
        };

        fetchData();
    }, [subcategoryId, searchTerm]);

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container mt-3" id="all-products">
            <Navigation goBack={goBack} categoryName={categoryName} subcategoryName={subcategoryName} />
            <hr className="mt-1" />
            <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center mt-4">
                {products.map(product => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsContainer;