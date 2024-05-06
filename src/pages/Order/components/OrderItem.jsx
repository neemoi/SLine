import React, { useState, useEffect } from 'react';
import OrderList from './OrderList.jsx';
import OrderFilter from './OrderFilter.jsx';
import OrderNotification from './OrderNotification.jsx';
import { useSortedOrders } from '../scripts/hooks.js';
import 'animate.css';
import '../styles/OrderItem.css';

function OrderItem() {
    const [orders, setOrders] = useState([]);
    const [notification, setNotification] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState('desc');

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    async function fetchOrders() {
        if (!user) {
            setNotification('Пожалуйста, войдите в систему, чтобы увидеть заказы');
            showNotification();
            return;
        }
        
        try {
            const response = await fetch(`https://localhost:7036/Order/GetOrders/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user ? user.token : ''}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error(`Error fetching orders: ${response.status}`);
                setNotification('Ошибка при загрузке заказов');
                showNotification();
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setNotification('Произошла ошибка при загрузке заказов');
            showNotification();
        }
    }

    async function cancelOrder(orderId) {

        const confirmCancel = window.confirm('Вы уверены, что хотите отменить заказ?');
        if (!confirmCancel) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7036/Order/CancelOrder?orderId=${orderId}&userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user ? user.token : ''}`,
                },
            });

            if (response.ok) {
                setNotification('Заказ отменен');
                showNotification();
                fetchOrders();
            } else {
                console.error('Error canceling order:', response.status);
                setNotification('Ошибка при отмене заказа');
                showNotification();
            }
        } catch (error) {
            console.error('Error canceling order:', error);
            setNotification('Произошла ошибка при отмене заказа');
            showNotification();
        }
    }

    function showNotification() {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 3000);
    }

    function canCancelOrder(orderDate) {
        const orderTime = new Date(orderDate).getTime();
        const currentTime = new Date().getTime();
        return currentTime - orderTime <= 600000; //10 min
    }

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    const sortedOrders = useSortedOrders(orders, sortOrder);

    return (
        <div className="order-page animate__animated animate__fadeIn">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Заказы</h1>
                    </div>
                    <OrderFilter sortOrder={sortOrder} onSortChange={setSortOrder} />
                </div>
                <hr className="mt-1" />

                <OrderNotification notification={notification} isVisible={isNotificationVisible} />

                {sortedOrders.length === 0 && !user ? (
                    <div className="empty-orders">
                        Авторизуйтесь для просмотр заказов
                    </div>
                ) : sortedOrders.length === 0 ? (
                    <div className="empty-orders">
                        У вас нет заказов
                    </div>
                ) : (
                    <OrderList orders={sortedOrders} canCancelOrder={canCancelOrder} onCancel={cancelOrder} />
                )}
                <div className="orderitem-button"></div>
            </div>
        </div>
    );
}

export default OrderItem;