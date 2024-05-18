import React from 'react';
import { Table } from 'react-bootstrap';

const StoreTable = ({ stores, chains, handleSort, deleteStore, handleShowModal }) => {
    const getChainNameById = (chainId) => {
        const chain = chains.find(chain => chain.chainId === chainId);
        return chain ? chain.chainName : 'Сеть не найдена';
    };

    return (
        <div>
            <Table striped bordered hover className="rounded-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('storeId')}>ID</th>
                        <th onClick={() => handleSort('storeName')} style={{ width: '20%' }}>Название магазина</th>
                        <th onClick={() => handleSort('city')}>Город</th>
                        <th onClick={() => handleSort('address')}>Адрес</th>
                        <th onClick={() => handleSort('chainId')}>Сеть магазинов</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map(store => (
                        <tr key={store.storeId}>
                            <td>{store.storeId}</td>
                            <td>{store.storeName}</td>
                            <td>{store.city}</td>
                            <td>{store.address}</td>
                            <td>{getChainNameById(store.chainId)}</td>
                            <td>
                                <button
                                    onClick={() => handleShowModal(store)}
                                    className="btn btn-outline-dark"
                                    type="button"
                                >
                                    Изменить
                                </button>
                                <button
                                    onClick={() => deleteStore(store.storeId)}
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

export default StoreTable;