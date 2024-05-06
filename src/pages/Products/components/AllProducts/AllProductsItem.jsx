import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import ProductList from './ProductList';
import Pagination from './Pagination';
import ScrollButton from './ScrollButton';
import '../../styles/AllProducts.css';

function AllProductsItem() {
    const [products, setProducts] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('https://localhost:7036/Catalog/Products');
            const productsData = await response.json();
            const decodedProducts = productsData.map(product => ({
                ...product,
                image: atob(product.image),
            }));

            setProducts(decodedProducts);
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        setCurrentPage(1);
    };

    const getFilteredProducts = () => {
        return products.filter(product => 
            product.productName.toLowerCase().includes(searchInput.toLowerCase())
        );
    };

    const getPaginatedProducts = (filteredProducts) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        scrollToTop();
    };

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const filteredProducts = getFilteredProducts();
    const paginatedProducts = getPaginatedProducts(filteredProducts);

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
            <ProductList products={paginatedProducts} />
            <Pagination
                currentPage={currentPage}
                totalProducts={filteredProducts.length}
                pageSize={pageSize}
                onPageChange={handlePageChange}
            />
            <ScrollButton scrollToTop={scrollToTop} />
            <div className='allproduct-bottom'></div>
        </div>
    );
}

export default AllProductsItem;