import React, { useState, useEffect, useRef } from 'react';
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
    const pollingInterval = useRef(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    useEffect(() => {
        fetchOrders();

        pollingInterval.current = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => {
            clearInterval(pollingInterval.current);
        };
    }, [userId]);

    useEffect(() => {
        orders.forEach(order => {
            if (order.statusId !== 3) {
                // setInitialStatusUpdateTEST(order);
                scheduleStatusUpdate(order);
            }
        });
    }, [orders]);

    async function fetchOrders() {
        if (!user) {
            showNotification('Пожалуйста, войдите в систему, чтобы увидеть заказы');
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
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            showNotification('Произошла ошибка при загрузке заказов');
        }
    }

    // Special function for quick health check of order status updates
    // function setInitialStatusUpdateTEST(order) { 
    //     if (order.deliveryType === 'Курьер' && order.statusName === 'Сборка') {
    //         console.log(`Order ${order.orderId} is scheduled to update to 'В пути' in 20 seconds`);
    //         setTimeout(() => {
    //             updateOrderStatus(order.orderId, 2);
    //         }, 20000); // 20 sec
    //     }
        
    //     if (order.deliveryType === 'Пункт выдачи' && order.statusName === 'Сборка') {
    //         console.log(`Order ${order.orderId} is scheduled to update to 'Ожидает' in 10 seconds`);
    //         setTimeout(() => {
    //             updateOrderStatus(order.orderId, 3); 
    //         }, 10000); // 10 sec.
    //     }
    // }

    async function updateOrderStatus(orderId, statusId) {
        console.log(`Updating order ${orderId} to status ${statusId}`);
        try {
            const response = await fetch(`https://localhost:7036/Order/UpdateOrderStatus`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user ? user.token : ''}`,
                },
                body: JSON.stringify({ orderId, statusId })
            });

            if (response.ok) {
                setOrders(prevOrders => prevOrders.map(order => 
                    order.orderId === orderId ? { ...order, statusId } : order
                ));
                console.log(`Order ${orderId} status updated to ${statusId}`);
            } else {
                console.error('Error updating order status:', response.status);
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            showNotification('Произошла ошибка при обновлении статуса заказа');
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
                showNotification('Заказ отменен');
                setOrders(prevOrders => prevOrders.filter(order => order.orderId !== orderId));
            } else {
                console.error('Error canceling order:', response.status);
                showNotification('Ошибка при отмене заказа');
            }
        } catch (error) {
            console.error('Error canceling order:', error);
            showNotification('Произошла ошибка при отмене заказа');
        }
    }

    function scheduleStatusUpdate(order) {
        if (order.statusId === 3) {
            return;
        }

        const assemblyTime = (Math.random() * (10 - 8) + 8) * 60000; // 10min

        const deliveryTime = order.deliveryType === 'Курьер' ? order.deliveryTime * 60000 : 0;

        setTimeout(() => {
            const newStatusId = order.deliveryType === 'Курьер' ? 2 : 3; 
            updateOrderStatus(order.orderId, newStatusId);

            if (newStatusId === 2) {
                const deliveryCompletionTime = deliveryTime * (1 + 0.05 * (Math.random() * 2 - 1));
                setTimeout(() => {
                    updateOrderStatus(order.orderId, 3);
                }, deliveryCompletionTime);
            }
        }, assemblyTime);
    }

    function showNotification(message) {
        setNotification(message);
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 3000);
    }

    function canCancelOrder(orderDate) {
        const orderTime = new Date(orderDate).getTime();
        const currentTime = new Date().getTime();
        return currentTime - orderTime <= 600000; // 10 min
    }

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
                        Авторизуйтесь для просмотра заказов
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