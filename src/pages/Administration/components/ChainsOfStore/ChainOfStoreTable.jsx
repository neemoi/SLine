import React from 'react';

const ChainOfStoreTable = ({ chains, handleSort, deleteChain, handleShowModal }) => {
    return (
        <table className="table table-hover mt-4">
            <thead>
                <tr>
                    <th onClick={() => handleSort('chainId')}>ID</th>
                    <th onClick={() => handleSort('chainName')}>Сеть</th>
                    <th onClick={() => handleSort('description')}>Описание</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {chains.map(chain => (
                    <tr key={chain.chainId}>
                        <td>{chain.chainId}</td>
                        <td>{chain.chainName}</td>
                        <td>{chain.description}</td>
                        <td>
                            <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => handleShowModal(chain)}
                            >
                                Изменить
                            </button>
                            <button
                                className="btn btn-outline-danger btn-sm ml-2"
                                onClick={() => deleteChain(chain.chainId)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ChainOfStoreTable;