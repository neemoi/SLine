import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavbarAuthModal from '../../../../components/Navbar/NavbarAuthModal.jsx';
import AvailableStoresModal from '../../../Basket/components/AvailableStoresModal.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/ProductsContainer.css';

function ProductCard({ product }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [stores, setStores] = useState([]);
    const [priceRange, setPriceRange] = useState({ minPrice: null, maxPrice: null });
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const fetchPriceRange = async () => {
            try {
                const response = await fetch(`https://localhost:7036/Catalog/Warehouse/${product.productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setPriceRange({
                        minPrice: data.minPrice,
                        maxPrice: data.maxPrice,
                    });
                } else {
                    console.error('Failed to fetch price range:', response.status);
                }
            } catch (error) {
                console.error('Error fetching price range:', error);
            }
        };

        fetchPriceRange();
    }, [product.productId]);

    const handleOpenModal = (event) => {
        event.stopPropagation();
        fetchStores();
        setModalOpen(true);
    };

    const handleShowAuthModal = () => {
        setShowAuthModal(true);
    };

    const closeModal = () => {
        setModalOpen(false);
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

    const handleAddToCart = (event) => {
        event.stopPropagation();
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            if (user.address) {
                handleOpenModal(event);
                setIsInCart(true);
            } else {
                alert('Пожалуйста, добавьте адрес доставки в ваш профиль');
            }
        } else {
            handleShowAuthModal();
        }
    };

    return (
        <div className="col mb-3">
            <div className="card h-100 product-card">
                <Link to={`/product/${product.productId}`} className="card-link">
                    <div class="card-img-top-container">
                        <img src={product.image} className="card-img-top" alt={product.productName} />
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">{product.productName}</h2>
                        <h6 className="card-subtitle text-muted">Производитель: {product.manufacturer}</h6>
                    </div>
                </Link>

                <div className="card-body">
                    <h6 className="card-price">{`Цена: от ${priceRange.minPrice} до ${priceRange.maxPrice}р.`}</h6>
                    <Button
                        className={`btn rounded-pill w-100 ${isInCart ? 'btn-dark-orange' : 'btn-yellow'}`}
                        onClick={handleAddToCart}
                    >
                        {isInCart ? 'В корзине' : 'В корзину'}
                    </Button>
                </div>

                <AvailableStoresModal
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    stores={stores}
                />
                
                <NavbarAuthModal show={showAuthModal} handleClose={() => setShowAuthModal(false)} />
            </div>
        </div>
    );
}

export default ProductCard;