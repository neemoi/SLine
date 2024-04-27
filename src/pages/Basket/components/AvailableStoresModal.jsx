import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import '../styles/AvailableStoresModal.css';

function AvailableStoresModal({ isModalOpen, closeModal, stores }) {
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [addressMissing, setAddressMissing] = useState(false);

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
      setAddressMissing(true);
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
        const data = await response.json();
        console.log('Продукт добавлен в корзину:', data);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || response.statusText);
      }
    } catch (error) {
      setErrorMessage(`Ошибка при добавлении товара в корзину: ${error.message}`);
    }
  };

  const handleCloseAlert = () => {
    setAddressMissing(false);
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal} dialogClassName="modal-custom">
      <Modal.Header closeButton>
        <Modal.Title>Выбор магазина</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {addressMissing && (
          <Alert variant="warning" onClose={handleCloseAlert} dismissible>
            Пожалуйста, укажите адрес доставки перед добавлением товара в корзину.
          </Alert>
        )}
        {stores.map((store) => (
          <div key={store.storeId} className="store-block">
            <div className="store-info mt-2">
              <h4>{store.storeName}</h4>
              <p className='store-price'>{store.productPrice}р</p>
            </div>
            <hr className='mt-0'></hr>
            <div className="store-details mt-3">
              <div className="section-block">
                <h5>Доставка</h5>
                <p>Время доставки: {store.deliveryTime}р.</p>
                <p>Цена доставки: {store.deliveryPrice}р.</p>
              </div>
              <div className="section-block">
                <h5>Местоположение</h5>
                <p>{store.city}, {store.address}</p>
              </div>
              <div className="section-block">
                <h5>Наличие на складе</h5>
                <p>Количество: {store.quantity}ш.</p>
              </div>
            </div>
            <div className="store-actions">
                <p>кол-во</p>
              <input
                type="number"
                min="1"
                value={selectedQuantities[store.storeId] || ''}
                onChange={(event) => handleQuantityChange(store.storeId, event)}
              />
              <Button variant="primary" onClick={() => handleAddToBasket(store)}>
                Заказать
              </Button>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AvailableStoresModal;