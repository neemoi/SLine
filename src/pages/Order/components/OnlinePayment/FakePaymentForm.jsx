import React, { useState } from 'react';
import { Button, Alert, Modal, Form } from 'react-bootstrap';

function FakePaymentForm({ isOpen, totalCost, onClose, createOrder }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState(null);

    const validateCardNumber = (number) => {
        const regex = /^[0-9]{16}$/;
        return regex.test(number.replace(/\s+/g, ''));
    };

    const validateExpiryDate = (date) => {
        const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        return regex.test(date);
    };

    const validateCvv = (cvv) => {
        const regex = /^[0-9]{3,4}$/;
        return regex.test(cvv);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateCardNumber(cardNumber)) {
            setError('Неверный номер карты');
            return;
        }
        if (!validateExpiryDate(expiryDate)) {
            setError('Неверный срок действия');
            return;
        }
        if (!validateCvv(cvv)) {
            setError('Неверный CVV');
            return;
        }

        setError(null);
        try {
            await createOrder();
            onClose();
        } catch (error) {
            console.error('Error creating order:', error);
            setError('Ошибка создания заказа');
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Оплата заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="text-center">
                    <Form.Group className="mb-3">
                        <Form.Label>Номер карты</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="1234 5678 9123 4567"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Срок действия</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                    <Button type="submit" variant="primary" className="mt-3">
                        Оплатить {totalCost} р.
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default FakePaymentForm;