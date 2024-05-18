import React from 'react';
import { Modal, Form } from 'react-bootstrap';

const ChainOfStoreForm = ({ show, onHide, currentChain, formErrors, handleInputChange, handleAddOrUpdateChain }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{currentChain.chainId === 0 ? 'Добавить сеть магазинов' : 'Изменить сеть магазинов'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formChainName">
                        <Form.Label>Название сети</Form.Label>
                        <Form.Control
                            type="text"
                            value={currentChain.chainName}
                            onChange={e => handleInputChange('chainName', e.target.value)}
                            isInvalid={!!formErrors.chainName}
                            style={{ width: '100%' }}
                        />
                        <Form.Control.Feedback type="invalid">{formErrors.chainName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={currentChain.description}
                            onChange={e => handleInputChange('description', e.target.value)}
                            isInvalid={!!formErrors.description}
                        />
                        <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button variant="secondary" onClick={onHide} className='btn btn-outline-secondary'>
                    Отмена
                </button>
                <button variant="primary" onClick={handleAddOrUpdateChain} className='btn btn-outline-warning'>
                    {currentChain.chainId === 0 ? 'Добавить' : 'Сохранить'}
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChainOfStoreForm;