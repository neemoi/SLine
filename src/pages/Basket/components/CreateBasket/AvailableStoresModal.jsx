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

    const fetchUserInfo = async () => {
        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;

        if (!user) {
            console.log('No user found in localStorage');
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
                const addressParts = address.split(',');

                if (addressParts.length > 0) {
                    const city = addressParts[0].trim();
                    setUserCity(city);
                }
            }
        } catch (error) {
            console.log(`Error loading user data: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userCity && stores.length > 0) {
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
        const value = parseInt(event.target.value, 10);
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [storeId]: value > 0 ? value : 1,
        }));
    };

    const handleAddToBasket = async (store) => {
        const quantity = selectedQuantities[store.storeId] || 1;
        if (quantity > store.quantity) {
            setErrorMessage(`Количество товара превышает доступное количество (${store.quantity} шт.)`);
            return;
        }

        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;

        if (!user) {
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

                    {errorMessage && (
                        <Alert variant="warning mt-3">{errorMessage}</Alert>
                    )}

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
                                <div className="count-actions mt-3">
                                    <input
                                        type="number"
                                        min="1"
                                        value={selectedQuantities[store.storeId] || 1}
                                        onChange={(event) => handleQuantityChange(store.storeId, event)}
                                    />
                                </div>
                                <div className="store-actions mt-2">
                                    <Button variant="primary" onClick={() => handleAddToBasket(store)}>
                                        Заказать
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button variant="secondary" className='btn btn-outline-secondary' onClick={closeModal}>
                        Закрыть
                    </button>
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
