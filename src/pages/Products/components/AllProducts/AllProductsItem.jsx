import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import ProductList from './ProductList';
import ScrollButton from './ScrollButton';
import '../../styles/AllProducts.css';

function AllProductsItem() {
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
                <div className="col-md-8 mt-3">
                    <h1 className="text-start">Все товары</h1>
                </div>
                <div className="col-md-4">
                    <SearchBox
                        searchInput={searchInput}
                        handleSearchInputChange={handleSearchInputChange}
                    />
                </div>
            </div>
            <hr className="mt-1" />
            <ProductList products={products} />
            <ScrollButton scrollToTop={scrollToTop} />
            <div className='all-products-top'></div>
        </div>
    );
}

export default AllProductsItem;