import React, { useState, useEffect } from 'react';
import CreateOrderModal from '../../Order/components/CreateOrderModal.jsx';
import BasketNotification from './BasketNotification.jsx';
import BasketStoreSection from './BasketStoreSection.jsx';
import { updateQuantityWithCheck, removeProduct, removeBasket, isRemoving } from '../scripts/basketUtils.js';
import 'animate.css';
import '../styles/BasketItem.css';

function BasketItem() {
    const [groupedItems, setGroupedItems] = useState({});
    const [notification, setNotification] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;

    async function fetchBasketItems() {
        try {
            const response = await fetch(`https://localhost:7036/Basket/BasketItems?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const filteredData = data.filter(item => !item.isOrdered);

                const grouped = {};
                filteredData.forEach(item => {
                    const storeId = item.storeId;

                    if (!grouped[storeId]) {
                        grouped[storeId] = {
                            storeName: item.storeName,
                            address: item.address,
                            city: item.city,
                            items: []
                        };
                    }

                    grouped[storeId].items.push(item);
                });

                setGroupedItems(grouped);
            } else {
                console.error('Error fetching basket items:', response.status);
            }
        } catch (error) {
            console.error('Error fetching basket items:', error);
        }
    }

    function showNotification() {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    }

    function openModal(storeId) {
        setSelectedStoreId(storeId);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setSelectedStoreId(null);
    }

    useEffect(() => {
        fetchBasketItems();
    }, []);

    const isBasketEmpty = Object.keys(groupedItems).length === 0;

    return (
        <div className="basket-page animate__animated animate__fadeIn">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Корзина</h1>
                    </div>
                    <div className="col-md-6 text-end">
                        <button className="btn btn-outline-danger mt-2" onClick={() => removeBasket(userId, user, setNotification, showNotification, fetchBasketItems)}>
                            Очистить корзину
                        </button>
                    </div>
                </div>
                <hr className="mt-1" />

                <BasketNotification notification={notification} isNotificationVisible={isNotificationVisible} />

                {isBasketEmpty && (
                    <div className="empty-basket-notification">
                        Корзина пуста
                    </div>
                )}

                {Object.keys(groupedItems).map(storeId => (
                    <BasketStoreSection
                        key={storeId}
                        storeId={storeId}
                        groupedItems={groupedItems}
                        onRemoveProduct={(storeId, productId) => removeProduct(user, userId, groupedItems, storeId, productId, setNotification, showNotification, fetchBasketItems)}
                        onUpdateQuantity={(storeId, productId, quantity) => updateQuantityWithCheck(user, userId, storeId, productId, quantity, setNotification, showNotification, fetchBasketItems)}
                        isRemoving={productId => isRemoving(storeId, productId)}
                        openModal={openModal}
                    />
                ))}

                {isModalOpen && (
                    <CreateOrderModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        storeId={selectedStoreId}
                        groupedItems={groupedItems}
                        userId={userId}
                    />
                )}
            </div>
            <div className='basket-buttom'></div>
        </div>
    );
}

export default BasketItem;