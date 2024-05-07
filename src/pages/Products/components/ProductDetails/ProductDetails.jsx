import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ProductDetailsNavigation from '../../components/ProductDetails/ProductDetailsNavigation.jsx';
import AvailableStoresModal from '../../../Basket/components/CreateBasket/AvailableStoresModal.jsx';
import NavbarAuthModal from '../../../../components/Navbar/NavbarAuthModal.jsx';
import YandexMapModal from '../../../Profile/components/ModalMap/YandexMapModal.jsx';
import '../../styles/ProductDetails.css';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [stores, setStores] = useState([]);
    const [isInCart, setIsInCart] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMapModalOpen, setMapModalOpen] = useState(false); 

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    const fetchProductData = async () => {
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

            const priceResponse = await fetch(`https://localhost:7036/Catalog/Warehouse/${productId}`);
            const priceData = await priceResponse.json();
            setMinPrice(priceData.minPrice);
            setMaxPrice(priceData.maxPrice);

            const storesResponse = await fetch(`https://localhost:7036/Catalog/Stores/${productId}`);
            const storesData = await storesResponse.json();
            setStores(storesData);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const handleAddToCart = async (event) => {
        event.stopPropagation();
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;

        if (userId) {
            try {
                const response = await fetch(`https://localhost:7036/Profile/GetAllInfo?userId=${userId}`);
                
                if (response.ok) {
                    const data = await response.json();
                    const hasAddress = !!data.address;

                    if (hasAddress) {
                        openAvailableStoresModal();
                        setIsInCart(true);
                    } else {
                        openYandexMapModal();
                    }
                } else {
                    console.error('Error fetching user info:', response.status);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        } else {
            setShowAuthModal(true);
        }
    };

    const openAvailableStoresModal = () => {
        fetchStores();
        setIsModalOpen(true);
    };

    const openYandexMapModal = () => {
        setMapModalOpen(true);
    };
   
    const fetchStores = async () => {
        try {
            const response = await fetch(`https://localhost:7036/Basket/AvailableStores/${product.productId}`);
            if (response.ok) {
                const data = await response.json();
                setStores(data);
            } else {
                console.error('Failed to fetch stores:', response.status);
            }
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeMapModal = () => {
        setMapModalOpen(false); 
    };

    if (!product || minPrice === null || maxPrice === null) {
        return <div>Loading...</div>;
    }

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="container product-details-container mt-5">
            <ProductDetailsNavigation goBack={goBack} categoryName={categoryName} productName={productName} />
            <hr className="mt-1" />
            <h1 className="product-details-name mt-4">{product.productName}</h1>
            <div className="row">
                <div className="col-md-6 mt-5">
                    <div className="product-image-container mt-5">
                        <img src={atob(product.image)} className="product-image" alt={product.productName} />
                    </div>
                </div>
                <div className="col-md-6 mt-4 product-info-section">
                    <div className="product-info">
                        <div className="inner-block mt-5">
                            <div className="price-container d-flex">
                                <p className="price-line">{minPrice}р. - {maxPrice}р.</p>
                                <Button
                                    className={`btn rounded-pill w-30 ${isInCart ? 'btn-dark-orange' : 'btn-yellow'}`}
                                    onClick={handleAddToCart}
                                >
                                    {isInCart ? 'В корзине' : 'В корзину'}
                                </Button>
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
                            <div class="product-info-label">жиры</div>
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
                        <p>Срок годности: {product.shelfLife} дней</p>
                        <p>Условия хранения: {product.storageConditions}</p>
                        <p className="product-info-title">Производитель</p>
                        <p>{product.manufacturer}</p>
                    </div>
                </div>
            </div>
            
            <AvailableStoresModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                stores={stores}
            />

            <YandexMapModal
                isOpen={isMapModalOpen}
                onRequestClose={closeMapModal}
                onAddressSaved={openAvailableStoresModal}
            />

            <NavbarAuthModal
                show={showAuthModal}
                handleClose={() => setShowAuthModal(false)}
            />
        </div>
    );
}

export default ProductDetails;