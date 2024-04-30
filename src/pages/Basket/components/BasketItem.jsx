import React, { useState, useEffect } from 'react';
import OrderModal from './OrderModal';
import 'animate.css';
import '../styles/BasketItem.css';

function BasketItem() {
    const [groupedItems, setGroupedItems] = useState({});
    const [notification, setNotification] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [removingProductId, setRemovingProductId] = useState(null);
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

    async function updateQuantityWithCheck(storeId, productId, quantity) {
        try {
            const response = await fetch(`https://localhost:7036/Catalog/Warehouse/${storeId}/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const stockQuantity = data.quantity;

                if (quantity > stockQuantity) {
                    setNotification(`Невозможно добавить больше ${stockQuantity} единиц товара в корзину`);
                    showNotification();
                    return;
                }

                if (quantity < 1) {
                    setNotification('Невозможно уменьшить количество товара до нуля');
                    showNotification();
                    return;
                }

                const requestBody = {
                    userId,
                    productId,
                    storeId,
                    quantity,
                };

                const updateResponse = await fetch(`https://localhost:7036/Basket/UpdateQuantity`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(requestBody),
                });

                if (updateResponse.ok) {
                    fetchBasketItems();
                } else {
                    console.error('Error updating quantity:', updateResponse.status);
                    setNotification('Ошибка при обновлении количества товара');
                    showNotification();
                }
            } else {
                console.error('Error fetching stock:', response.status);
                setNotification('Ошибка при получении данных о складе');
                showNotification();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            setNotification('Произошла ошибка при обновлении количества товара');
            showNotification();
        }
    }

    async function removeProduct(storeId, productId) {
        setRemovingProductId(productId);

        try {
            const item = groupedItems[storeId].items.find(i => i.productId === productId);
            const maxQuantity = item ? item.quantity : 0;

            const requestBody = {
                userId,
                productId,
                storeId,
                quantity: maxQuantity,
            };

            const response = await fetch(`https://localhost:7036/Basket/RemoveProduct`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                fetchBasketItems();
                setNotification('Товар удален из корзины.');
                showNotification();
            } else {
                console.error('Error removing product:', response.status);
                setNotification('Ошибка при удалении товара из корзины');
                showNotification();
            }
        } catch (error) {
            console.error('Error removing product:', error);
            setNotification('Произошла ошибка при удалении товара из корзины');
            showNotification();
        }

        setRemovingProductId(null);
    }

    async function removeBasket() {
        const confirmRemove = window.confirm('Вы уверены, что хотите полностью очистить корзину?');
        if (!confirmRemove) {
            return;
        }

        try {
            const response = await fetch(`https://localhost:7036/Basket/RemoveBasket/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                fetchBasketItems();
                setNotification('Корзина очищена');
                showNotification();
            } else {
                console.error('Error removing basket:', response.status);
                setNotification('Ошибка при очистке корзины');
                showNotification();
            }
        } catch (error) {
            console.error('Error removing basket:', error);
            setNotification('Произошла ошибка при очистке корзины');
            showNotification();
        }
    }

    useEffect(() => {
        fetchBasketItems();
    }, []);

    function isRemoving(productId) {
        return removingProductId === productId;
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

    const isBasketEmpty = Object.keys(groupedItems).length === 0;

    return (
        <div className="basket-page animate__animated animate__fadeIn">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Корзина</h1>
                    </div>
                    <div className="col-md-6 text-end">
                        <button className="btn btn-outline-danger mt-2" onClick={removeBasket}>
                            Очистить корзину
                        </button>
                    </div>
                </div>
                <hr className="mt-1" />

                {notification && (
                    <div
                        className={`notification ${isNotificationVisible ? '' : 'hidden'}`}
                    >
                        {notification}
                    </div>
                )}

                {isBasketEmpty && (
                    <div className="empty-basket-notification">
                        Корзина пуста
                    </div>
                )}

                {Object.keys(groupedItems).map(storeId => (
                    <div key={storeId} className="store-section animate__animated animate__fadeInUp">
                       <div className="store-header">
                            <h1 className="store-name">
                                {groupedItems[storeId].storeName}
                                <span className="store-address">
                                    {groupedItems[storeId].city ? ` ${groupedItems[storeId].city},` : ''}{groupedItems[storeId].address}
                                </span>
                            </h1>
                            <button className="order-button" onClick={() => openModal(storeId)}>
                                Заказать
                            </button>
                        </div>
                        <hr className="section-divider" />

                        {groupedItems[storeId].items.map((item, index) => (
                            <React.Fragment key={item.itemId}>
                                <div className={`basket-item ${isRemoving(item.productId) ? 'animate__animated animate__fadeOut' : ''}`}>
                                    <div className="item-info">
                                        <p>{item.productName}</p>
                                        <p>Количество: {item.quantity} ш.</p>
                                        <p>Цена: {(item.price * item.quantity).toFixed(1)} р.</p>
                                    </div>
                                    <div className="item-actions">
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-button"
                                                onClick={() => updateQuantityWithCheck(storeId, item.productId, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button
                                                className="quantity-button"
                                                onClick={() => updateQuantityWithCheck(storeId, item.productId, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => removeProduct(storeId, item.productId)}
                                        >
                                            Убрать из корзины
                                        </button>
                                    </div>
                                </div>
                                {index < groupedItems[storeId].items.length - 1 && (
                                    <hr className="section-divider" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}

                {isModalOpen && (
                    <OrderModal
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