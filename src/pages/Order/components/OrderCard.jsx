import React from 'react';

function OrderCard({ order, canCancelOrder, onCancel, onShowModal }) {
    const getStatusColor = (statusName) => {
        switch (statusName) {
            case 'Сборка':
                return 'text-primary';
            case 'В пути':
                return 'text-warning';
            case 'Ожидает':
                return 'text-success';
            case 'Получен':
                return 'text-dark';
            default:
                return 'text-dark';
        }
    };

    return (
        <div key={order.orderId} className="order-card animate__animated animate__fadeIn mt-3">
            <div className="order-info">
                <div className="store-details">
                    <span className="store-name">{order.storeName}</span>
                    <span className="store-address">{order.storeAddress}, {order.storeCity}</span>
                </div>
                <div className="order-status">
                    <p className={getStatusColor(order.statusName)}>{order.statusName}</p>
                </div>
                <div className="order-details">
                    <p>Номер заказа: {order.orderId}</p>
                    <p>Дата заказа: {new Date(order.orderDate).toLocaleString()}</p>
                    <p>Стоимость заказа: {(order.totalPrice + order.deliveryPrice + order.commission).toFixed(2)} р.</p>
                    <p>{order.deliveryType === 'Пункт выдачи' ? 'Пункт выдачи:' : 'Адрес доставки:'} {order.deliveryType === 'Пункт выдачи' ? `${order.storeAddress}, ${order.storeCity}` : `${order.userAddress}`}</p>
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