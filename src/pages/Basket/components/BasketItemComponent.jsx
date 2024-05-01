import React from 'react';
import '../styles/BasketItem.css';

function BasketItemComponent({ item, storeId, onRemoveProduct, onUpdateQuantity, isRemoving }) {
    return (
        <div className={`basket-item ${isRemoving ? 'animate__animated animate__fadeOut' : ''}`}>
            <div className="item-info">
                <p>{item.productName}</p>
                <p>Количество: {item.quantity} ш.</p>
                <p>Цена: {(item.price * item.quantity).toFixed(1)} р.</p>
            </div>
            <div className="item-actions">
                <div className="quantity-controls">
                    <button
                        className="quantity-button"
                        onClick={() => onUpdateQuantity(storeId, item.productId, item.quantity + 1)}
                    >
                        +
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                        className="quantity-button"
                        onClick={() => onUpdateQuantity(storeId, item.productId, item.quantity - 1)}
                    >
                        -
                    </button>
                </div>
                <button
                    className="btn btn-outline-dark"
                    onClick={() => onRemoveProduct(storeId, item.productId)}
                >
                    Убрать из корзины
                </button>
            </div>
        </div>
    );
}

export default BasketItemComponent;