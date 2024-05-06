import React, { useState, useEffect } from 'react';
import { Modal, Button, Alert, ToastContainer, Toast } from 'react-bootstrap';
import '../../styles/AvailableStoresModal.css';

function AvailableStoresModal({ isModalOpen, closeModal, stores }) {
    const [sortedStores, setSortedStores] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('price');
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [userCity, setUserCity] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;

            if (!user) {
                return;
            }

            try {
                const response = await fetch(`https://localhost:7036/Profile/GetAllInfo?userId=${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const address = data.address || '';
                    const cityMatch = address.match(/,\s*([^,]+),/);
                    const city = cityMatch ? cityMatch[1].trim() : null;

                    if (city) {
                        setUserCity(city);
                    }
                } else {
                    const errorData = await response.json();
                    console.log(`Error loading user data: ${errorData.message}`);
                }
            } catch (error) {
                console.log(`Error loading user data: ${error.message}`);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userCity) {
            const storesInUserCity = stores.filter(store =>
                store.city.trim().toLowerCase() === userCity.trim().toLowerCase()
            );
    
            if (storesInUserCity.length === 0) {
                setErrorMessage('В вашем городе нет магазинов с этим товаром(');
            } else {
                setErrorMessage(null);
            }
    
            let sortedStores = [...storesInUserCity];
            switch (sortCriterion) {
                case 'price':
                    sortedStores.sort((a, b) => a.productPrice - b.productPrice);
                    break;
                case 'deliveryTime':
                    sortedStores.sort((a, b) => a.deliveryTime - b.deliveryTime);
                    break;
                case 'deliveryPrice':
                    sortedStores.sort((a, b) => a.deliveryPrice - b.deliveryPrice);
                    break;
                case 'quantity':
                    sortedStores.sort((a, b) => b.quantity - a.quantity);
                    break;
                default:
                    break;
            }
    
            setSortedStores(sortedStores);
        }
    }, [sortCriterion, stores, userCity]);

    const handleQuantityChange = (storeId, event) => {
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [storeId]: event.target.value,
        }));
    };

    const handleAddToBasket = async (store) => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;

        const quantity = parseInt(selectedQuantities[store.storeId] || 1, 10);

        if (!user || !user.address) {
            return;
        }

        const requestData = {
            userId: user.id,
            productId: store.productId,
            quantity,
            storeId: store.storeId,
        };

        try {
            const response = await fetch('https://localhost:7036/Basket/AddProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                setShowToast(true);

                setTimeout(() => {
                    closeModal();
                }, 1000);
            } else {
                const errorData = await response.json();
                console.log(`Error adding item to basket: ${errorData.message}`);
            }
        } catch (error) {
            console.log(`Error when adding an item to the basket: ${error.message}`);
        }
    };

    const handleSortChange = (event) => {
        setSortCriterion(event.target.value);
    };

    return (
        <>
            <Modal show={isModalOpen} onHide={closeModal} dialogClassName="modal-custom">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="sorting-controls mt-4">
                            <h5 className="stores">Магазины вашего города</h5>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select value={sortCriterion} onChange={handleSortChange} className="sort-dropdown">
                        <option value="price">Цена</option>
                        <option value="deliveryTime">Время доставки</option>
                        <option value="deliveryPrice">Цена доставки</option>
                        <option value="quantity">Количество</option>
                    </select>

                    {errorMessage && <Alert variant="warning mt-3">{errorMessage}</Alert>}

                    <div className="store-list mt-4">
                        {sortedStores.map((store) => (
                            <div key={store.storeId} className="store-block">
                                <div className="store-info mt-2">
                                    <h4>{store.storeName}</h4>
                                    <p className="store-price">{store.productPrice}р</p>
                                </div>
                                <hr className="mt-0" />
                                <div className="store-details mt-3">
                                    <div className="section-block-delivery">
                                        <h5>Доставка</h5>
                                        <p>Время доставки: {store.deliveryTime}ч</p>
                                        <p>Цена доставки: {store.deliveryPrice}р</p>
                                    </div>
                                    <div className="section-block">
                                        <h5>Местоположение</h5>
                                        <p>{store.city}, {store.address}</p>
                                    </div>
                                    <div className="section-block">
                                        <h5>Наличие на складе</h5>
                                        <p>Количество: {store.quantity}шт</p>
                                    </div>
                                </div>
                                <div className="count-actions">
                                    <input
                                        type="number"
                                        min="1"
                                        value={selectedQuantities[store.storeId] || 1}
                                        onChange={(event) => handleQuantityChange(store.storeId, event)}
                                    />
                                </div>
                                <div className="store-actions">
                                    <Button variant="primary" onClick={() => handleAddToBasket(store)}>
                                        Заказать
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="bottom-end"
                className="custom-toast-container"
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide className="custom-toast">
                    <Toast.Body>Товар успешно добавлен в корзину</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default AvailableStoresModal;