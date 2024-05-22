import React from 'react';
import { Table, Button, Pagination } from 'react-bootstrap';

const UserList = ({ users, handleUserClick, currentPage, totalPages, handlePageChange }) => {
    return (
        <div className='mt-3'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Имя пользователя</th>
                        <th>Адрес</th>
                        <th>Номер телефона</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.userName}</td>
                            <td>{user.address}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <Button variant="outline-dark" onClick={() => handleUserClick(user)}>Посмотреть заказы</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center mt-5">
                <Pagination>
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                    {[...Array(totalPages)].map((_, idx) => (
                        <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => handlePageChange(idx + 1)}>
                            {idx + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                </Pagination>
            </div>
        </div>
    );
};

export default UserList;