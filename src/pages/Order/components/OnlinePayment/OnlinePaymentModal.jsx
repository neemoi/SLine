import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FakePaymentForm from './FakePaymentForm';

function OnlinePaymentModal({ isOpen, onClose, totalCost }) {
    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Онлайн оплата</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Сумма к оплате: {totalCost} р.</p>
                <FakePaymentForm totalCost={totalCost} onClose={onClose} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OnlinePaymentModal;