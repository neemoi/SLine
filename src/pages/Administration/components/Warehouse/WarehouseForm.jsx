import React from 'react';
import { Modal, Form } from 'react-bootstrap';

const WarehouseForm = ({ show, onHide, currentWarehouse, stores, products, formErrors, handleInputChange, handleAddOrUpdateWarehouse }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{currentWarehouse.warehouseId === 0 ? 'Добавить склад' : 'Изменить склад'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="storeId">
                        <Form.Label>Магазин</Form.Label>
                        <Form.Control
                            as="select"
                            value={currentWarehouse.storeId}
                            onChange={e => handleInputChange('storeId', e.target.value)}
                            isInvalid={!!formErrors.storeId}
                        >
                            <option value="">Выберите магазин</option>
                            {stores.map(store => (
                                <option key={store.storeId} value={store.storeId}>
                                    {store.storeName}, {store.city}, {store.address}
                                </option>
                            ))}
                        </Form.Control>
                        {formErrors.storeId && <Form.Text className="text-danger">{formErrors.storeId}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="productId">
                        <Form.Label>Продукт</Form.Label>
                        <Form.Control
                            as="select"
                            value={currentWarehouse.productId}
                            onChange={e => handleInputChange('productId', e.target.value)}
                            isInvalid={!!formErrors.productId}
                        >
                            <option value="">Выберите продукт</option>
                            {products.map(product => (
                                <option key={product.productId} value={product.productId}>
                                    {product.productName}
                                </option>
                            ))}
                        </Form.Control>
                        {formErrors.productId && <Form.Text className="text-danger">{formErrors.productId}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="quantity">
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentWarehouse.quantity}
                            onChange={e => handleInputChange('quantity', e.target.value)}
                            isInvalid={!!formErrors.quantity}
                        />
                        {formErrors.quantity && <Form.Text className="text-danger">{formErrors.quantity}</Form.Text>}
                    </Form.Group>
                    <Form.Group controlId="productPrice">
                        <Form.Label>Цена продукта</Form.Label>
                        <Form.Control
                            type="number"
                            value={currentWarehouse.productPrice}
                            onChange={e => handleInputChange('productPrice', e.target.value)}
                            isInvalid={!!formErrors.productPrice}
                        />
                        {formErrors.productPrice && <Form.Text className="text-danger">{formErrors.productPrice}</Form.Text>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button variant="secondary" onClick={onHide} className='btn btn-outline-secondary'>
                    Отмена
                </button>
                <button variant="primary" onClick={handleAddOrUpdateWarehouse} className='btn btn-outline-warning'>
                    Сохранить
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default WarehouseForm;