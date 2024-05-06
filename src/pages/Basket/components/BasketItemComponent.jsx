import React, { useState, useEffect } from 'react';
import '../styles/BasketItem.css';

function BasketItemComponent({ item, storeId, onRemoveProduct, onUpdateQuantity, isRemoving }) {
    const imageUrl = atob(item.image);
    const productLink = `/product/${item.productId}`;

    const [quantityChange, setQuantityChange] = useState(false);

    const handleIncreaseQuantity = () => {
        onUpdateQuantity(storeId, item.productId, item.quantity + 1);
        setQuantityChange(true);
    };

    const handleDecreaseQuantity = () => {
        onUpdateQuantity(storeId, item.productId, item.quantity - 1);
        setQuantityChange(true);
    };

    useEffect(() => {
        if (quantityChange) {
            const timer = setTimeout(() => setQuantityChange(false), 300);
            return () => clearTimeout(timer);
        }
    }, [quantityChange]);

    return (
        <div className={`basket-item ${isRemoving ? 'animate__animated animate__fadeOut' : ''} ${quantityChange ? 'quantity-change-animation' : ''}`}>
            <img src={imageUrl} alt={item.productName} className="basket-product-image" />

            <div className="item-info">
                <a href={productLink} className="product-link">
                    <span className="product-basket-name">{item.productName}</span>
                </a>
                <p>Количество: {item.quantity} ш.</p>
                <p>Цена: {(item.price * item.quantity).toFixed(1)} р.</p>
            </div>

            <div className="item-actions">
                <div className="quantity-controls">
                    <button className="quantity-button" onClick={handleIncreaseQuantity}>
                        +
                    </button>
                    <span className={`quantity-value ${quantityChange ? 'quantity-change-animation' : ''}`}>
                        {item.quantity}
                    </span>
                    <button className="quantity-button" onClick={handleDecreaseQuantity}>
                        -
                    </button>
                </div>
                <button className="btn btn-outline-dark" onClick={() => onRemoveProduct(storeId, item.productId)}>
                    Убрать из корзины
                </button>
            </div>
        </div>
    );
}

export default BasketItemComponent;