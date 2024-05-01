import React from 'react';
import 'animate.css';

function OrderCard({ order, canCancelOrder, onCancel }) {
    return (
        <div key={order.orderId} className="order-card animate__animated animate__fadeIn mt-3">
            <div className="order-info">
                <div className="store-details">
                    <span className="store-name">{order.storeName}</span>
                    <span className="store-address">{order.storeAddress}, {order.storeCity}</span>
                </div>
                <div className="order-status">
                    <p>{order.statusName}</p>
                </div>
                <div className="order-details">
                    <p>Дата заказа: {new Date(order.orderDate).toLocaleString()}</p>
                    <p>Стоимость заказа: {(order.totalPrice + order.deliveryPrice + order.commission).toFixed(2)} р.</p>
                    <p>Адрес доставки: {order.userAddress}</p>
                </div>
            </div>

            <div className="order-actions">
                {canCancelOrder(order.orderDate) && (
                    <button className="btn btn-outline-danger mt-3" onClick={() => onCancel(order.orderId)}>
                        Отменить заказ
                    </button>
                )}
            </div>
        </div>
    );
}

export default OrderCard;