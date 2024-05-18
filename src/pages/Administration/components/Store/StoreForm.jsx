import React from 'react';
import { Modal, Form } from 'react-bootstrap';

const StoreForm = ({ show, onHide, currentStore, chains, formErrors, handleInputChange, handleAddOrUpdateStore }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{currentStore.storeId === 0 ? 'Добавить магазин' : 'Изменить магазин'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formStoreName">
                        <Form.Label>Название магазина</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentStore.storeName}
                            onChange={e => handleInputChange('storeName', e.target.value)}
                            isInvalid={!!formErrors.storeName}
                            style={{ width: '100%' }}
                        />
                        <Form.Control.Feedback type="invalid">{formErrors.storeName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>Город</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentStore.city}
                            onChange={e => handleInputChange('city', e.target.value)}
                            isInvalid={!!formErrors.city}
                            style={{ width: '100%' }}
                        />
                        <Form.Control.Feedback type="invalid">{formErrors.city}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentStore.address}
                            onChange={e => handleInputChange('address', e.target.value)}
                            isInvalid={!!formErrors.address}
                            style={{ width: '100%' }}
                        />
                        <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formChainId">
                        <Form.Label>Сеть магазинов</Form.Label>
                        <Form.Control
                            as="select"
                            value={currentStore.chainId}
                            onChange={e => handleInputChange('chainId', e.target.value)}
                            isInvalid={!!formErrors.chainId}
                        >
                            <option value={0}>Выберите сеть</option>
                            {chains.map(chain => (
                                <option key={chain.chainId} value={chain.chainId}>
                                    {chain.chainName}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">{formErrors.chainId}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button variant="secondary" onClick={onHide} className='btn btn-outline-secondary'>
                    Отмена
                </button>
                <button variant="primary" onClick={handleAddOrUpdateStore} className='btn btn-outline-warning'>
                    {currentStore.storeId === 0 ? 'Добавить' : 'Сохранить'}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default StoreForm;