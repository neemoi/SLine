import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import '../../styles/AdminPage.css';

const UserOrdersModal = ({ isModalOpen, handleCloseModal, selectedUser, userOrders }) => {
    return (
        <Modal show={isModalOpen} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Информация о заказах</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedUser && (
                    <>
                        <Table striped bordered hover className="rounded-table">
                            <thead>
                                <tr>
                                    <th>№ заказа</th>
                                    <th>Название магазина</th>
                                    <th>Количество</th>
                                    <th>Сумма</th>
                                    <th>Дата заказа</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(order => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.storeName}</td>
                                        <td>{order.quantity} ш.</td>
                                        <td>{order.totalPrice} р.</td>
                                        <td>{new Date(order.orderDate).toLocaleString()}</td>
                                        <td>{order.statusName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <button variant="secondary" className='btn btn-outline-secondary' onClick={handleCloseModal}>Закрыть</button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserOrdersModal;