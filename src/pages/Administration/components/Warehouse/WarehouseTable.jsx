import React from 'react';
import { Table } from 'react-bootstrap';

const WarehouseTable = ({ warehouses, stores, products, handleSort, deleteWarehouse, handleShowModal }) => {
    const getStoreNameById = (storeId) => {
        const store = stores.find(store => store.storeId === storeId);
        return store ? `${store.storeName}, ${store.city}, ${store.address}` : 'Магазин не найден';
    };

    const getProductNameById = (productId) => {
        const product = products.find(product => product.productId === productId);
        return product ? product.productName : 'Продукт не найден';
    };

    return (
        <div>
            <Table striped bordered hover className="rounded-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('warehouseId')}>ID</th>
                        <th onClick={() => handleSort('storeId')} style={{ width: '10%' }}>Магазин</th>
                        <th onClick={() => handleSort('productId')}>Продукт</th>
                        <th onClick={() => handleSort('quantity')}>Количество</th>
                        <th onClick={() => handleSort('productPrice')}>Цена продукта</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses.map(warehouse => (
                        <tr key={warehouse.warehouseId}>
                            <td>{warehouse.warehouseId}</td>
                            <td>{getStoreNameById(warehouse.storeId)}</td>
                            <td>{getProductNameById(warehouse.productId)}</td>
                            <td>{warehouse.quantity}ш.</td>
                            <td>{warehouse.productPrice}р.</td>
                            <td>
                                <button
                                    onClick={() => handleShowModal(warehouse)}
                                    className="btn btn-outline-dark"
                                    type="button"
                                >
                                    Изменить
                                </button>
                                <button
                                    onClick={() => deleteWarehouse(warehouse.warehouseId)}
                                    className="btn btn-outline-danger"
                                    style={{ marginLeft: '20px' }}
                                    type="button"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default WarehouseTable;