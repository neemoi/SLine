import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/ProductsCardBySubcategory.css'; 

function ProductsCards() {
    const { subcategoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetch(`https://localhost:7036/Catalog/Subcategories/${subcategoryId}`);
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
    }, [subcategoryId]);

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container mt-3" id="all-products">
            <div className="mt-1 d-flex align-items-center">
                <Link to="/" className="btn btn-link">Главная страница</Link>
                <span className="mx-3">{'>'}</span>
                <Link to="/" className="btn btn-link">Категории</Link>
                <span className="mx-3">{'>'}</span>
                <button className="btn btn-link" onClick={goBack}>{subcategoryName}</button>
                <span className="mx-3">{'>'}</span>
                <span>{categoryName}</span>
            </div>
            <hr className="mt-1" />
            <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center mt-4">
                {products.map(product => (
                    <div key={product.productId} className="col mb-3">
                        <div className="card h-100 product-card">
                            <img src={product.image} className="card-img-top" alt={product.productName} />
                            <div className="card-body">
                                <h2 className="card-title">{product.productName}</h2>
                                <h6 className="card-subtitle mb-3 text-muted">Производитель: {product.manufacturer}</h6>
                                <h6 className="card-price">Цена: от 15 до 20р.</h6>
                                <button className="btn btn-yellow rounded-pill w-100 mb-2">В корзину</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsCards;
