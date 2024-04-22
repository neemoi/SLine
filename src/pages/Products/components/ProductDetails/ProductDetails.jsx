import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetailsNavigation from '../../components/ProductDetails/ProductDetailsNavigation.jsx';
import '../../styles/ProductDetails.css';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://localhost:7036/Catalog/Product/${productId}`);
                const productData = await response.json();
                
                setProduct(productData);
                setProductName(productData.productName); 

                const categoryResponse = await fetch(`https://localhost:7036/Catalog/Categories`);
                const categoryData = await categoryResponse.json();
                const category = categoryData.find(cat => cat.subcategories.some(subcat => subcat.subcategoryId === parseInt(productData.subcategoryId)));
                
                if (category) {
                    setCategoryName(category.categoryName);
                }
                
                const priceResponse = await fetch(`https://localhost:7036/Catalog/Products/Warhouse/${productId}`);
                const priceData = await priceResponse.json();
                setMinPrice(priceData.minPrice);
                setMaxPrice(priceData.maxPrice);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    if (!product || minPrice === null || maxPrice === null) {
        return <div>Loading...</div>;
    }

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container product-details-container mt-5">
            <ProductDetailsNavigation goBack={goBack} categoryName={categoryName}  productName={productName} />
            <hr className="mt-1" />
            <h1 className="product-name mt-4">{product.productName}</h1>
            <div className="row">
                <div className="col-md-6 mt-5">
                    <div className="product-image-container mt-5">
                        <img src={atob(product.image)} className="product-image" alt={product.productName} />
                    </div>
                </div>
                <div className="col-md-6 mt-4 product-info-section">
                    <div className="product-info">
                        <div className="inner-block mt-2">
                            <div className="price-container d-flex">
                                <p className="price-line">{minPrice}р. - {maxPrice}р.</p>
                                <button className="btn btn-primary">В корзину</button>
                            </div>
                        </div>
                        <h2 className='product-100-g mt-5'>На 100 граммов</h2>
                        <hr />
                        <div className="product-info-data">
                            <div className="product-info-item">
                                {product.calories}
                            </div>
                            <div className="product-info-item">
                                {product.proteins}
                            </div>
                            <div className="product-info-item">
                                {product.fats}
                            </div>
                            <div className="product-info-item">
                                {product.carbohydrates}
                            </div>
                        </div>
                        <div className="product-info-labels"> 
                            <div className="product-info-label">ккал</div>
                            <div className="product-info-label">белки</div>
                            <div className="product-info-label">жиры</div>
                            <div className="product-info-label">углеводы</div>
                        </div>
                    </div>
                    <div className="product-info">
                        <h2>О товаре</h2>
                        <hr className="mt-1" />
                        <p className="product-info-title">Описание</p>
                        <p>{product.description}</p>
                        <p className="product-info-title">Состав</p>
                        <p>{product.composition}</p>
                        <p className="product-info-title">Срок годности, условия хранения</p>
                        <p>Срок годности: {product.shelfLife} дней <p>Условия хранения: {product.storageConditions}</p></p>
                        <p className="product-info-title">Производитель</p>
                        <p>{product.manufacturer}</p>
                    </div> 
                    <div className="top"></div>
                </div>
            </div>
        </div>
    )    
}

export default ProductDetails;