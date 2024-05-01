import React from 'react';
import OrderCard from './OrderCard';

function OrderList({ orders, canCancelOrder, onCancel }) {
    return (
        <div className="orders-grid">
            {orders.map((order) => (
                <OrderCard
                    key={order.orderId}
                    order={order}
                    canCancelOrder={canCancelOrder}
                    onCancel={onCancel}
                />
            ))}
        </div>
    );
}

export default OrderList;