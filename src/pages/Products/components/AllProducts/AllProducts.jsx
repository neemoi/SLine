import React, { useState, useEffect } from 'react';
import ProductCard from '../Products/ProductCard';
import '../../styles/AllProducts.css'; 

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch('https://localhost:7036/Catalog/Products');
                const productsData = await response.json();

                const decodedProducts = productsData.map(product => ({
                    ...product,
                    image: atob(product.image)
                }));

                setProducts(decodedProducts);
            } catch (error) {
                console.error('Error fetching all products:', error);
            }
        };

        fetchAllProducts();

        scrollToTop();
    }, []);

    useEffect(() => {
        const handleSearchSubmit = async () => {
            try {
                const response = await fetch(`https://localhost:7036/Catalog/Products/${encodeURIComponent(searchInput)}`);
                const searchData = await response.json();

                const decodedSearchData = searchData.map(product => ({
                    ...product,
                    image: atob(product.image)
                }));

                setProducts(decodedSearchData);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        handleSearchSubmit();
    }, [searchInput]);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="text-start">Все товары</h1>
                </div>
                <div className="col-md-4">
                    <div className="search-box mt-2">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                            placeholder="Введите название товара"
                            className="w-100"
                        />
                    </div>
                </div>
            </div>
            <hr className="mt-1" />
            <div className="row row-cols-1 row-cols-md-4 g-3 justify-content-center mt-4">
                {products.map(product => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
            <button className="btn-floating" onClick={scrollToTop}>
                <i className="fas fa-arrow-up"></i>
            </button>
            <div className='all-products-top'></div>
        </div>
    );
}

export default AllProducts;