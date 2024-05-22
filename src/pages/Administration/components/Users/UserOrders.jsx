import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function UserOrders() {
    const { userId } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://localhost:7036/Order/GetOrders/${userId}`)
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, [userId]);

    return (
        <div className="container">
            <h1>User Orders</h1>
            <Link to="/admin/users" className="btn btn-secondary mb-3">Back to Users</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Store Name</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Order Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{order.storeName}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>{order.totalPrice}</td>
                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                            <td>{order.statusName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default UserOrders;