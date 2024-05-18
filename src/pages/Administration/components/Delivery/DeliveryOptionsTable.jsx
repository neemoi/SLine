import React from 'react';
import { Table } from 'react-bootstrap';

const DeliveryOptionsTable = ({ currentOptions, handleSort, renderSortIcon, handleShowEditModal, handleDelete, stores }) => {
    const getStoreNameById = (storeId) => {
        const store = stores.find(store => store.storeId === storeId);
        return store ? store.storeName : 'Unknown Store';
    };

    return (
        <Table striped bordered hover className="mt-5 rounded-table">
            <thead>
                <tr>
                    <th onClick={() => handleSort('deliveryId')}>
                        ID{renderSortIcon('deliveryId')}
                    </th>
                    <th onClick={() => handleSort('deliveryTime')}>
                        Время доставки{renderSortIcon('deliveryTime')}
                    </th>
                    <th onClick={() => handleSort('deliveryPrice')}>
                        Стоимость доставки{renderSortIcon('deliveryPrice')}
                    </th>
                    <th onClick={() => handleSort('storeId')}>
                        Магазин{renderSortIcon('storeId')}
                    </th>
                    <th onClick={() => handleSort('deliveryType')}>
                        Тип доставки{renderSortIcon('deliveryType')}
                    </th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {currentOptions.map(option => (
                    <tr key={option.deliveryId}>
                        <td>{option.deliveryId}</td>
                        <td>{option.deliveryTime} мин.</td>
                        <td>{option.deliveryPrice} р.</td>
                        <td>{getStoreNameById(option.storeId)}</td>
                        <td>{option.deliveryType}</td>
                        <td>
                            <button onClick={() => handleShowEditModal(option)} className="btn btn-outline-dark">
                                Изменить
                            </button>
                            <button onClick={() => handleDelete(option.deliveryId)} className="btn btn-outline-danger" style={{ marginLeft: '20px' }}>
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DeliveryOptionsTable;